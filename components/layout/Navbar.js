import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signIn, signOut, useSession } from 'next-auth/client';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: '#bf7472'
  },
  navbarItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFECD6",
    boxShadow: "none",
    color: "black",
    height: "10vh",
    padding: "0 30px",
  },
});

export default function Navbar() {
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [session] = useSession();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProject = () => {
    // load the projects component
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbarItems} position="static">
        <Typography variant="h4" className={classes.title} onClick={() => router.push('/')}>
          codedrop
        </Typography>
        <MenuRoundedIcon
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </MenuRoundedIcon>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
        >
          {session && <MenuItem onClick={() => signOut()}>Logout</MenuItem>}
          {!session && <MenuItem onClick={() => signIn()}>Sign In</MenuItem>}
          <MenuItem onClick={() => openProject()}>Projects</MenuItem>
        </Menu>
      </AppBar>
    </div>
  );
}
