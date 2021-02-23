import React, { useState, useEffect } from "react";
import TeaService from "../../services/TeaService";
import { Link } from "react-router-dom";

const TeaList = () => {
  const [teas, setTeas] = useState([]);
  const [currentTea, setCurrentTea] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  // const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTeas();
  }, []);


  const retrieveTeas = () => {
    TeaService.getAll()
      .then(response => {
        setTeas(response.data);
        console.log(response);
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
    <h1>Got them</h1>
  );
};

export default TeaList;