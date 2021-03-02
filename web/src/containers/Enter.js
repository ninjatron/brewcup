import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from 'react-router-dom';
// self components
// import { useAuthContext } from '../context/AuthContext';
import Login from '../components/auth/Login';
import AuthService from '../services/AuthService';

const EntranceWrapper = styled.div`

`;

const Enter = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <EntranceWrapper>
      {currentUser ? (<Redirect to="/"></Redirect>) : (<Login />) }  
    </EntranceWrapper>
  );
};

export default Enter;