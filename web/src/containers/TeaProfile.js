import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import TeaSingle from '../components/product/TeaSingle';

const TeaProfileWrapper = styled.div`

`;

const TeaProfile = (props) => {
  return (
    <TeaProfileWrapper>
      <TeaSingle />
    </TeaProfileWrapper>  
  )
};

export default TeaProfile;