import React, { useState, useEffect } from "react";
import styled from 'styled-components';

import TeaService from "../../services/TeaService";
import { Link } from "react-router-dom";

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

`;

const TeaGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TeaList = (props) => {
  const [teas, setTeas] = useState([]);
  const [currentTea, setCurrentTea] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSample, setSampler] = useState(props.sampleLimit);
  // const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (props.sampleLimit > 0)
      retrieveSample();
    else retrieveTeas();
  }, []);


  const retrieveTeas = (pageNo = 1) => {
    TeaService.getAll(pageNo)
      .then(response => {
        setTeas(response.data.teas);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const retrieveSample = () => {
    TeaService.getSample(props.sampleLimit)
      .then(response => {
        setTeas(response.data.teas);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getPageFeed = (e) => {
    const pageNo = parseInt(e.target.innerText)
    refreshList(pageNo);
  }

  const refreshList = (pageNo) => {
    setCurrentPage(pageNo);
    retrieveTeas(pageNo);
    setCurrentTea(null);
    setCurrentIndex(-1);
  };

  const setActiveTea = (tea, index) => {
    setCurrentTea(tea);
    setCurrentIndex(index);
  };

  // in future when we have search functionality in api
  // const findBy = () => {
  //   TeaService.findBy(searchTitle)
  //     .then(response => {
  //       setTea(response.data);
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

//   const onChangeSearchTitle = e => {
//     const searchTitle = e.target.value;
//     setSearchTitle(searchTitle);
//   };

  return (
    <TeaListWrapper>
      { isSample ? (
         teas.map((tea) => <TeaCard key={tea._id} tea={tea} />) 
        ) : (
          <TeasPage>
            <TeaGrid>{ teas.map((tea) => <TeaCard key={tea._id} tea={tea} />) }</TeaGrid>
            <PaginationWrapper>
              { [0,1,2,3,4].map((pageNo, idx) =>
                  <Link key={idx} onClick={getPageFeed} to={`/teas/${pageNo}`} replace>{pageNo + 1}</Link>
                )
              }
            </PaginationWrapper>
          </TeasPage>
        )
      }
    </TeaListWrapper>
  );
};

export default TeaList;