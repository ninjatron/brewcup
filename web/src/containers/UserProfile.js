import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import MyAccount from '../components/auth/MyAccount';
import Profile from '../components/user/Profile';

const UserProfileWrapper = styled.div`

`;

const UserProfile = (props) => {
  const history = useHistory();
  const path = history.location.pathname;

  console.log(path);

  return (
    <UserProfileWrapper>
      { path === '/my-account' ? <MyAccount /> : <Profile />}
    </UserProfileWrapper>  
  )
};

export default UserProfile;