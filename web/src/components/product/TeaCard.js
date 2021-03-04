import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 240,
    maxHeight: 360
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const CardFooter = styled.div`

  button {
    padding: 8px;
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
    <Card className={classes.root}>
      <CardHeader
        title={tea.name}
      />
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
        <Link to={{ pathname: `/tea/${tea._id}`, state: { tea: tea }}}>Learn More</Link>
        </CardFooter>
    </Card>
  );
};

export default TeaCard;