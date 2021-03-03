import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <Link to="/">Brew &amp; Cup</Link>
    </LogoWrapper>
  )
};

export default Logo;