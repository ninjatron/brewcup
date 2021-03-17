import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from "react-router-dom";
// own imports
import { useAppContext } from '../../context/AuthContext';
import AuthService from '../../services/AuthService';
import Logo from './Logo';
import Search from './Search';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  background: #2e3031;
`;

const AddTeaButton = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  height: 28px;
  padding: 4px 15px;
  color: white;
  border: 1px solid white;
  margin-right: 20px;

  &:hover {
    background: #bf2800;
    color: #fff;
    cursor: pointer;
  }
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
      color: #fb7b2f;
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
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-weight: bold;
`;

const Header = (props) => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const handleLogout = () => {
    AuthService.logout();
    userHasAuthenticated(false);
  }

  const handleRedirection = address => {
    history.push(`/${address}`);
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
          <Search />
          <AddTeaButton onClick={() => handleRedirection('add-tea')}>+ Add Tea</AddTeaButton>
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

