import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, IconButton, 
         Typography } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import TeaService from '../../services/TeaService';

const CardWrapper = styled.div`
  

  &:hover {
    transform: scale(1.03, 1.03);
    transition: transform 0.2s ease-in-out;
    opacity: 0.85;
    cursor: pointer;
  }

  .favorite {
    fill: red;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: 230,
    height: 300,
    position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const CardTop = styled.div`
  display: flex;
  font-family: cursive;
  font-size: 18px;
  align-items: center;
  height: 30px;
  padding: 5px 8px;
  white-space: nowrap;
`;

const CardFooter = styled.div`
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%; 

  button {
    padding: 8px;
  }

  a {
    font-size: 12px;
    float: right;
    font-weight: bold;
    margin: 10px;
  }
`;

const DescWrapper = styled.div`
  max-height: 60px;
  overflow: hidden;
`;

const TeaCard = (props) => {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);
  const tea = props.tea;
  const history = useHistory();
  const [isFavorite, setFavorite] = useState(tea.favoritedBy.indexOf(props.userId) >= 0 ? true : false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: give a warning or send to registration page
    if (props.userId) {
      TeaService.toggleFavorite(tea._id, props.userId);
      setFavorite(!isFavorite);
    } else {
      // TODO: show popup for registration or login
    }
  }

  const handleClick = e => {
    history.push(`/tea/${tea._id}`);
  }

  return (
    <CardWrapper onClick={handleClick}>
      <Card className={classes.root}>
        <CardTop>{tea.name}</CardTop>      
        <CardMedia
          className={classes.media}
          image={tea.photos[0]}
          title={tea.name}
        />
        <CardContent>
          <DescWrapper>
            <Typography variant="body2" color="textSecondary" component="p">
              {tea.description}
            </Typography>
          </DescWrapper>
        </CardContent>
        <CardFooter>
          <IconButton onClick={toggleFavorite} size="small" aria-label="add to favorites">
            <FavoriteIcon className={isFavorite ? 'favorite' : '' } />
          </IconButton>
          <IconButton size="small" aria-label="share">
            <ShareIcon />
          </IconButton>
          </CardFooter>
      </Card>
    </CardWrapper>
  );
};

export default TeaCard;