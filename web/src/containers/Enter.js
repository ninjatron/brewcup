import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import Login from '../components/auth/Login';

const EntranceWrapper = styled.div`

`;

const Enter = (props) => {
  return (
    <EntranceWrapper>
      <Login />
    </EntranceWrapper>
  );
};

export default Enter;