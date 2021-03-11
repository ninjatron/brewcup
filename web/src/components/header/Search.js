import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';

import TeaService from '../../services/TeaService';

const SearchWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
  input {
    background: #fff;
    color: #000;
    padding: 8px 10px;
  }
`;

const Search = () => {
  const [queryResults, setQueryResults] = useState([]);

  const handleSearchInput = e => {
    let query = e.target.value;
    console.log(query);
    if (query.length > 3) {
      TeaService.search(query)
        .then(res => {
          console.log(res);
          setQueryResults(res);
        })
        .catch(err => {
          // maybe have a better way to handle this in future
          console.log(err);
        });
    }
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