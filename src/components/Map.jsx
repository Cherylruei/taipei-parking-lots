import { GoogleMap } from '@react-google-maps/api';
import { getPlacesData } from 'api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = ({ setCoords, setBounds, coords }) => {
  const [isLoading, setIsLoading] = useState();

  const mapRef = useRef();

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  // 獲取使用者當前位置
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const getParkingLost = async () => {
    try {
      const data = await getPlacesData();
      if (data) {
        console.log('useEffect_data', data);
        const updatedTime = data.UPDATETIME;
        const parkingLots = data.park;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getParkingLost();
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
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </>
  );
};

export default Map;
