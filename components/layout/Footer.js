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
  },
  creatorsLink: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginLeft: 50,
    textDecoration: 'none',
    '&:hover': {
      borderBottom: '1px solid #455A64'
    }
  },
  copyright: {
    paddingTop: 10,
    marginLeft: 50,
    marginRight: 10,
    paddingBottom: 10,
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '1px solid #455A64'
    }
  },
  copyrightLink: {
    textDecoration: 'none',
  },
  github: {
    paddingTop: 10,
    marginLeft: 50,
    marginRight: 10,
    paddingBottom: 10,
    cursor: 'pointer',
    '&:hover': {
      borderBottom: '1px solid #455A64'
    } 
  }
});

export default function StickyFooter() {
  const classes = useStyles();

  const directToGithub = (e) => {
    window.open("https://github.com/oslabs-beta/codedrop","")
  }

  return (
    <footer className={classes.footer}>
            <span className={classes.creators}>
        <Typography variant="body2" color="textSecondary" onClick={directToGithub} className={classes.github} >
          Github
        </Typography>
      </span>
      <span className={classes.creators}>
        <Typography variant="body2" color="textSecondary">
          <Link className={classes.creatorsLink} color="inherit" href="/creators">  
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
