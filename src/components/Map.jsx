import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import twd97tolatlng from 'twd97-to-latlng';
import { IconLocation } from 'assets/icons';
import styled from 'styled-components';
import car from 'assets/icons/car.png';
import parking from 'assets/icons/parking.png';
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';

const StyledLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 15em;
  height: 5em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: var(--color-theme);
  background: var(--color-secondary);
  border-radius: 5px;
  border: 3px solid var(--color-theme);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

// 轉TWD和經緯度的function
function transferLatLng(x, y) {
  const { lat, lng } = twd97tolatlng(x, y);
  return { lat, lng };
}

const LocationBtn = ({ handleUserLocation }) => {
  return (
    <StyledLocation
      style={{ position: 'absolute', bottom: '11.625em', right: '0.625em' }}
    >
      <IconLocation onClick={handleUserLocation} />
    </StyledLocation>
  );
};

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = ({
  isLoaded,
  onLoad,
  map,
  setMap,
  setCoords,
  selected,
  setSelected,
  coords,
  parkingLots,
  visibleLots,
  setVisibleLots,
  availablePlaces,
}) => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(coords);
  const [showPosition, setShowPosition] = useState(false);
  // map 是 google maps 的物件，設置 state的變數去追蹤他的變化
  // 當地圖停止拖曳時為 true
  const [isMapIdle, setIsMapIdle] = useState(false);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null);

  console.log({ isLoaded });
  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
    }),
    []
  );

  const handleLoad = useCallback((map) => {
    mapRef.current = map;
    setMap(map);
    onLoad(map);
    map.setZoom(16);
    map.setCenter(coords);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (map) {
      const listener = map.addListener('idle', () => {
        setIsMapIdle(true);
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  console.log({ selected });
  useEffect(() => {
    if (isMapIdle) {
      const bounds = map.getBounds();
      const visibleLots = parkingLots.filter((parkingLot) => {
        const { lat, lng } = transferLatLng(parkingLot.tw97x, parkingLot.tw97y);
        return bounds.contains(new window.google.maps.LatLng(lat, lng));
      });
      const markers = visibleLots.map((parkingLot) => {
        const { lat, lng } = transferLatLng(parkingLot.tw97x, parkingLot.tw97y);
        const selectedMarker = parkingLot;
        const marker = new window.google.maps.Marker({
          key: parkingLot.id,
          position: { lat, lng },
          icon: {
            url: parking,
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            zIndex: 1,
          },
        });
        const infoWindow = new window.google.maps.InfoWindow();
        marker.addListener('click', () => {
          // eslint-disable-next-line
          const lot = availablePlaces?.find((place) => {
            if (place.id === selectedMarker.id && place.availablecar >= 0)
              return place;
          });
          setSelected(lot);
          if (currentInfoWindow) {
            currentInfoWindow.close();
            setCurrentInfoWindow(null);
          }
          infoWindow.setContent(`
              <div>
                <h2>${selectedMarker.name}</h2>
                <p>
                  總停車位: <b>${selectedMarker.totalcar}</b>
                </p>
                <p>
                  剩餘空位: <b>${
                    lot.availablecar >= 0
                      ? lot.availablecar
                      : '空位目前尚無法取得'
                  }</b>
                </p>
              </div>
          `);
          console.log({ infoWindow });
          infoWindow.open(map, marker);
          setCurrentInfoWindow(infoWindow);
          // 之後用來使用顯示 selected 的資訊視窗
          setSelected(selectedMarker);
        });
        return marker;
      });

      new MarkerClusterer({
        map,
        markers,
        algorithm: new SuperClusterAlgorithm({ radius: 300 }),
      });

      setVisibleLots(visibleLots);
      setIsMapIdle(false);
    }
    // eslint-disable-next-line
  }, [map, isMapIdle, visibleLots, setVisibleLots, parkingLots]);

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(userPosition);
        setCurrentPosition(userPosition);
        setShowPosition(true);

        const radius = 0.001; // 使用者使用定位中心上下左右個擴展 0.001 (經緯度) 經度約280公尺
        const map = mapRef.current;
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        const northEast = new window.google.maps.LatLng(
          userLat + radius,
          userLng + radius
        );
        const southWest = new window.google.maps.LatLng(
          userLat - radius,
          userLng - radius
        );
        const bounds = new window.google.maps.LatLngBounds(
          southWest,
          northEast
        );
        map.fitBounds(bounds);

        const visibleLots = parkingLots.filter((parkingLot) => {
          const { lat, lng } = transferLatLng(
            parkingLot.tw97x,
            parkingLot.tw97y
          );
          // return true for the parking lots in bounds
          return bounds.contains(new window.google.maps.LatLng(lat, lng));
        });
        setVisibleLots(visibleLots);
        setIsLoading(true);
      },
      () => {
        alert('請允許存取使用者位置來使用此功能');
      }
    );
  };

  // const handleCloseInfo = () => {
  //   if (selected !== null) {
  //     setSelected(null);
  //   }
  // };

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          id='map'
          mapContainerStyle={mapContainerStyle}
          options={options}
          onLoad={handleLoad}
        >
          {showPosition && (
            <MarkerF
              position={currentPosition}
              icon={{
                url: car,
                scaledSize: new window.google.maps.Size(40, 40),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                zIndex: 1000,
              }}
            />
          )}
          <LocationBtn handleUserLocation={handleUserLocation} />
          {!parkingLots.length > 0 && (
            <StyledLoading>停車場資料加載中...</StyledLoading>
          )}
        </GoogleMap>
      ) : (
        <div>Map is Loading</div>
      )}
    </>
  );
};

export default Map;
