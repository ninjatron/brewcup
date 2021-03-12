import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import UserService from '../../services/UserService';
import AuthService from "../../services/AuthService";

const MyAccountWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
`;

const ProfileFormWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const ProfileForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 450px;
  margin-left: 30px;
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
  margin-left: 10px;
  width: 120px;
  height: auto;
  
  h3 {
    margin-bottom: 18px;
  }
  p {
    font-size: 12px;
  }
  .MuiDropzoneArea-icon {
    display: none;
  }
  .MuiDropzoneArea-root {
    background-image: url(${props => props.avatarUrl});
    height: 120px;
    min-height: 120px;
  }
`;


const MyAccount = () => {
  const initialUser = {
    email: "",
    reviews: [],
    favorites: [],
    addedProducts: [],
    fullname: "",
    location: "",
    imageUrl: "",
  };

  const [user, setUser] = useState(initialUser);

  const handleAvatarChange = avatar => {
    console.log(avatar);
    console.log(user);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const getUserData = () => {
    let user = AuthService.getCurrentUser();
    UserService.single(user.userId)
     .then(res => {
       console.log(res.data.user);
       setUser(res.data.user);
     })
     .catch(err => {
       console.log(err);
     })
  }

  const saveChanges = () => {

  }

  useEffect(() => {
    getUserData();
  }, [user._id]);  

  return (
    <MyAccountWrapper>
      <h3>My Account</h3>
      <ProfileFormWrapper>
        <DropzoneAreaWrapper avatarUrl={user.avatarUrl}>
          <DropzoneArea
              Icon={''}
              acceptedFiles={['image/*']}
              dropzoneText={""}
              onChange={handleAvatarChange}
              filesLimit={1}
              maxFileSize={1024000}
          />
          <p>Max 1mb file size.</p>
        </DropzoneAreaWrapper>
        <ProfileForm>
          <TextField
            label="Full Name"
            value={user.fullname}
            name="fullname"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="E-mail"
            value={user.email}
            name="email"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Location"
            value={user.location}
            name="location"
            onChange={handleChange}
            variant="outlined"
          />
          <SubmitButton onClick={saveChanges}>Submit Tea</SubmitButton>
        </ProfileForm>
      </ProfileFormWrapper>
    </MyAccountWrapper>
  )
};

export default MyAccount;