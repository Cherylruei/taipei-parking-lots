import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import twd97tolatlng from 'twd97-to-latlng';
import { IconLocation } from 'assets/icons';

// 轉TWD和經緯度的function
function transferLatLng(x, y) {
  const { lat, lng } = twd97tolatlng(x, y);
  return { lat, lng };
}

const LocationBtn = ({ handleUserLocation }) => {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <button onClick={handleUserLocation}>
        <IconLocation />
      </button>
    </div>
  );
};

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = ({
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
  // 使用者現在的位置和地圖的中心不一定是同一個，因為還要能拖曳地圖去看使用者位置以外的停車場
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(coords);
  const [showPosition, setShowPosition] = useState(false);
  // map 是 google maps 的物件，設置 state的變數去追蹤他的變化
  // 當地圖停止拖曳時為 true
  const [isMapIdle, setIsMapIdle] = useState(false);

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      libraries: ['places'],
    }),
    []
  );

  const icon = {
    url: 'https://iili.io/Hv8XDnR.png',
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

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

  useEffect(() => {
    if (isMapIdle) {
      const bounds = map.getBounds();
      const visibleLots = parkingLots.filter((parkingLot) => {
        const { lat, lng } = transferLatLng(parkingLot.tw97x, parkingLot.tw97y);
        return bounds.contains(new window.google.maps.LatLng(lat, lng));
      });
      setVisibleLots(visibleLots);
      setIsMapIdle(false);
    }
  }, [map, isMapIdle, visibleLots, setVisibleLots, parkingLots]);

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(userPosition);
        setCurrentPosition(coords);
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
      },
      () => {
        alert('請允許存取使用者位置來使用此功能');
      }
    );
  };

  const handleCloseInfo = () => {
    if (selected !== null) {
      setSelected(null);
    }
  };

  console.log({ selected });

  return (
    <>
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={handleLoad}
      >
        {showPosition && <MarkerF position={currentPosition} icon={icon} />}
        {visibleLots &&
          visibleLots?.map((parkingLot) => {
            return (
              <MarkerF
                key={parkingLot.id}
                position={transferLatLng(parkingLot.tw97x, parkingLot.tw97y)}
                onClick={() => {
                  setSelected(parkingLot);
                }}
              />
            );
          })}
        {selected ? (
          <InfoWindow
            position={transferLatLng(selected.tw97x, selected.tw97y)}
            onCloseClick={handleCloseInfo}
            visible={selected !== null}
          >
            <div>
              <h2>{selected.name}</h2>
              <p>總停車位:{selected.totalcar}</p>
              {
                // eslint-disable-next-line
                availablePlaces?.map((place) => {
                  if (place.id === selected.id) {
                    return <p key={place.id}>剩餘空位:{place.availablecar}</p>;
                  }
                })
              }
            </div>
          </InfoWindow>
        ) : null}
        {/* {console.log('selected2', selected)} */}
        {/* Child components, such as markers, info windows, etc. */}
        <LocationBtn handleUserLocation={handleUserLocation} />
      </GoogleMap>
    </>
  );
};

export default Map;
