import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const HomeWrapper = styled.div`
  font-size: 50px;
`;

class Home extends Component {
  render() {
    return (
      <HomeWrapper>YOOO</HomeWrapper>
    );
  }
}

export default Home;