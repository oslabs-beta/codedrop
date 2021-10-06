import { getCsrfToken } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

import { RENAME_PROJECT } from '../lib/apolloMutations';

const useStyles = makeStyles({
  signInPageContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'table',
  },
  signInContainer: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center',
    padding: '.5rem .5rem 10rem .5rem',
  },
  signInForm: {
    display: 'block',
    margin: '0 auto .5rem',
    maxWidth: '300px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#bf7472',
    color: 'white',
    width: '100%',
    '&:hover': {
      backgroundColor: '#dd8683',
    },
  },
  title: {
    color: '#bf7472',
    marginBottom: '20px',
  },
});

export default function SignIn({ csrfToken }) {
  const classes = useStyles();
  const router = useRouter();
  const { projectId } = router.query;
  const [ username, setUsername] = useState('')

  const [renameProject] = useMutation(RENAME_PROJECT);

  const handleSignin = async () => {
    router.push(`/project/${projectId}`);
    // WIP - Guest user isn't removed and session doesn't appear to pass through to the project page. This results in the save button appearing when it shouldn't be.
    await renameProject({
      variables: {
        project: {
          filter: {
            id: {
              eq: projectId,
            },
          },
          // remove: {
          //   user: {
          //     username: 'default'
          //   },
          // },
          set: {
            user: {
              username,
            },
          }
        }
      }
    })
    await axios.post('/api/auth/signin/email', { email: username, csrfToken },)
  }

  return (
    <div className={classes.signInPageContainer}>
      <div className={classes.signInContainer}>
        <Typography variant="h3" className={classes.title} onClick={() => router.push('/')}>
          codedrop
        </Typography>
        <div className={classes.signInForm}>
          <FormLabel className={classes.label}>Email address</FormLabel>
          <Input type="email" id="email" name="email" className={classes.input} onChange={(e) => setUsername(e.target.value)} />
          <Button type="submit" variant="outlined" className={classes.button} onClick={handleSignin}>
            Sign in with Email
          </Button>
        </div>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  
  return {
    props: { csrfToken },
  };
}
