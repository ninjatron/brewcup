import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from "react";
// import own components
import { AuthContext } from '../context/AuthContext';
import Header from '../components/header/Header';
import Home from './Home';
import Teas from './Teas';
import TeaProfile from './TeaProfile';
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


const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <AuthContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Router>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/teas' component={Teas} />
            <Route path='/tea/:teaId' component={TeaProfile}></Route>
            <Route path='/add-tea' component={AddTea} />
            <Route path={["/login", "/signup"]} component={Enter} />
          </Router>  
        </AuthContext.Provider>
      </AppWrapper>
    </Fragment>
  )
};

export default App;
