import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.styled';
import { Autocomplete } from '@react-google-maps/api';
import { useState, useRef } from 'react';
import debounce from 'lodash.debounce';

const SearchInput = ({ map, setCoords, isLoaded }) => {
  const [searchInput, setSearchInput] = useState('');
  const autoCompleteRef = useRef(null);

  const handleLoad = (autoComplete) => {
    autoCompleteRef.current = autoComplete;
  };

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef?.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setSearchInput(place.formatted_address);
        setCoords({ lat, lng });
        map?.setCenter({ lat, lng });
      }
    }
  };

  const onSearchInputChange = (e) => {
    setSearchInput(e?.target?.value);
  };

  const debounceOnChange = debounce(onSearchInputChange, 500);

  const onSearchInputKeydown = (e) => {
    if (e.key === 'Enter') {
      geocodeAddress(searchInput);
    }
  };

  const geocodeAddress = (address) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (result, status) => {
      if (status === 'OK') {
        const lat = result[0].geometry.location.lat();
        const lng = result[0].geometry.location.lng();
        map?.setCenter({ lat, lng });
      } else {
        console.log(
          `Geocode was not successful for the following reason ${status}`
        );
      }
    });
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
            <input
              onChange={debounceOnChange}
              onKeyPress={onSearchInputKeydown}
              placeholder='輸入地址或地標...'
            />
          </StyledSearch>
        </Autocomplete>
      ) : (
        <div>正在載入中</div>
      )}
    </>
  );
};

export default SearchInput;
