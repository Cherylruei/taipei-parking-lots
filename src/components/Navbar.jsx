import SearchInput from './SearchInput';
import styled from 'styled-components';

const StyledList = styled.div`
  overflow-y: scroll;
  div {
    margin: 16px 5px;
    padding: 5px 16px;
    border: 2px solid var(--color-white-grey);
    h2 {
      font-size: 700;
    }
  }
`;

const List = ({ visibleLots }) => {
  const width = window.innerWidth;
  console.log('width', width);
  return (
    <StyledList>
      {visibleLots.map((parkingLot) => {
        return (
          <div key={parkingLot.id}>
            <h2>{parkingLot.name}</h2>
            <p>地址:{parkingLot.address}</p>
            <p>總停車位:{parkingLot.totalcar}</p>
          </div>
        );
      })}
    </StyledList>
  );
};

const Navbar = ({ setCoords, visibleLots }) => {
  return (
    <>
      <SearchInput setCoords={setCoords} />
      <List visibleLots={visibleLots} />
    </>
  );
};

export default Navbar;
