import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

import TeaService from "../../services/TeaService";
import { useAppContext } from '../../context/AuthContext';

import TeaCard from './TeaCard';

const TeaListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const TeasPage = styled.div`
  width: 100%;
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const TeaGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

const SearchResults = (props) => {
  const [teas, setTeas] = useState([]);
  let total = 0;
  // TODO: fix this; ugly to use user.user._id
  const { user } = useAppContext();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(props.match.params.query);

  useEffect(() => {
    retrieveResults(currentPage);
  }, [currentPage]);


  const retrieveResults = (curr) => {
    console.log(searchQuery, curr);
    TeaService.search(searchQuery, curr)
      .then(res => {
        console.log(res);
        setTeas(res.data.result);
      })
      .catch(err => {
        // maybe have a better way to handle this in future
        console.log(err);
      });
  };

  const refreshList = (e, value) => {
    setCurrentPage(value);
    retrieveResults(value);
  };


  // in future when we have search functionality in api add search here

  return (
    <TeaListWrapper>
      <TeasPage>
        <TeaGrid>{ teas.map((tea) => <TeaCard userId={user.user ? user.user._id : null} key={tea._id} tea={tea} />) }</TeaGrid>
        <PaginationWrapper>
          <Pagination count={pageCount} page={currentPage} onChange={refreshList} />
        </PaginationWrapper>
      </TeasPage>
    </TeaListWrapper>
  )
};

export default SearchResults;