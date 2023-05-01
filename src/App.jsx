import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { GlobalStyle } from 'components/globalStyle';
import { GlobalContainer } from 'styles/Container.styled';
import { MapWrapper, NavbarWrapper } from 'styles/Container.styled';
import { getAvailableLots, getPlacesData } from 'api';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

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
  // 拿到的所有停車場資料
  const [parkingLots, setParkingLots] = useState([]);
  // 篩選出的停車場資料 (附近/搜尋)
  const [visibleLots, setVisibleLots] = useState([]);
  // 有空位的停車場資料
  const [availablePlaces, setAvailablePlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [selected, setSelected] = useState(null);
  //eslint-disable-next-line
  const [isLoading, setIsLoading] = useState(false);
  const [map, setMap] = useState(null);

  // 用 useRef 和 useCallback 去儲存 GoogleMap的實例
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    // 初始化時獲取附近停車場
  }, []);

  // 之後再解決 useEffect
  const getParkingLots = async (location) => {
    try {
      const lotsInfo = await getPlacesData(location);
      const availableLots = await getAvailableLots(location);
      if (lotsInfo && availableLots) {
        // const updatedTime = data.UPDATETIME;
        // 將陣列轉換為 Set 物件(set裡的元素有不可重複性)，使用has()用法快速判斷availableId是否包含此parkingLot的id
        const availableIds = new Set(availableLots.park.map((lot) => lot.id));
        // 將資料裡總停車位= 0 的資訊刪除
        const parkingLots = lotsInfo.park.filter((parkingLot) => {
          return parkingLot.totalcar > 0 && availableIds.has(parkingLot.id);
        });
        // 如果 parkingLot的 id 沒有在 availableCars 資料裡也刪除
        setParkingLots(parkingLots);
        setAvailablePlaces(availableLots.park);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ isLoading });

  useEffect(() => {
    setIsLoading(true);
    getParkingLots();
  }, []);
  console.log({ parkingLots });
  return (
    <GlobalContainer>
      <GlobalStyle />
      <NavbarWrapper>
        <Navbar
          isLoaded={isLoaded}
          mapRef={mapRef}
          map={map}
          setCoords={setCoords}
          visibleLots={visibleLots}
          selected={selected}
          setSelected={setSelected}
          availablePlaces={availablePlaces}
        />
      </NavbarWrapper>
      <MapWrapper>
        <Map
          isLoaded={isLoaded}
          onLoad={onLoad}
          mapRef={mapRef}
          map={map}
          setMap={setMap}
          setCoords={setCoords}
          selected={selected}
          setSelected={setSelected}
          coords={coords}
          parkingLots={parkingLots}
          visibleLots={visibleLots}
          setVisibleLots={setVisibleLots}
          availablePlaces={availablePlaces}
        />
      </MapWrapper>
    </GlobalContainer>
  );
}

export default App;
