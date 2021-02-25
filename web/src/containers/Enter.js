import React, { useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Redirect } from 'react-router-dom';
// self components
import { useAuthContext } from '../context/AuthContext';
import Login from '../components/auth/Login';

const EntranceWrapper = styled.div`

`;

const Enter = (props) => {
  const { isAuthenticated } = useAuthContext();

  return (
    <EntranceWrapper>
      {isAuthenticated ? (<Redirect to="/"></Redirect>) : (<Login />) }  
    </EntranceWrapper>
  );
};

export default Enter;