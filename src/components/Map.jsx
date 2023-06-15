import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import twd97tolatlng from 'twd97-to-latlng';
import { IconLocation } from 'assets/icons';
import car from 'assets/icons/car.png';
import parking from 'assets/icons/parking.png';
import {
  MarkerClusterer,
  SuperClusterAlgorithm,
} from '@googlemaps/markerclusterer';
import { StyledLoading, StyledLocation } from 'styles/Map.styled';

// 轉TWD和經緯度的function
function transferLatLng(x, y) {
  const { lat, lng } = twd97tolatlng(x, y);
  return { lat, lng };
}

const LocationBtn = ({ handleUserLocation }) => {
  return (
    <StyledLocation
      style={{ position: 'absolute', bottom: '9.625em', right: '0.5em' }}
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
  mapRef,
  setMap,
  setSelected,
  coords,
  parkingLots,
  visibleLots,
  setVisibleLots,
  availablePlaces,
}) => {
  // 設置使用者現在的位置
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showPosition, setShowPosition] = useState(false);
  // map 是 google maps 的物件，設置 state的變數去追蹤他的變化
  // 當地圖停止拖曳時為 true
  const [isMapIdle, setIsMapIdle] = useState(false);
  const [currentInfoWindow, setCurrentInfoWindow] = useState(null);
  // eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);

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
    map.setZoom(16);
    map.setCenter(coords);
    onLoad(map);
    // eslint-disable-next-line
  }, []);

  // createMarkers function 按帶入的 visibleLots 不同而出現不同的 markers
  const createMarkers = (visibleLots) => {
    const markers = visibleLots?.map((parkingLot) => {
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
        const selectedLot = availablePlaces?.find((place) => {
          if (place.id === selectedMarker.id) return place;
        });
        infoWindow.setContent(`
              <div>
                <h2>${selectedMarker.name}</h2>
                <p>
                  總停車位: <b>${selectedMarker.totalcar}</b>
                </p>
                <p>
                  剩餘空位: <b>${
                    selectedLot.availablecar >= 0
                      ? selectedLot.availablecar
                      : '空位目前尚無法取得'
                  }</b>
                </p>
              </div>
          `);
        infoWindow.open(map, marker);
        setCurrentInfoWindow(infoWindow);
        // 之後用來使用顯示 selected 的資訊視窗
        setSelected(selectedMarker);
      });
      return marker;
    });
    return markers;
  };

  useEffect(() => {
    if (map) {
      // 監聽地圖是否拖曳停止
      const listener = map.addListener('idle', () => {
        setIsMapIdle(true);
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

  useEffect(() => {
    if (isMapIdle) {
      // 如果地圖拖曳停止，則顯示以下資料
      const bounds = map.getBounds();
      const visibleLots = parkingLots?.filter((parkingLot) => {
        const { lat, lng } = transferLatLng(parkingLot.tw97x, parkingLot.tw97y);
        return bounds.contains(new window.google.maps.LatLng(lat, lng));
      });
      const markers = createMarkers(visibleLots);
      new MarkerClusterer({
        map,
        markers,
        algorithm: new SuperClusterAlgorithm({ radius: 300 }),
      });

      setVisibleLots(visibleLots);
      setIsMapIdle(false);
    }
    // eslint-disable-next-line
  }, [isMapIdle]);

  useEffect(() => {
    if (map) {
      const clickListener = map.addListener('click', () => {
        if (currentInfoWindow) {
          currentInfoWindow.close();
          setCurrentInfoWindow(null);
          setSelected(null);
        }
      });
      return () => {
        window.google.maps.event.removeListener(clickListener);
      };
    }
    // eslint-disable-next-line
  }, [map, currentInfoWindow]);

  const handleUserLocation = () => {
    const map = mapRef.current;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map?.setCenter(userPosition);
        setCurrentPosition(userPosition);
        setShowPosition(true);

        const radius = 0.001; // 使用者使用定位中心上下左右個擴展 0.001 (經緯度) 經度約280公尺
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
            <StyledLoading>
              <div className='loading'></div>
            </StyledLoading>
          )}
        </GoogleMap>
      ) : (
        <div>Map is Loading</div>
      )}
    </>
  );
};

export default Map;
