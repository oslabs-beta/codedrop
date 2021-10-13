import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '50px',
    boxShadow: '0px -1px 2px rgb(0 0 0 / 20%)',
  },
  creatorsLink: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    textDecoration: 'none',
    '&:hover': {
      borderBottom: '1px solid #455A64'
    }
  },
  copyright: {
    paddingLeft: 50,
    paddingRight: 10,
  },
  copyrightLink: {
    paddingTop: 10,
    paddingBottom: 10,
    textDecoration: 'none',
  },
});

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <span className={classes.creators}>
        <Typography variant="body2" color="textSecondary">
          <Link className={classes.creatorsLink} color="inherit" href="creators">  
            Creators
          </Link>
        </Typography>
      </span>
      <Typography className={classes.copyright} variant="body2" color="textSecondary">
        {'Copyright © '}
        <Link className={classes.copyrightLink}color="inherit" href="/">
          CodeDrop
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </footer>
  );
}
