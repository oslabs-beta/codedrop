import { Typography, CardMedia, CardContent, CardActions, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  links: {
    display: 'flex',
    justifyContent: 'center'
  }
});
  
const CreatorCard = (props) => {
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 250}}>
      <CardMedia
        component="img"
        alt={`Photo of ${props.name}`}
        height='140px'
        image={props.photo}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.links}>
        <a href={props.github}>Github</a>
        <a href={props.linkedIn}>LinkedIn</a>
      </CardActions>
    </Card>
  )
}

export default CreatorCard;