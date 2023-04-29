import SearchInput from 'components/SearchInput';
import { StyledList } from 'styles/Navbar.styled';
import { useState, useEffect, createRef } from 'react';
import twd97tolatlng from 'twd97-to-latlng';

// 轉TWD和經緯度的function
function transferLatLng(x, y) {
  const { lat, lng } = twd97tolatlng(x, y);
  return { lat, lng };
}

const List = ({ visibleLots, availablePlaces, selected, mapRef }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(visibleLots?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    // 為了要拿到第二個參數 index
    setElRefs(refs);
    // eslint-disable-next-line
  }, [visibleLots]);

  useEffect(() => {
    if (selected) {
      const index = visibleLots.findIndex((lot) => lot.id === selected.id);
      const { lat, lng } = transferLatLng(selected.tw97x, selected.tw97y);
      mapRef.current.panTo({ lat, lng });
      // console.log({ visibleLots });
      // console.log({ index });
      // List 目前被點擊的停車場Marker無法準確的出現在list 可視區
      setTimeout(() => {
        elRefs[index]?.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 0);
    }
    // eslint-disable-next-line
  }, [selected]);
  console.log({ visibleLots });
  return (
    <StyledList>
      {visibleLots?.map((parkingLot, i) => {
        const availablePlace = availablePlaces?.find(
          (place) => place.id === parkingLot.id
        );
        console.log({ availablePlace });
        const refProp = elRefs[i];
        return (
          <div key={parkingLot.id} ref={refProp}>
            <h2>{parkingLot.name}</h2>
            <p>地址:{parkingLot.address}</p>
            <p>總停車位:{parkingLot.totalcar}</p>
            <p>
              剩餘空位:
              {availablePlace.availablecar >= 0
                ? availablePlace.availablecar
                : '空位目前尚無法取得'}
            </p>
          </div>
        );
      })}
    </StyledList>
  );
};

const Navbar = ({
  isLoaded,
  map,
  setCoords,
  visibleLots,
  availablePlaces,
  selected,
  setSelected,
  mapRef,
  onPlaceChanged,
  onLoadAuto,
  autoComplete,
  setAutoComplete,
  autoCompleteRef,
}) => {
  return (
    <>
      <SearchInput
        isLoaded={isLoaded}
        map={map}
        setCoords={setCoords}
        selected={selected}
        setSelected={setSelected}
        onPlaceChanged={onPlaceChanged}
        onLoadAuto={onLoadAuto}
        autoComplete={autoComplete}
        setAutoComplete={setAutoComplete}
        autoCompleteRef={autoCompleteRef}
      />
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
