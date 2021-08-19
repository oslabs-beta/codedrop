import { getCsrfToken } from 'next-auth/client';
import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';

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

  return (
    <div className={classes.signInPageContainer}>
      <div className={classes.signInContainer}>
        <Typography variant="h3" className={classes.title} onClick={() => router.push('/')}>
          codedrop
        </Typography>
        <form className={classes.signInForm} method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <FormLabel className={classes.label}>Email address</FormLabel>
          <Input type="email" id="email" name="email" className={classes.input} />
          <Button type="submit" variant="outlined" className={classes.button}>
            Sign in with Email
          </Button>
        </form>
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
