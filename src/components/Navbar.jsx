import SearchInput from './SearchInput';
import styled from 'styled-components';
import { useState, useEffect, createRef, useRef } from 'react';
import twd97tolatlng from 'twd97-to-latlng';

// 轉TWD和經緯度的function
function transferLatLng(x, y) {
  const { lat, lng } = twd97tolatlng(x, y);
  return { lat, lng };
}

const StyledList = styled.div`
  overflow-y: scroll;
  div {
    margin: 16px 16px;
    padding: 5px 16px;
    line-height: 1.5rem;
    border: 2px solid var(--color-white-grey);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
    h2 {
      font-weight: 700;
    }
  }
`;

const List = ({ visibleLots, availablePlaces, selected, mapRef }) => {
  const [elRefs, setElRefs] = useState([]);
  // const width = window.innerWidth;

  useEffect(() => {
    const refs = Array(visibleLots?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    // 為了要拿到第二個參數 index
    setElRefs(refs);
    console.log('1223434');
    console.log({ elRefs });
  }, [visibleLots]);

  useEffect(() => {
    if (selected) {
      const index = visibleLots.findIndex((lot) => lot.id === selected.id);
      const { lat, lng } = transferLatLng(selected.tw97x, selected.tw97y);
      mapRef.current.panTo({ lat, lng });
      setTimeout(() => {
        elRefs[index].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 0);
    }
  }, [selected]);

  return (
    <StyledList>
      {visibleLots?.map((parkingLot, i) => {
        const availablePlace = availablePlaces.find(
          (place) => place.id === parkingLot.id
        );
        const refProp = elRefs[i];
        return (
          <div key={parkingLot.id} ref={refProp}>
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

const Navbar = ({
  setCoords,
  visibleLots,
  availablePlaces,
  selected,
  mapRef,
}) => {
  return (
    <>
      <SearchInput setCoords={setCoords} />
      <List
        mapRef={mapRef}
        visibleLots={visibleLots}
        availablePlaces={availablePlaces}
        selected={selected}
      />
    </>
  );
};

export default Navbar;
