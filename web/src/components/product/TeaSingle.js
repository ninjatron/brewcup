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
  width: 67%;
  margin-left: 20px;
`;

const Tea = props => {
  const initialTeaState = {
    _id: null,
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
            <ul>
              {tea.teaType ? <li><b>Category:</b> {tea.teaType}</li> : ''}
              <li><b>Packaging:</b> {tea.packaging}</li>
              {tea.region ? <li><b>Region:</b> {tea.region}</li> : ''}
              {tea.estate ? <li><b>Estate:</b> {tea.estate}</li> : ''}
              {tea.flavor ? <li><b>Flavor:</b> {tea.flavor}</li> : ''}
              {tea.leaf ? <li><b>Leaf:</b> {tea.leaf}</li> : ''}
              {tea.brewColor ? <li><b>Brew Color:</b> {tea.brewColor}</li> : ''}
            </ul>
            <article>
            {tea.description}
            </article>
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