import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom'; 

import TeaList from '../components/product/TeaList';

const TeasWrapper = styled.div`
  
`;

const Teas = () => {
  return (
    <TeasWrapper>
      <TeaList />
    </TeasWrapper>
  )
};

export default Teas;