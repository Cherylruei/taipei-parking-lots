import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.styled';
import { Autocomplete } from '@react-google-maps/api';
import { useState, useRef } from 'react';

const SearchInput = ({ map, isLoaded }) => {
  const [searchInput, setSearchInput] = useState('');
  const autoCompleteRef = useRef(null);

  // this callback is called when the autoComplete instance has loaded, it is called with the autoComplete instance.
  const handleLoad = (autoComplete) => {
    autoCompleteRef.current = autoComplete;
  };

  function codeAdress() {
    if (searchInput.trim() !== '') {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchInput }, function (results, status) {
        if (status == 'OK') {
          map?.setCenter(results[0].geometry.location);
        } else {
          //Geocode was not successful for the following reason: INVALID_REQUEST 自動出現代表 status 依然OK，但要確認這是從哪出現的
          console.log('Geocode ' + status);
        }
      });
    }
  }

  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef?.current.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        // user choose one of autoComplete places options and setup the place name keyword in searchInput bar
        setSearchInput(place.name);
        // setCoords({ lat, lng });
        map?.setCenter({ lat, lng });
      } else {
        // if the user want to search the input keyword only instead of autoComplete
        codeAdress();
      }
    }
  };

  const handleInputChange = (e) => {
    const value = e?.target.value;
    setSearchInput(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onPlaceChanged();
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
            <input
              value={searchInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
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
