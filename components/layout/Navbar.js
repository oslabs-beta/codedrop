import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/styles';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signOut, useSession } from 'next-auth/client';
import Image from 'next/image';

const useStyles = makeStyles({
  navbarItems: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#455A64',
    height: 70,
    padding: '0 30px',
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
  },
  menuRoundedIcon: {
    color: '#FFFFFF',
    height: 40,
    width: 40,
  }
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

  return (
    <div className={classes.navbarItems}>
      <Image 
        className={classes.codedropLogo}
        src='/newLogo.svg' 
        width='300' 
        height='70' 
        alt='logo' 
        onClick={() => router.push('/')} 
      />
      {session && (
        <>
          <MenuRoundedIcon
            className={classes.menuRoundedIcon}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <AccountCircle />
          </MenuRoundedIcon>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={() => router.push('/projects')}>Projects</MenuItem>
            <MenuItem onClick={() => signOut({ callbackUrl: `/signin` })}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}
