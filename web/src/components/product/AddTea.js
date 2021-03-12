import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom'; 
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';

import TeaService from "../../services/TeaService";

const AddTeaWrapper = styled.div`
  display: table;
  margin: 0 auto;
  margin-top:30px;

  .MuiDropzoneArea-root {
    height: auto;
    min-height: 100px;
  }

  .MuiTypography-h5 {
    font-size: 12px;
  }

  .MuiGrid-spacing-xs-8 {
    width: 100%;
    margin: 0;
   .MuiGrid-item {
      padding: 10px;
    }
  }

  .MuiDropzonePreviewList-image {
    height: 60px;
  }
`;

const TeaForm = styled.form`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  width: 450px;
  input {
    display: block;
    padding: 10px 14px;
  }
  div {
    margin-bottom: 10px;
  }
  textarea {
    height: 160px !important;
  }
  label {
    transform: translate(14px, 14px) scale(1);
  }
`;

const SubmitButton = styled.div`
  align-self: flex-end;
  display: flex;
  background: #2e3031;
  font-weight: 600;
  align-items: center;
  height: 28px;
  padding: 4px 15px;
  color: white;
  border: 1px solid white;

  &:hover {
    background: #23e7e8;
    color: #fff;
    cursor: pointer;
  }
`;

const DropzoneAreaWrapper = styled.div`
  display: inline-grid;
  margin-left: 30px;
  width: 300px;
  height: auto;
  h3 {
    margin-bottom: 18px;
  }
  p {
    font-size: 12px;
  }
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

    photos[0].forEach(f => {
      formData.append("photos", f, f.name);
    });

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
        if (response.data._id) {
          history.push(`/tea/${response.data._id}`);
        } else {
          // TODO: show some warning to user
        }
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
      <TeaForm>
        <h3>Tell Us About the Tea</h3>
        <TextField
          label="Name"
          value={tea.name}
          name="name"
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label="Tea Type"
          value={tea.teaType}
          name="teaType"
          onChange={handleChange}
          variant="outlined"
          required
        />
        <TextField
          label="Packaging"
          value={tea.packaging}
          name="packaging"
          onChange={handleChange}
          variant="outlined"
          required
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
        <SubmitButton onClick={saveTea}>Submit Tea</SubmitButton>
      </TeaForm>
      <DropzoneAreaWrapper>
        <h3>Tea Photos</h3>
        <DropzoneArea
            acceptedFiles={['image/*']}
            // Add up to 12 tea photos by dragging or clicking here:
            dropzoneText={""}
            onChange={handleImageChange}
            filesLimit={12}
            maxFileSize={2048000}
        />
        <p>Up to 12 images, max 2mb file size.</p>
      </DropzoneAreaWrapper>
    </AddTeaWrapper>
  );
};

export default AddTea;