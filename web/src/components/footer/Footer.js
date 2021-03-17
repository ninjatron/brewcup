import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
// import { Link, useHistory } from "react-router-dom";
// // own imports
// import { useAppContext } from '../../context/AuthContext';
// import AuthService from '../../services/AuthService';
// import Logo from './Logo';
// import Search from './Search';

const FooterWrapper = styled.footer`
  color: #fff;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  background: #2e3031;
`;

const Footer = () => {
  return (
    <FooterWrapper>Made with love in Ann Arbor</FooterWrapper>
  )
};

export default Footer;