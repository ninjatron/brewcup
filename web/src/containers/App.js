import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from "react";
// import own components
// import { AuthContext } from '../context/AuthContext';
import Header from '../components/header/Header';
import Home from './Home';
import Teas from './Teas';
import TeaProfile from './TeaProfile';
import Enter from './Enter';
import AddTea from '../components/product/AddTea';
import tempBg from '../static/teabg-1.jpg';

const GlobalStyle =  createGlobalStyle`
  body {
    margin: 0;
    background-image: url(${tempBg});
    background-size: auto;
  }

  a {
    text-decoration: none;
  }
`;

const AppWrapper = styled.div`
  background: #fff;
  padding: 25px;
  max-width: 980px;
  margin: 0 auto;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Router>
          <Header />
          <Route path='/' exact component={Home} />
          <Route path='/teas' component={Teas} />
          <Route path='/tea/:teaId' component={TeaProfile}></Route>
          <Route path='/add-tea' component={AddTea} />
          <Route path={["/login", "/signup"]} component={Enter} />
        </Router>  
      </AppWrapper>
    </Fragment>
  )
};

export default App;
