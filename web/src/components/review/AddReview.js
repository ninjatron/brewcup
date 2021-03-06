import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

import ReviewService from '../../services/ReviewService';
import AuthService from '../../services/AuthService';

const ReviewWrapper = styled.div`
  background: #fff;
  border-radius: 3px;
  border: 1px solid #ddd;
  padding: 15px;
  width: 460px;
  height: 360px;
`;

const ReviewForm = styled.form`
  display: block;
  input {
    display: block;
  }
`;

const ReviewTea = (props) => {
  const initialReviewState = {
    title: "",
    content: ""
  };

  const [review, setReview] = useState(initialReviewState);
  const user = AuthService.getCurrentUser();

  const handleChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  const saveReview = e => {
    e.preventDefault();
    const data = {
      ...review,
      userId: user.userId,
      productId: props.tea._id,
      score: 0,
    };

    console.log(data);
    ReviewService.create(data)
      .then(response => {
        setReview({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content
        });
        console.log(response);
        //history.push(`/tea/${response.data.product}`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <ReviewWrapper>
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
        />
        <button onClick={saveReview} className="btn btn-success">
          Submit
        </button>
      </ReviewForm>
    </ReviewWrapper>
  );
};

export default ReviewTea;