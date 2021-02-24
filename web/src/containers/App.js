import React, { Component, Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useContext, createContext } from "react";
// import own components
import Header from '../components/header/Header';
import Home from './Home';
import Teas from './Teas';
import Enter from './Enter';
import AddTea from '../components/product/AddTea';

const GlobalStyle =  createGlobalStyle`
  body {
    
  }

  a {
    text-decoration: none;
  }
`;

const AppWrapper = styled.div`

`;

const Context = createContext(null);

const App = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Context.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Router>
            <Header />
            <Route path='/' component={Home} />
            <Route path='/teas' component={Teas} />
            <Route path='/add-tea' component={AddTea} />
            <Route path='/login' component={Enter} />
          </Router>  
        </Context.Provider>
      </AppWrapper>
    </Fragment>
  )
};

export default App;
