import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CircularProgress from '@material-ui/core/CircularProgress';

import TeaService from "../../services/TeaService";
import AddReview from '../review/AddReview';
import ReviewService from '../../services/ReviewService';
import ReviewsList from '../review/ReviewsList';

const TeaDataHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ReviewButton = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  height: 28px;
  padding: 4px 15px;
  color: blue;
  border: 1px solid blue;

  &:hover {
    background: blue;
    color: #fff;
    cursor: pointer;
  }
`;

const ReviewModal = styled.div`
  background: rgba(255,255,255, 0.9);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const LoaderWrapper = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 200px;
  left: 0;
`;

const CommunityActivityWrapper = styled.div`
  
`

const ReviewsWrapper = styled.div`
  margin-top: 40px;
  width: 66%;
`;

const TeaWrapper = styled.div`
  min-height: calc(100vh - 120px);
`;

const TeaDetails = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient( 
    -22deg
     , #f3d16f, #a35be4);
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
  padding-right: 30px;
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
  const [ reviews, setReviews ] = useState([{}]);
  const [ addingReview, setReviewStatus] = useState(false);
  const { teaId } = useParams();

  const getTea = teaId => {
    TeaService.getSingle(teaId)
      .then(response => {
        setTea(response.data.tea);
      })
      .catch(e => {
        console.log(e);
      });
    
    getTeaReviews(teaId);
  };

  const getTeaReviews = teaId => {
    ReviewService.getProductReviews(teaId)
      .then(response => {
        let newReviews = response.data.reviews;
        console.log(newReviews)
        setReviews(newReviews);
      })
      .catch(err => {
        console.log(err);
      });
  }

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
            <TeaDataHeader>
              <h1>{tea.name}</h1>
              <ReviewButton onClick={() => setReviewStatus(true)}>
                + Add Review
              </ReviewButton>
            </TeaDataHeader>
            
            <ul>
              {tea.teaType ? <li><b>Category:</b> {tea.teaType}</li> : ''}
              <li><b>Packaging:</b>{tea.packaging}</li>
              {tea.score >= 0 ? <li><b>Score:</b> {tea.score}</li> : ''}
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
        <LoaderWrapper><CircularProgress /></LoaderWrapper>
        ) 
      }
      <CommunityActivityWrapper>
        <ReviewsWrapper>
          { reviews.length > 0 ? <ReviewsList reviews={reviews} /> : <h3>No reviews yet</h3> }
        </ReviewsWrapper>
        { addingReview ? (        
            <ReviewModal>
              <AddReview showHideModal={setReviewStatus} tea={tea} />
            </ReviewModal>
          ) : (
            ''
          ) 
        }
      </CommunityActivityWrapper>
    </TeaWrapper>
  );
};

export default Tea;