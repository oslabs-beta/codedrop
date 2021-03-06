import { useState } from 'react'
import { Typography, Button, CircularProgress, Container} from '@material-ui/core';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/client';
import { PROJECT_QUERY } from '../lib/apolloQueries';
import { PROJECT_MUTATION } from '../lib/apolloMutations';
import createNewProject from './util/createNewProject'
import initialData  from './dnd/initial-data';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
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
  getStartedText: {
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
  const initialLayout = JSON.stringify(initialData.layout);

  // use updateProject to change all/any properties on a project
  const [updateProject] = useMutation(PROJECT_MUTATION,
    {
      update(cache, result) {
        const { data } = result;
        const project = data.addProject.project[0];
        const id = project.id
        const payload = { 
          getProject: { 
            ...project, 
            components: [],
            layout: initialLayout
          } 
        }
        cache.writeQuery({
          query: PROJECT_QUERY,
          data: payload,
          variables: { id }
        });
      }
    });
  
  //check for active session, otherwise use guest
  const username = session ? session.user.email : 'guest';
  
  return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.productivityText} variant="h2">
          Increase your productivity
        </Typography>
        <Typography className={classes.createText} variant="h5">
          create, share, and reuse your code
        </Typography>
        <Button
          className={classes.roundButton}
          variant="contained"
          color="secondary"
          onClick={() => {
            setLoading(true);
            createNewProject(router, updateProject, username, setLoading);
          }}
        >        
          {loading && <CircularProgress size={72} className={classes.roundButton} />}
          {!loading &&           
            <Typography className={classes.getStartedText} variant="h5">
              Get Started
            </Typography>
          }
        </Button>
      </Container>
    </ div>
  );
}

export default SplashPage;
