import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState, useEffect, useMemo } from 'react';
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
  // 使用者座標資料
  const [coords, setCoords] = useState(defaultCenter);
  const [bounds, setBounds] = useState(null);
  // 抓取停車場資料 (all+available)
  const [parkingLots, setParkingLots] = useState([]);
  // 搜尋出的停車場資料
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [childClicked, setChildClicked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getParkingLost = async () => {
    try {
      const data = await getPlacesData();
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
    getParkingLost();
  }, []);

  return (
    <GlobalContainer>
      <GlobalStyle />
      <NavbarWrapper>
        <Navbar setCoords={setCoords} />
      </NavbarWrapper>
      <MapWrapper>
        <Map
          setCoords={setCoords}
          setBounds={setBounds}
          coords={coords}
          parkingLots={parkingLots}
          setParkingLots={setParkingLots}
        />
      </MapWrapper>
    </GlobalContainer>
  );
}

export default App;
