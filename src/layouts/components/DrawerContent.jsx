import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import _ from 'lodash';

import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Skeleton,
  FormControl,
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';

import {
  BookmarksSharp,
  AccountCircle,
} from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DrawerContent(props) {
  const {
    drawerTypes,
    drawerCategories,
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
            <ListItemText primary="全部類型" />
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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary="全部分類(自定義分類)" />
          </ListItemButton>
        </ListItem>
        {
          _.isArray(drawerCategories)
            ? (
              <>
                {
                  drawerCategories.map((category, index) => (
                    <ListItem key={category.value} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FiberManualRecordIcon style={{ color: category.color }} />
                        </ListItemIcon>
                        <ListItemText primary={category.name} />
                      </ListItemButton>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))
                }
                <ListItem disablePadding>
                  <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                    <ListItemText primary="新增分類" />
                    <AddIcon />
                  </ListItemButton>
                </ListItem>
              </>
            )
            : (
              <>
                <Skeleton animation="wave" variant="ListItem" />
                <Skeleton animation="wave" variant="ListItem" />
                <Skeleton animation="wave" variant="ListItem" />
              </>
            )
        }
      </List>
    </div>
  );
}
