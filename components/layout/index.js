import Navbar from './Navbar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space between',
    minHeight: '100vh',
  },
  mainContainer: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: 'white',
  }
});

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Navbar />
      <main className={classes.mainContainer}>{children}</main>
      <Footer />
    </div>
  );
}
