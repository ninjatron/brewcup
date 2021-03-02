import React, { useState } from "react";
import styled from 'styled-components';
import { useHistory, useLocation } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { useAppContext } from '../../context/AuthContext';

const AuthFormWrapper = styled.div`

`;

const LoginFormWrapper = styled.div`

`;

const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { userHasAuthenticated } = useAppContext();

  //const currUser = JSON.parse(localStorage.getItem('currentUser'));
  //console.log("Token:", currUser);

  const initialUserState = {
    id: null,
    email: "",
    username: "",
    password: "",  
  };

  const [user, setUser] = useState(initialUserState);
  const signup = location.pathname === "/signup";

  const handleInputChange = event => {
    console.log(event);
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

  const newUser = () => {
    setUser(initialUserState);
  };

  return (
    <AuthFormWrapper>
      {signup ? (
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={signupUser} className="btn btn-success">
            Submit
          </button>
        </div>          
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={loginUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </AuthFormWrapper>
  );
};

export default Login;