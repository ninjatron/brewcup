import React, { useState } from "react";
import styled from 'styled-components';
import { useHistory, useLocation, Link } from "react-router-dom";
import { TextField, Button, ClickAwayListener } from '@material-ui/core';

import AuthService from "../../services/AuthService";
import { useAppContext } from '../../context/AuthContext';

const AuthPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const FormWrapper = styled.div`
  width: 229px;
  padding: 30px;
  min-height: 220px;
  height: auto;
  background-color: #fff;
  display: grid;
  margin: 0 auto;
  margin-top: 10%;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0,0,0);
  z-index: 99;
  button {
    margin-top: 20px;
  }
  div {
    margin-bottom: 5px;
  }
`;

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { userHasAuthenticated } = useAppContext();

  const initialUserState = {
    id: null,
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialUserState);
  const signup = location.pathname === "/signup";

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signupUser = () => {
    var data = {
      username: user.username,
      email: user.email,
      password: user.password
    };

    AuthService.create(data)
      .then(response => {
        // setUser({
        //   id: response.data.id,
        //   name: response.data.name,
        //   description: response.data.description,
        // });
        userHasAuthenticated(true);
        console.log(response);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const loginUser = () => {
    var data = {
      username: user.username,
      password: user.password
    };

    console.log(data);
    AuthService.login(data)
      .then(response => {
        userHasAuthenticated(true);
        console.log("Login: ", response);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        userHasAuthenticated(true);
        history.push("/");
      })
      .catch(e => {
        console.log(e);
      });

  };

  const closeOnClick = () => {
    console.log("closed on click");
    history.push("/");
  }

  const newUser = () => {
    setUser(initialUserState);
  };

  return (
    <AuthPageWrapper>
      <ClickAwayListener onClickAway={closeOnClick}>
      {signup ? (
        <FormWrapper>
          <TextField
            required
            id="email"
            label="E-mail"
            name="email"
            defaultValue=""
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            defaultValue=""
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
          <TextField
            id="password-confirm"
            label="ConfirmPassword"
            type="password"
            name="confirmPassword"
            required
            autoComplete="current-password"
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />

          <Button 
            variant="contained" 
            onClick={signupUser} 
            size="medium" 
            color="primary">
            Register
          </Button>
          
        </FormWrapper>       
      ) : (
        <FormWrapper>
          <TextField
            required
            id="username"
            label="Username"
            name="username"
            defaultValue=""
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            onChange={handleInputChange}
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained" 
            onClick={loginUser} 
            size="medium" 
            color="primary">
            Login
          </Button>

          <Link to="/reset-password">I forgot my password.</Link>

        </FormWrapper>
        )}
      </ClickAwayListener>
    </AuthPageWrapper>
  );
};

export default Login;