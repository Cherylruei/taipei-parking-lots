import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { GlobalStyle } from 'components/globalStyle';
import { GlobalContainer } from 'styles/Container.styled';
import { MapWrapper, NavbarWrapper } from './styles/Container.styled';
import { getPlacesData } from 'api';

// 計算兩個經緯度座標之間的距離，單位為公尺。
const getDistance = (p1, p2) => {
  const R = 6378137; // 地球半徑，單位為公尺
  const dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180; // 轉換為弧度
  const dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1.lat() * Math.PI) / 180) *
      Math.cos((p2.lat() * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

function App() {
  // 台北市的經緯度:預設位置, 使用useMemo hook (dependencies [])只會渲染一次
  const defaultCenter = useMemo(
    () => ({
      lat: 25.033671,
      lng: 121.564427,
    }),
    []
  );

  const mapRef = useRef();

  // 使用者座標資料
  const [coords, setCoords] = useState(defaultCenter);
  const [bounds, setBounds] = useState(null);
  // 篩選出的停車場資料 (附近/搜尋)
  const [parkingLots, setParkingLots] = useState([]);
  // 有空位的停車場資料
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [childClicked, setChildClicked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    // 初始化時獲取附近停車場
    getParkingLots(map.getCenter());
  }, []);

  const getParkingLots = async (location) => {
    try {
      const data = await getPlacesData(location);
      if (data) {
        // console.log('useEffect_data', data);
        const updatedTime = data.UPDATETIME;
        setParkingLots(data.park);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getParkingLots();
  }, []);

  const onBoundsChanged = useCallback(() => {
    if (!mapRef.current) return;
    const mapBounds = mapRef.current.getBounds();
    const mapCenter = mapRef.current.getCenter();
    const distance = getDistance(mapCenter, mapBounds.getNorthEast());
    if (distance <= 1000) {
      getParkingLots(mapCenter);
    }
  });

  return (
    <GlobalContainer>
      <GlobalStyle />
      <NavbarWrapper>
        <Navbar setCoords={setCoords} />
      </NavbarWrapper>
      <MapWrapper>
        <Map
          onLoad={onLoad}
          setCoords={setCoords}
          setBounds={setBounds}
          coords={coords}
          parkingLots={parkingLots}
          setParkingLots={setParkingLots}
          onBoundsChanged={onBoundsChanged}
        />
      </MapWrapper>
    </GlobalContainer>
  );
}

export default App;
