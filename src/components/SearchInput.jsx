import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.style';
import { Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';

const SearchInput = ({ setCoords }) => {
  const [autoComplete, setAutoComplete] = useState();

  const onLoad = (autoC) => setAutoComplete(autoC);
  const onPlaceChanged = () => {
    if (autoComplete) {
      const lat = autoComplete.getPlace().geometry.location.lat();
      const lng = autoComplete.getPlace().geometry.location.lng();
      setCoords({ lat, lng });
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <StyledSearch>
        <IconSearch className='icon' />
        <input
          type='search'
          id='gsearch'
          name='gsearch'
          placeholder='尋找停車場...'
        />
      </StyledSearch>
    </Autocomplete>
  );
};

export default SearchInput;
