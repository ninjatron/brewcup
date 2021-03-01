import React, { useState, useEffect } from "react";
import TeaService from "../../services/TeaService";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import TeaCard from './TeaCard';

const TeaListWrapper = styled.div`

`;

const TeaList = (props) => {
  const [teas, setTeas] = useState([]);
  const [currentTea, setCurrentTea] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isSample, setSampler] = useState(props.sampleLimit);
  // const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    if (props.sampleLimit > 0)
      retrieveSample();
    else retrieveTeas();
  }, []);


  const retrieveTeas = () => {
    TeaService.getAll()
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

  const refreshList = () => {
    retrieveTeas();
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
      <h1>tea</h1>
      { teas.map((tea) => <TeaCard key={tea._id} tea={tea} />) }
    </TeaListWrapper>
  );
};

export default TeaList;