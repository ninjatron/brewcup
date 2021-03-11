import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TeaService from '../../services/TeaService';

const SearchWrapper = styled.div`
  display: flex;
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 20px;

  input {
    background: #fff;
    color: #000;
    padding: 6px 10px !important;
    height: 24px;
  }

  .MuiFormControl-root {
    background: #fff;
    margin-top: 8px;
    width: 300px;
  }
`;

const Search = () => {
  const [queryResults, setQueryResults] = useState([]);
  const history = useHistory();

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

  const handleKeyPress = (e, v) => {
    if (e.key === 'Enter') {
      console.log("Show search results");
    }
  }

  const handleSelect = (e, v) => {
    // query result can never exceed 7 by backend design
    let selectedTea = queryResults.find(t => t.name === v);
    if (selectedTea) {
      history.push(`/tea/${selectedTea._id}`);
    }
  }

  return (
    <SearchWrapper>
      <Autocomplete
        freeSolo
        options={queryResults.map(tea => tea.name)}
        onKeyPress={handleKeyPress}
        onChange={handleSelect}
        onInputChange={handleSearchInput}
        renderInput={(params) => (
          <TextField placeholder="Search teas..." {...params} margin="normal" />
        )}
      />
    </SearchWrapper>
  )
};

export default Search;