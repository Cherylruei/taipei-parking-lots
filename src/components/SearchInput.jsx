import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.styled';
import { Autocomplete } from '@react-google-maps/api';
import { useRef } from 'react';

const SearchInput = ({ map, setCoords, isLoaded }) => {
  const autoCompleteRef = useRef(null);

  const handleLoad = (autoComplete) => {
    autoCompleteRef.current = autoComplete;
  };

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      console.log({ autoCompleteRef });
      const place = autoCompleteRef?.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setCoords({ lat, lng });
        map?.setCenter({ lat, lng });
      }
    }
  };

  const options = {
    componentRestrictions: { country: 'tw' },
  };

  return (
    <>
      {isLoaded ? (
        <Autocomplete
          onLoad={handleLoad}
          onPlaceChanged={onPlaceChanged}
          options={options}
        >
          <StyledSearch>
            <IconSearch className='icon' />
            <input placeholder='輸入地址或地標...' />
          </StyledSearch>
        </Autocomplete>
      ) : (
        <div>正在載入中</div>
      )}
    </>
  );
};

export default SearchInput;
