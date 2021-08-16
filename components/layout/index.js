import Navbar from './Navbar';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space between',
    height: '100vh',
  },
  mainContainer: {
    height: '100%',
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
