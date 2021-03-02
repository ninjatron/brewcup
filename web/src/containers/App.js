import React, { Fragment, createContext, useEffect, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from "react";
// import own components
// import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
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
  padding: 0 25px;
  max-width: 980px;
  margin: 0 auto;
  min-height: 100vh;
`;

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const AppContext = createContext(null);
  const AppContextPro = useContext(AppContext);

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      const currUser = await AuthService.getCurrentUser();
      if (currUser)
        userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <AppContextPro.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Router>
            <Header />
            <Route path='/' exact component={Home} />
            <Route path='/teas' component={Teas} />
            <Route path='/tea/:teaId' component={TeaProfile}></Route>
            <Route path='/add-tea' component={AddTea} />
            <Route path={["/login", "/signup"]} component={Enter} />
          </Router>  
        </AppContextPro.Provider>
      </AppWrapper>
    </Fragment>
  )
};

export default App;
