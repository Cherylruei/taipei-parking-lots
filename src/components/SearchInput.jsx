import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.style';
import { Autocomplete } from '@react-google-maps/api';
import { useRef, useState } from 'react';

const SearchInput = ({ map, setMap, setCoords }) => {
  const autoCompleteRef = useRef(null);

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      console.log({ autoCompleteRef });
      const place = autoCompleteRef.current.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoords({ lat, lng });
      map.setCenter({ lat, lng });
    }
  };

  // 設定 options 物件，讓google map 在載入時，就可以預先載入'places' 庫，並且能夠在 <AutoComplete>元件中使用
  const options = {
    componentRestrictions: { country: 'tw' },
    libraries: ['places'],
  };

  return (
    <Autocomplete
      onLoad={(autoComplete) => (autoCompleteRef.current = autoComplete)}
      onPlaceChanged={onPlaceChanged}
      options={options}
    >
      <StyledSearch>
        <IconSearch className='icon' />
        <input
          type='search'
          id='gsearch'
          name='gsearch'
          placeholder='輸入地址或地標'
        />
      </StyledSearch>
    </Autocomplete>
  );
};

export default SearchInput;
