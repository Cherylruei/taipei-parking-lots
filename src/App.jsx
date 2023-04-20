import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { GlobalStyle } from 'components/globalStyle';
import { GlobalContainer } from 'styles/Container.styled';
import { MapWrapper, NavbarWrapper } from './styles/Container.styled';
import { getPlacesData } from 'api';

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
  // 拿到的所有停車場資料
  const [parkingLots, setParkingLots] = useState([]);
  // 篩選出的停車場資料 (附近/搜尋)
  const [visibleLots, setVisibleLots] = useState([]);
  // 有空位的停車場資料
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    // 初始化時獲取附近停車場
    // getParkingLots(map.getCenter());
  }, []);

  const getParkingLots = async (location) => {
    try {
      const data = await getPlacesData(location);
      if (data) {
        // const updatedTime = data.UPDATETIME;
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
          selected={selected}
          setSelected={setSelected}
          coords={coords}
          parkingLots={parkingLots}
          visibleLots={visibleLots}
          setVisibleLots={setVisibleLots}
        />
      </MapWrapper>
    </GlobalContainer>
  );
}

export default App;
