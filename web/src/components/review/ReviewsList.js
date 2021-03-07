import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const ReviewsListWrapper = styled.div`
  display: block;
`;

const ReviewWrapper = styled.div`
  padding: 15px 15px;
  font-size: 14px;
`;

const ReviewsList = (props) => {
  return (
    <ReviewsListWrapper>
      <h2>Reviews</h2>
      { props.reviews ? 
        (props.reviews.map(review => 
          <ReviewWrapper key={review._id}>
            <b>{review.title}</b>
            <p>{review.content}</p>
          </ReviewWrapper>
        )) : ('No reviews yet.')
      }
    </ReviewsListWrapper>
  );
};

export default ReviewsList;