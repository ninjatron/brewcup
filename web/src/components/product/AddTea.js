import React, { useState } from "react";
import styled from 'styled-components';

import TeaService from "../../services/TeaService";

const AddTeaWrapper = styled.div`

`;

const AddTea = () => {
  const initialTeaState = {
    id: null,
    name: "",
    description: "",
    published: false
  };

  const [tea, setTea] = useState(initialTeaState);
  const [submitted, setSubmitted] = useState(false);
  const currUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleInputChange = event => {
    console.log(event);
    const { name, value } = event.target;
    setTea({ ...tea, [name]: value });
  };

  const saveTea = () => {
    var data = {
      name: tea.name,
      description: tea.description
    };

    TeaService.create(data)
      .then(response => {
        setTea({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTea = () => {
    setTea(initialTeaState);
    setSubmitted(false);
  };

  return (
    <AddTeaWrapper>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTea}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={tea.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tea.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTea} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </AddTeaWrapper>
  );
};

export default AddTea;