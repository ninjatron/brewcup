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

const TeaList = (props) => {
  const [teas, setTeas] = useState([]);
  let total = 0;
  // TODO: fix this; ugly to use user.user._id
  const { user } = useAppContext();
  console.log("app", user);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSample, setSampler] = useState(props.sampleLimit);
  // const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (props.sampleLimit > 0)
      retrieveSample();
    else retrieveTeas(currentPage);
  }, [currentPage]);


  const retrieveTeas = (curr) => {
    TeaService.getAll(curr)
      .then(response => {
        setTeas(response.data.teas);
        // divide total count by items displayed on page
        setPageCount(Math.round(response.data.count / 12 + 0.5));
      })
      .catch(e => {
        console.log(e);
      });
  };


  const retrieveSample = () => {
    TeaService.getSample(props.sampleLimit)
      .then(response => {
        setTeas(response.data.teas);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = (e, value) => {
    setCurrentPage(value);
    retrieveTeas(value);
  };


  // in future when we have search functionality in api add search here

  return (
    <TeaListWrapper>
      { isSample ? (
         <TeaGrid>{teas.map((tea, idx) => <TeaCard userId={user.user ? user.user._id : null} key={tea._id} tea={tea} />)}</TeaGrid>
        ) : (
          <TeasPage>
            <TeaGrid>{ teas.map((tea) => <TeaCard userId={user.user ? user.user._id : null} key={tea._id} tea={tea} />) }</TeaGrid>
            <PaginationWrapper>
              <Pagination count={pageCount} page={currentPage} onChange={refreshList} />
            </PaginationWrapper>
          </TeasPage>
        )
      }
    </TeaListWrapper>
  )
};

export default TeaList;