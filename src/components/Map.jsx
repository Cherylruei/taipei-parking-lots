import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
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
  coords,
  parkingLots,
  setParkingLots,
  onBoundsChanged,
}) => {
  // 使用者現在的位置和地圖的中心不一定是同一個，因為還要能拖曳地圖去看使用者位置以外的停車場
  const [currentPosition, setCurrentPosition] = useState(coords);
  const [showPosition, setShowPosition] = useState(false);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
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

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setCurrentPosition(coords);
    setShowPosition(true);
  };

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coords}
        zoom={14}
        options={options}
        onLoad={onLoad}
        onBoundsChanged={onBoundsChanged}
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
