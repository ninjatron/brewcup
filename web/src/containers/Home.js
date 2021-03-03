import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import TeaList from '../components/product/TeaList';
import Banner from '../components/home/Banner';

const HomeWrapper = styled.div`
  width: 100%;
`;

const WelcomeHome = styled.h1`
  font-size: 20px;
`;

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <Banner>
          <WelcomeHome>Welcome to Brew &amp; Cup, a place for tea lovers.</WelcomeHome>
        </Banner>
        <TeaList sampleLimit={10} />
      </HomeWrapper>
    );
  }
}

export default Home;