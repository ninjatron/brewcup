import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

import TeaService from '../../services/TeaService';

const SearchWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
`;

const Search = () => {
  const handleSearchInput = e => {
    let query = e.target.value;
    console.log(query);  
  };


  return (
    <SearchWrapper>
      <InputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchInput}
      />
    </SearchWrapper>
  )
};

export default Search;