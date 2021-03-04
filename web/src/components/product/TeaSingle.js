import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

import TeaService from "../../services/TeaService";

const TeaWrapper = styled.div`

`;

const TeaDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TeaGallery = styled.div`
  width: 30%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TeaData = styled.div`
  width: 69%;
  margin-left: 1%;
`;

const Tea = props => {
  const initialTeaState = {
    _id: null,
    published: false,
    name: "",
    description: "", 
    teaType: "",
    packaging: "",
    region: "",
    estate: "",
    isAvailable: false,
    flavor: "",
    leaf: "",
    brewColor: "",
  };

  const [ tea, setTea ] = useState(initialTeaState);
  const { teaId } = useParams();
  console.log(teaId);
  console.log(tea);

  const getTea = id => {
    TeaService.getSingle(id)
      .then(response => {
        setTea(response.data.tea);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTea(teaId);
  }, [teaId]);

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setCurrentTea({ ...currentTea, [name]: value });
  // };

  // const updateTea = () => {
  //   TeaService.update(currentTea.id, currentTea)
  //     .then(response => {
  //       console.log(response.data);
  //       setMessage("The Tea was updated successfully!");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  // const deleteTea = () => {
  //   TeaService.remove(currentTea.id)
  //     .then(response => {
  //       console.log(response.data);
  //       props.history.push("/Teas");
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  return (
    <TeaWrapper>
      { tea._id ? (
        <TeaDetails>
          <TeaGallery>
            <img src={tea.photos[0]} />
          </TeaGallery>
          <TeaData>
            <h1>{tea.name}</h1>
          </TeaData>
          </TeaDetails>
        ) : (
          <CircularProgress />
        ) 
      }
    </TeaWrapper>
  );
};

export default Tea;