import react from 'react';
import styled from 'styled-components';

import tempBg from '../../static/teabg-1.jpg';

const BannerWrapper = styled.div`
  background-image: url(${tempBg});
  height: 400px;
  width: 100%;
  background-size: cover;
`;


const Banner = () => {
  return(
    <BannerWrapper>
    </BannerWrapper>
  );
}

export default Banner;