import React, { useState } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

import AuthService from "../../services/AuthService";

const AuthFormWrapper = styled.div`

`;

const LoginFormWrapper = styled.div`

`;

const Login = (props) => {
  const history = useHistory();
  const initialUserState = {
    id: null,
    email: "",
    username: "",
    password: "",
    signup: props.signup,
  };

  const [user, setUser] = useState(initialUserState);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

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
        setSubmitted(true);
        console.log(response);
        history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const LoginUser = () => {
    var data = {
      username: user.username,
      password: user.password
    };

    AuthService.create(data)
      .then(response => {
        userHasAuthenticated(true);
        console.log(response);
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

export default AddTea;