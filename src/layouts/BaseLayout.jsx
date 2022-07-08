import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import dayjs from 'dayjs';
import _ from 'lodash';

import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Container,
  Menu,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Skeleton,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {
  BookmarksSharp,
  AccountCircle,
} from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MenuIcon from '@mui/icons-material/Menu';

import { logoutAction } from '../store/reducers/auth';

const drawerWidth = 320;

function DrawerContent(props) {
  const {
    drawerTypes,
    pathname,
  } = props;

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            to="/notes"
            component={Link}
            selected={pathname === '/notes'}
          >
            <ListItemIcon>
              <BookmarksSharp />
            </ListItemIcon>
            <ListItemText primary="全部" />
          </ListItemButton>
        </ListItem>
        {
          _.isArray(drawerTypes)
            ? drawerTypes.map((typeItem, index) => (
              <ListItem key={typeItem.value} disablePadding>
                <ListItemButton
                  to={`/notes/${typeItem.value}`}
                  component={Link}
                  selected={pathname === `/notes/${typeItem.value}`}
                >
                  <ListItemIcon>
                    <BookmarksSharp />
                  </ListItemIcon>
                  <ListItemText primary={typeItem.name} />
                </ListItemButton>
              </ListItem>
            ))
            : (
              <>
                <Skeleton animation="wave" variant="ListItem" />
                <Skeleton animation="wave" variant="ListItem" />
                <Skeleton animation="wave" variant="ListItem" />
              </>
            )
        }
      </List>
      <Divider />
      <List>
        {['重要', '待辦', '數學', '國文'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FiberManualRecordIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default function BaseLayout(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const drawerTypes = useSelector((state) => state.layout.drawerTypes);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {
              location.pathname === '/notes'
                ? (
                  <span
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    Time-Notes
                  </span>
                )
                : (
                  <Link
                    to="/notes"
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                    }}
                  >
                    Time-Notes
                  </Link>
                )
            }

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

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <DrawerContent drawerTypes={drawerTypes} pathname={location.pathname} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContent drawerTypes={drawerTypes} pathname={location.pathname} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1, p: 1, pt: 5, width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {props.children}

      </Box>

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
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            Rick, Hou
          </a>
        </div>
      </AppBar>
    </Box>
  );
}
