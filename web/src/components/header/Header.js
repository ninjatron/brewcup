import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
// own imports
import Logo from './Logo';

const HeaderWrapper = styled.header`
  height: 60px,
  width: 100%,
  background: blue,
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  a {
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

const Header = () => {
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
        <RightArea>Account Stuff</RightArea>         
      </NavWrapper>
    </HeaderWrapper>
  )
};

export default Header;

