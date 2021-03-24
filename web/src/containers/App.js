import React, { Fragment, createContext, useEffect, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from "react";
import jwtDecode from 'jwt-decode';
// import own components
import { AppContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Home from './Home';
import Teas from './Teas';
import TeaProfile from './TeaProfile';
import UserProfile from './UserProfile';
import Enter from './Enter';
import AddTea from '../components/product/AddTea';
//import tempBg from '../static/teabg-2.jpeg';
//background-image: url(${tempBg});


const GlobalStyle =  createGlobalStyle`
  body {
    /*font-family: 'Quicksand', sans-serif;*/
    font-family: system-ui;
    font-size: 15px;
    margin: 0;
    background-size: auto;
  }

  a {
    text-decoration: none;
  }
`;

const AppWrapper = styled.div`
  background: #fff;
  max-width: 980px;
  margin: 0 auto;
  min-height: calc(100vh - 210px);
`;

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      const currUser = await AuthService.getCurrentUser();
      if (currUser) {
        setUser({...currUser});
        const { exp } = jwtDecode(currUser.token);
        const expiration = (exp * 1000) - 60000;
        if (Date.now() >= expiration) {
          localStorage.removeItem('currentUser');
          userHasAuthenticated(false);
        }
        else userHasAuthenticated(true);
      }
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
      <Router>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, user }}>
          <Header />
            <AppWrapper>
              <Route path='/' exact component={Home} />
              <Route path='/teas' component={Teas} />
              <Route path='/tea/:teaId' component={TeaProfile}></Route>
              <Route path='/add-tea' component={AddTea} />
              <Route path={['/user/:userId', '/my-account']} component={UserProfile} />
              <Route path={["/login", "/signup"]} component={Enter} />
            </AppWrapper>
          <Footer />
        </AppContext.Provider>
      </Router>  
    </Fragment>
  )
};

export default App;
