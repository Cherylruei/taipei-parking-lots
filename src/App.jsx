import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState, useEffect } from 'react';
import { GlobalStyle } from 'components/globalStyle';
import { GlobalContainer } from 'styles/Container.styled';
import { MapWrapper, NavbarWrapper } from './styles/Container.styled';
import { getPlacesData } from 'api';

function App() {
  // 使用者座標資料
  const [coords, setCoords] = useState({});
  // 抓取停車場資料 (all+available)
  const [parkingLotsData, setParkingLostsData] = useState([]);
  // 搜尋出的停車場資料
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [childClicked, setChildClicked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getParkingLost = async () => {
    try {
      const data = await getPlacesData();
      if (data) {
        console.log('useEffect_data', data);
        const updatedTime = data.UPDATETIME;
        const parkingLots = data.park;
        console.log('updatedTime', updatedTime);
        console.log('parkingLots', parkingLots);
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
        <Navbar />
      </NavbarWrapper>
      <MapWrapper>
        <Map />
      </MapWrapper>
    </GlobalContainer>
  );
}

export default App;
