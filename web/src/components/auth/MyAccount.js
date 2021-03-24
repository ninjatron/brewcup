import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { DropzoneArea } from 'material-ui-dropzone';

import UserService from '../../services/UserService';
import AuthService from "../../services/AuthService";

const MyAccountWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
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
  width: 100%;
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
    background: #bf2800;
    color: #fff;
    cursor: pointer;
  }
`;

const DropzoneAreaWrapper = styled.div`
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
    background-size: cover;
    height: 120px;
    min-height: 120px;
  }
`;


const MyAccount = () => {
  const initialUser = {
    _id: "",
    email: "",
    reviews: [],
    favorites: [],
    addedProducts: [],
    fullname: "",
    location: "",
    avatarUrl: "",
  };

  const [user, setUser] = useState(initialUser);
  const [updatedAvatar, setAvatar] = useState([]);
  const [userUpdated, setUserUpdated] = useState(false);

  const handleAvatarChange = avatar => {
    setAvatar(avatar);
  }

  const handleChange = e => {
    setUserUpdated(true);
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const getUserData = () => {
    let initUser = AuthService.getCurrentUser();
    UserService.single(initUser.user._id)
     .then(res => {
       setUser({...initialUser, ...res.data.user});
     })
     .catch(err => {
       console.log(err);
     })
  }

  const saveChanges = () => {
    if (updatedAvatar.length) {
      // we have updated avatar, call backend
      const formData = new FormData();
      formData.append('avatar', updatedAvatar[0], updatedAvatar[0].name);
      UserService.updateAvatar(user._id, formData);
    }
    if (userUpdated) {
      console.log(user);
      UserService.update(user)
        .then(updatedUser => {
          setUser(updatedUser);
        })
        .catch(err => {
          console.log("show some feedback later");
        })
    }
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
          <SubmitButton onClick={saveChanges}>Update Profile</SubmitButton>
        </ProfileForm>
      </ProfileFormWrapper>
    </MyAccountWrapper>
  )
};

export default MyAccount;