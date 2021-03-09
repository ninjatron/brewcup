import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const CardWrapper = styled.div`
  

  &:hover {
    transform: scale(1.03, 1.03);
    transition: transform 0.2s ease-in-out;
    opacity: 0.85;
    cursor: pointer;
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

  const handleClick = e => {
    e.preventDefault();
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
          <IconButton size="small" aria-label="add to favorites">
            <FavoriteIcon />
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