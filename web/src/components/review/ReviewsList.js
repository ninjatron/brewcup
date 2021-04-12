import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const ReviewsListWrapper = styled.div`
  display: block;
`;

const ReviewWrapper = styled.div`
  padding: 15px 15px;
  font-size: 14px;

  span {
    float: left;
    margin-right: 10px;
  }
`;

const ReviewsList = (props) => {
  return (
    <ReviewsListWrapper>
      <h2>Reviews</h2>
      { props.reviews ? 
        (props.reviews.map(review => 
          <ReviewWrapper key={review._id}>
            <span><Avatar src={review.author ? review.author.avatarUrl : ''} /></span>
            <b>{review.title}</b>
            <p>{review.content}</p>
          </ReviewWrapper>
        )) : ('No reviews yet.')
      }
    </ReviewsListWrapper>
  );
};

export default ReviewsList;