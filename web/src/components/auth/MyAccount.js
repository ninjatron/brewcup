import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyAccountWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
`;

const MyAccount = () => {
  return (
    <MyAccountWrapper>
      <p>My Account</p>
    </MyAccountWrapper>
  )
};

export default MyAccount;