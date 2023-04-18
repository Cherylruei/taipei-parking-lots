import { GoogleMap, MarkerF } from '@react-google-maps/api';
import { getPlacesData } from 'api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import twd97tolatlng from 'twd97-to-latlng';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = ({ setCoords, setBounds, coords, parkingLots, setParkingLots }) => {
  // 使用者現在的位置和地圖的中心不一定是同一個，因為還要能拖曳地圖去看使用者位置以外的停車場
  const [currentPosition, setCurrentPosition] = useState(coords);
  const [isLoading, setIsLoading] = useState();

  const mapRef = useRef();

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  // 無法出現Marker的問題待解決
  const icon = {
    url: 'https://iili.io/Hv8XDnR.png',
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };
  // 獲取使用者當前位置
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setCurrentPosition(coords);
    console.log('currentPosition', currentPosition);
  }, []);

  const getParkingLots = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPlacesData();
      if (data) {
        console.log('useEffect_data', data);
        const updatedTime = data.UPDATETIME;
        setParkingLots(data.park);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getParkingLots();
  }, []);

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={coords}
        zoom={14}
        options={options}
        onLoad={onLoad}
        // 一拖動地圖，center 就會跟著改變 (使用者在移動時，center跟著改變是一樣的用法?)
      >
        {/* {console.log('marker', MarkerF)} */}
        <MarkerF position={currentPosition} icon={icon} />
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
        <></>
      </GoogleMap>
    </>
  );
};

export default Map;
