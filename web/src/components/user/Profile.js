import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  font-size: 26px;
  font-weight: 300;
  margin-right: 25px;
`;

const Profile = () => {
  return (
    <ProfileWrapper>
      <p>Profile</p>
    </ProfileWrapper>
  )
};

export default Profile;