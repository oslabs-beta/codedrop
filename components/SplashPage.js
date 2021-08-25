import { Typography, Button, Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    backgroundColor: '#FFECD6',
    width: '100%',
    paddingLeft: 80,
  },
  productivityText: {
    paddingTop: 150,
  },
  createText: {
    paddingTop: 40,
    paddingBottom: 50,
  },
  roundButton: {
    fontSize: '180%',
    backgroundColor: 'primary',
    borderRadius: 100,
    width: 200,
    height: 200,
  },
});

function SplashPage() {
  const router = useRouter();
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Typography className={classes.productivityText} variant="h2">
          Increase your productivity
        </Typography>
        <Typography className={classes.createText} variant="h5">
          create, share, and reuse your code
        </Typography>
        <Button
          className={classes.roundButton}
          variant="contained"
          color="primary"
          onClick={() => router.push('/project/1')}
        >
          Get Started
        </Button>
      </Container>
    </>
  );
}

export default SplashPage;