import React, { useState } from "react";
import { TextField, ClickAwayListener } from '@material-ui/core';
import styled from 'styled-components';

import ReviewService from '../../services/ReviewService';
import AuthService from '../../services/AuthService';

const CancelButton = styled.div`
  color: darkred;

  &:hover {
    cursor: pointer;
    color: red;
    font-weight: bold;
  }
`;

const ReviewWrapper = styled.div`
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 20px;
  width: 480px;
  height: 400px;
`;

const ReviewForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  input {
    display: block;
    padding: 10px 14px;
  }
  div {
    margin-bottom: 10px;
  }
  textarea {
    height: 248px !important;
  }
  label {
    transform: translate(14px, 14px) scale(1);
  }
`;

const ReviewFooter = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0 !important;
`;

// consolidate this stuff common buttons etc.
const ReviewButton = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  height: 28px;
  padding: 4px 15px;
  color: blue;
  border: 1px solid blue;
  margin-bottom: 0 !important;

  &:hover {
    background: blue;
    color: #fff;
    cursor: pointer;
  }
`;

const ReviewTea = (props) => {
  const initialReviewState = {
    title: "",
    content: ""
  };

  const [review, setReview] = useState(initialReviewState);
  const { user } = AuthService.getCurrentUser();

  const handleChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const saveReview = e => {
    e.preventDefault();
    const data = {
      ...review,
      userId: user._id,
      productId: props.tea._id,
      score: 0,
    };

    ReviewService.create(data)
      .then(response => {
        setReview({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content
        });
        console.log(response);
        props.showHideModal(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const closeOnClick = () => {
    props.showHideModal(false);
  }

  return (
    <ReviewWrapper>
      <ClickAwayListener onClickAway={closeOnClick}>
        <ReviewForm>
          <TextField
            label="Title"
            name="title"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Review Content"
            name="content"
            onChange={handleChange}
            variant="outlined"
            multiline
          />
          <ReviewFooter>
            <CancelButton onClick={() => props.showHideModal(false)}>Cancel</CancelButton>
            <ReviewButton onClick={saveReview}>
              Submit Review
            </ReviewButton>
          </ReviewFooter>
        </ReviewForm>
      </ClickAwayListener>
    </ReviewWrapper>
  );
};

export default ReviewTea;