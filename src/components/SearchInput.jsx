import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.style';
import { Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';

const SearchInput = ({ map, setMap, setCoords }) => {
  const autoCompleteRef = useRef(null);

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      console.log({ autoCompleteRef });
      const place = autoCompleteRef.current.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoords({ lat, lng });
      map?.setCenter({ lat, lng });
    }
  };

  const options = {
    componentRestrictions: { country: 'tw' },
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
