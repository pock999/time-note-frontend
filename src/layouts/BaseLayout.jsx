import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import dayjs from 'dayjs';
import _ from 'lodash';

// redux store
import {
  Div, Text, Button, Icon, Dropdown, Anchor,
} from 'atomize';
import { logoutAction } from '../store/reducers/auth';
import {
  fetchCategories, fetchCategory, createCategory, updateCategory, deleteCategory,
} from '../store/reducers/category';
import {
  fetchNoteTypes,
} from '../store/reducers/note';

// atomize

// custom utils
import SwalHelper from '../utils/SwalHelper';

// custom components
import {
  AppSidebar, AppBar, DrawerContent, AppTopMenu,
} from './components';

const emptyCategory = {
  name: '',
  color: '#9DA6A4',
};

export default function BaseLayout(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const drawerTypes = useSelector((state) => state.layout.drawerTypes);
  const drawerCategories = useSelector((state) => state.layout.drawerCategories);

  React.useEffect(() => {
    (async () => {
      await dispatch(fetchNoteTypes());
      await dispatch(fetchCategories());
    })();
  }, []);

  return (
    <AppSidebar
      appBar={AppBar}
      topMenu={<AppTopMenu />}
      drawerContent={(
        <DrawerContent
          drawerTypes={drawerTypes}
          drawerCategories={drawerCategories}
          pathname={location.pathname}
          // openForm={openForm}
          // deleteCategory={deleteCategoryItem}
        />
      )}
    >
      <Div
        tag="main"
        flexGrow="1"
        p={{
          b: '.5em',
          l: '.5em',
          r: '.5em',
        }}
        d="flex"
        justify="center"
        align="flex-start"
      >
        {props.children}
      </Div>
    </AppSidebar>
  );
}
