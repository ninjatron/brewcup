import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import own components
import Header from '../components/header/Header';
import Home from './Home';

const GlobalStyle =  createGlobalStyle`
  font-size: 30px;
`;

const AppWrapper = styled.div`

`;

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <AppWrapper>
          <Header />
          <Router>
            <Route path='/' component={Home} /> 
          </Router>    
        </AppWrapper>
      </Fragment>
    );
    }
}

export default App;
