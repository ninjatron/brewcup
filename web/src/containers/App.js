import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import own components
import Header from '../components/header/Header';
import Home from './Home';
import Teas from './Teas';

const GlobalStyle =  createGlobalStyle`
  body {
    
  }

  a {
    text-decoration: none;
  }
`;

const AppWrapper = styled.div`

`;

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <AppWrapper>
          <Router>
            <Header />
            <Route path='/' component={Home} />
            <Route path='/teas' component={Teas} />
          </Router>    
        </AppWrapper>
      </Fragment>
    );
    }
}

export default App;
