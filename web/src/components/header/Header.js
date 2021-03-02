import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
// own imports
import AuthService from '../../services/AuthService';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  margin: 0 -25px;
  background: #464e56;
  padding: 0 25px;
`;

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  a {
    color: #fff;
    margin-right: 1em;
  }
`;

const LeftArea = styled.div`
  display: flex;
  font-size: 1em;
  font-weight: bold;
`;

const RightArea = styled.div`

`;

const Header = (props) => {
  //const [currentUser, setCurrentUser] = useState(false);
  const isAuthenticated = useContext();

  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();
  //   console.log(user);
  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, []);

  return (
    <HeaderWrapper>
      <NavWrapper>
        <LeftArea>
          <Logo />
          <nav>
            <Link to={"/teas"}>Teas</Link>
            <Link to={"/tea-rooms"}>Tea Rooms</Link>
            <Link to={"/reviews"}>Reviews</Link>
            <Link to={"/add"}>Community</Link>
          </nav> 
        </LeftArea>
        <RightArea>
          {isAuthenticated ? (
              <>
                <Link to="/my-account">My Account</Link>
                <Link to="/" onClick={AuthService.logout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </>
            )}
        </RightArea>         
      </NavWrapper>
    </HeaderWrapper>
  )
};

export default Header;

