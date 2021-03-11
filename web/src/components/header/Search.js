import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

  const handleSearchInput = (e, value) => {
    let query = value;
    // we already look only queries with 4 char mins in backend
    // but no reason to hit nodeserver anyway
    if (query.length > 2) {
      TeaService.search(query)
        .then(res => {
          setQueryResults(res.data.result);
        })
        .catch(err => {
          // maybe have a better way to handle this in future
          console.log(err);
        });
    }
  };


  return (
    <SearchWrapper>
      <Autocomplete
        freeSolo
        options={queryResults.map(tea => tea.name)}
        onInputChange={handleSearchInput}
        renderInput={(params) => (
          <TextField {...params} margin="normal" />
        )}
      />
    </SearchWrapper>
  )
};

export default Search;