import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import twd97tolatlng from 'twd97-to-latlng';
import { IconLocation } from 'assets/icons';

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
  setCoords,
  setBounds,
  coords,
  parkingLots,
  setParkingLots,
  onBoundsChanged,
}) => {
  // 使用者現在的位置和地圖的中心不一定是同一個，因為還要能拖曳地圖去看使用者位置以外的停車場
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(coords);
  const [showPosition, setShowPosition] = useState(false);

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
    }),
    []
  );

  const icon = {
    url: 'https://iili.io/Hv8XDnR.png',
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  // const handleBoundsChanged = useCallback(() => {
  //   const map = mapRef.current;
  //   if (map) {
  //     const bounds = map.getBounds();
  //     console.log("bounds", bounds)
  //     onBoundsChanged(bounds);
  //   }
  // });

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
        console.log('bounds', bounds);
        map.fitBounds(bounds);
      },
      () => {
        alert('請允許存取使用者位置來使用此功能');
      }
    );
  };

  return (
    <>
      <GoogleMap
        id='map'
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        center={coords}
        zoom={16}
        options={options}
        onLoad={(map) => {
          mapRef.current = map;
          onLoad(map);
        }}
        // onBoundsChanged={handleBoundsChanged}
        // 一拖動地圖，center 就會跟著改變 (使用者在移動時，center跟著改變是一樣的用法?)
      >
        {showPosition && <MarkerF position={currentPosition} icon={icon} />}
        {/* {console.log('parkingLots', parkingLots)} */}
        {parkingLots &&
          parkingLots.map((parkingLot) => {
            const { lat, lng } = twd97tolatlng(
              parkingLot.tw97x,
              parkingLot.tw97y
            );
            // console.log('parkinglot', parkingLot);
            return <MarkerF key={parkingLot.id} position={{ lat, lng }} />;
          })}
        {/* Child components, such as markers, info windows, etc. */}
        <LocationBtn handleUserLocation={handleUserLocation} />
      </GoogleMap>
    </>
  );
};

export default Map;
