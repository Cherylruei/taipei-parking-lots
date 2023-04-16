import { IconSearch } from 'assets/icons';
import { StyledSearch } from 'styles/Navbar.style';

const SearchInput = () => {
  return (
    <StyledSearch>
      <IconSearch className='icon' />
      <input type='search' id='gsearch' name='gsearch' />
    </StyledSearch>
  );
};

export default SearchInput;
