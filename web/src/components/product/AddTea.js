import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';

import TeaService from "../../services/TeaService";

const AddTeaWrapper = styled.div`

`;

const TeaForm = styled.form`

`;

const AddTea = () => {
  const initialTeaState = {
    id: null,
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

  const [tea, setTea] = useState(initialTeaState);
  const [photos, setPhoto] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleChange = event => {
    const { name, value } = event.target;
    setTea({ ...tea, [name]: value });
  };

  const handleImageChange = photo => {
    const temp = [];
    temp.join(photos);
    temp.push(photo);
    setPhoto([...temp]);
  }

  const saveTea = e => {
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
        setTea({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          teaType: response.data.teaType,
          packaging: response.data.name,
          region: response.data.region,
          estate: response.data.estate,
          isAvailable: false,
          flavor: response.data.flavor,
          leaf: response.data.leaf,
          brewColor: response.data.brewColor,
        });
        setSubmitted(true);
        console.log(response);
        // history.push(`/tea/${response.data.id}`);
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
        <TeaForm>
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
        </TeaForm>
      )}
    </AddTeaWrapper>
  );
};

export default AddTea;