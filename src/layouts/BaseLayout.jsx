import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Container,
  Menu,
  Typography,
} from '@mui/material';

import {
  AccountCircle,
} from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';

import { logoutAction } from '../store/reducers/auth';

export default function BaseLayout(props) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Time-Notes
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/profile">個人資料</MenuItem>
            <MenuItem onClick={() => { dispatch(logoutAction()); }}>登出</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container>
        {props.children}
      </Container>

      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: 'auto', bottom: 0, padding: 1 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Made By&ensp;
          <a
            target="_blank"
            href="https://github.com/pock999"
            style={{
              color: '#000',
              fontWeight: 'bold',
            }}
          >
            Rick, Hou
          </a>
        </div>
      </AppBar>
    </>
  );
}
