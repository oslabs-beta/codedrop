import { Typography, Button, Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import initialData  from '../components/dnd/initial-data';
import { PROJECT_MUTATION, ADD_USER } from '../lib/apolloMutations';


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

function SplashPage({ session }) {
  const router = useRouter();
  const classes = useStyles();
  const initialLayout = initialData.layout
  const [updateProject, { data, loading, error }] = useMutation(PROJECT_MUTATION);
  const [addUser, { data: userData, loading: userLoading, error: userError }] = useMutation(ADD_USER);

  const username = ( session ? session.email : 'guest')
  
  const newProject = () => {

    const projectId = uuidv4();

    addUser({
      variables: {
        username
      },
    }); 

    updateProject({
      variables: {
        project: {
          layout: JSON.stringify(initialLayout),
          id: projectId.toString(),
          projectName: 'test',
          // userid: [(user || 'guest']
        },
      },
        awaitRefetchQueries: true,
    }); 

    router.push(`/project/${projectId}`)
  }

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
          onClick={() => newProject()}
        >
          Get Started
        </Button>
      </Container>
    </>
  );
}

export default SplashPage;
