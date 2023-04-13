import Map from 'components/Map';
import Navbar from 'components/Navbar';
import { useState } from 'react';
import { GlobalStyle } from 'components/globalStyle';
import { GlobalContainer } from 'styles/Container.styled';
import { MapWrapper, NavbarWrapper } from './styles/Container.styled';

function App() {
  // 使用者座標資料
  const [coords, setCoords] = useState({});
  // 抓取停車場資料 (all+available)
  const [parkingLotsData, setParkingLostsData] = useState([]);
  // 搜尋出的停車場資料
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  // 地圖上被使用者點擊的地標，資料需要顯示在Header
  const [childClicked, setChildClicked] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

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
