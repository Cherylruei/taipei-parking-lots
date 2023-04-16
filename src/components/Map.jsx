import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useMemo, useRef } from 'react';

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
  // 台北市的經緯度:預設位置, 使用useMemo hook (dependencies [])只會渲染一次
  const center = useMemo(
    () => ({
      lat: 25.033671,
      lng: 121.564427,
    }),
    []
  );

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={options}
      onLoad={onLoad}
      onChange={(e) => {
        console.log('e', e);
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  );
};

export default Map;
