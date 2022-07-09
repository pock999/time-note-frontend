import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

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
} from '@mui/material';
import {
  AccountCircle,
} from '@mui/icons-material';

import MenuIcon from '@mui/icons-material/Menu';

import { logoutAction } from '../store/reducers/auth';
import { fetchNoteCategory } from '../store/reducers/note';

// custom utils
import SwalHelper from '../utils/SwalHelper';

// custom components
import { DrawerContent, CategoryFormModal } from './components';

const drawerWidth = 320;

const emptyCategory = {
  name: '',
  color: '#707070',
};

export default function BaseLayout(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const drawerTypes = useSelector((state) => state.layout.drawerTypes);
  const drawerCategories = useSelector((state) => state.layout.drawerCategories);

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

  // FormModal is open
  const [modalOpen, setModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({ ...emptyCategory });

  // 關閉category編輯
  const closeForm = async () => {
    setModalOpen(false);
    setFormData({ ...emptyCategory });
  };

  const openForm = async ({ rowId = null }) => {
    console.log('openForm ===');
    if (rowId) {
      const resultAction = await dispatch(fetchNoteCategory({ id: rowId }));
      const data = await unwrapResult(resultAction);

      setModalOpen((pre) => {
        setFormData(data);
        return true;
      });
    } else {
      setModalOpen((pre) => {
        setFormData({
          ...emptyCategory,
        });
        return true;
      });
    }
  };

  // 對category編輯(onChange)
  const editForm = (value, target) => {
    // console.log('value => ', value);
    // console.log('target => ', target);
    setFormData({
      ...formData,
      [target]: value,
    });
  };

  // 保存
  const saveForm = async () => {
    try {
      let resultAction;
      console.log('formData => ', formData);

      if (formData.id) {
        // resultAction = await dispatch(updateNote(formData));
      } else {
        // resultAction = await dispatch(createNote(formData));
      }

      // await unwrapResult(resultAction);

      SwalHelper.success(`${formData.id ? '更新' : '新增'}成功`);

      closeForm();
    } catch (e) {
      SwalHelper.fail(e.message);
    }
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

      <CategoryFormModal
        isOpen={modalOpen}
        category={formData}
        handleClose={() => closeForm()}
        editForm={editForm}
        handleSave={() => saveForm()}
      />

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
          <DrawerContent
            drawerTypes={drawerTypes}
            drawerCategories={drawerCategories}
            pathname={location.pathname}
            openForm={openForm}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <DrawerContent
            drawerTypes={drawerTypes}
            drawerCategories={drawerCategories}
            pathname={location.pathname}
            openForm={openForm}
          />
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
