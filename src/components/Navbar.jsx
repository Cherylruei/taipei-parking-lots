import SearchInput from './SearchInput';

const Navbar = ({ loader, setCoords }) => {
  return (
    <>
      <SearchInput loader={loader} setCoords={setCoords} />
    </>
  );
};

export default Navbar;
