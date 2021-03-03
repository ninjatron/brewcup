import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
// own imports
import { useAppContext } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  background: #2e3031;
`;

const NavWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  a {
    color: #fff;
    margin-right: 15px;
    &:hover {
      color: #23e7e8;
    }
  }
  nav {
    display: flex;
    align-items: center;
  }
`;

const LeftArea = styled.div`
  display: flex;
  font-size: 1em;
  font-weight: normal;
  margin-left: 15px;
`;

const RightArea = styled.div`
  margin-right: 5px;
  font-weight: bold;
`;

const Header = (props) => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  
  const handleLogout = () => {
    AuthService.logout();
    userHasAuthenticated(false);
  }

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
                <Link to="/" onClick={handleLogout}>Logout</Link>
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

