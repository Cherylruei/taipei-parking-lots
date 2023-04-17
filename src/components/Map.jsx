import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const Map = ({ setCoords, setBonds, coords }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
      console.log('position', position);
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={coords}
      zoom={14}
      options={options}
      onLoad={onLoad}
      // 一拖動地圖，center 就會跟著改變 (使用者在移動時，center跟著改變是一樣的用法?)
      onCenterChanged={() => {
        // if (mapRef.current) {
        //   const center = mapRef.current.getCenter();
        //   const distance =
        //     window.google.maps.geometry.spherical.computeDistanceBetween(
        //       new window.google.maps.LatLng(userPosition),
        //       center
        //     );
        //   if (distance > 1000) {
        //     setCoords({
        //       lat: center.lat(),
        //       lng: center.lng(),
        //     });
        //   }
        // }
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
};

export default Map;
