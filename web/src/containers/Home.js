import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import TeaList from '../components/product/TeaList';

const HomeWrapper = styled.div`
  font-size: 50px;
  width: 600px;
`;

class Home extends Component {
  render() {
    return (
      <HomeWrapper>
        <TeaList sampleLimit={10} />
      </HomeWrapper>
    );
  }
}

export default Home;