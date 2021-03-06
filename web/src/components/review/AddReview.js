import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components';

import ReviewService from "../../services/ReviewService";

const AddReviewWrapper = styled.div`

`;

const ReviewForm = styled.form`

`;

const ReviewTea = () => {
  const initialReviewState = {
    title: "",
    content: ""
  };

  const [review, setReview] = useState(initialTeaState);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;
    setReview({ ...tea, [name]: value });
  };

  const saveReview = e => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.keys(tea).forEach(k => {
      formData.append(k, tea[k]);
    });

    console.log(photos[0]);
    photos[0].forEach(f => {
      console.log(f);
      formData.append("photos", f, f.name);
    });

    console.log(formData);
    TeaService.create(formData)
      .then(response => {
        setReview({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content
        });
        setSubmitted(true);
        console.log(response);
        // history.push(`/tea/${response.data.id}`);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newReview = () => {
    setReview(initialTeaState);
    setSubmitted(false);
  };

  return (
    <AddReviewWrapper>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTea}>
            Add
          </button>
        </div>
      ) : (
        <ReviewForm>
          <TextField
            label="Name"
            value={tea.name}
            name="name"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Tea Type"
            value={tea.teaType}
            name="teaType"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Packaging"
            value={tea.packaging}
            name="packaging"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Region"
            value={tea.region}
            name="region"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Estate"
            value={tea.estate}
            name="estate"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Flavor"
            value={tea.flavor}
            name="flavor"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Leaf"
            value={tea.leaf}
            name="leaf"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Brew Color"
            value={tea.brewColor}
            name="brewColor"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            value={tea.description}
            name="description"
            multiline
            variant="outlined"
            onChange={handleChange}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={handleImageChange}
          />
          <button onClick={saveTea} className="btn btn-success">
            Submit
          </button>
        </ReviewForm>
      )}
    </AddReviewWrapper>
  );
};

export default AddTea;