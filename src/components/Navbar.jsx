import SearchInput from './SearchInput';
import styled from 'styled-components';

const StyledList = styled.div`
  overflow-y: scroll;
  div {
    margin: 16px 5px;
    padding: 5px 16px;
    line-height: 1.5rem;
    border: 2px solid var(--color-white-grey);
    h2 {
      font-weight: 700;
    }
  }
`;

const List = ({ visibleLots, availablePlaces }) => {
  const width = window.innerWidth;
  console.log('width', width);
  return (
    <StyledList>
      {visibleLots.map((parkingLot) => {
        const availablePlace = availablePlaces.find(
          (place) => place.id === parkingLot.id
        );
        return (
          <div key={parkingLot.id}>
            <h2>{parkingLot.name}</h2>
            <p>地址:{parkingLot.address}</p>
            <p>總停車位:{parkingLot.totalcar}</p>
            <p>剩餘空位:{availablePlace.availablecar}</p>
          </div>
        );
      })}
    </StyledList>
  );
};

const Navbar = ({ setCoords, visibleLots, availablePlaces }) => {
  return (
    <>
      <SearchInput setCoords={setCoords} />
      <List visibleLots={visibleLots} availablePlaces={availablePlaces} />
    </>
  );
};

export default Navbar;
