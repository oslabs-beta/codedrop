import { useState } from 'react'
import { Typography, Button, CircularProgress, Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/client';
import { PROJECT_QUERY } from '../lib/apolloQueries';
import { PROJECT_MUTATION } from '../lib/apolloMutations';
import createNewProject from './util/createNewProject'

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
  button: {
    color: '#FFECD6'
  }
});

function SplashPage({ session }) {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  // use updateProject to change all/any properties on a project
  const [updateProject] = useMutation(PROJECT_MUTATION,
    {
      update(cache, result) {
        console.log('inside update function');
        const {data} = result;
        console.log('data', data);
        const project = data.addProject.project;
        const id = project.id
        console.log('project', project);
        console.log('id', id)
        cache.writeQuery({
          query: PROJECT_QUERY,
          data: project,
          variables: { id }
        });
      }
    });
  
  //check for active session, otherwise use guest
  const username = session ? session.user.email : 'guest';
  
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
          onClick={() => {
            setLoading(true);
            createNewProject(router, updateProject, username);
          }}
        >
          {loading && <CircularProgress size={72} className={classes.button} />}
          {!loading && 'Get Started'}
        </Button>
      </Container>
    </>
  );
}

export default SplashPage;
