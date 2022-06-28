import React from 'react';

import Home from '../../views/Home';
import Login from '../../views/Login';
import Profile from '../../views/Profile';
import NoteList from '../../views/Note/List';
import Page404 from '../../views/Page404';

export default [
  {
    path: '/',
    name: 'Home',
    component: React.lazy(() => import('../../views/Home')),
    // component: Home,
    roles: [],
    exact: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('../../views/Login')),
    // component: Login,
    roles: [],
    exact: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: React.lazy(() => import('../../views/Profile')),
    // component: Profile,
    roles: ['isUser'],
    exact: true,
  },
  {
    path: '/notes',
    name: 'NoteList',
    component: React.lazy(() => import('../../views/Note/List')),
    // component: NoteList,
    roles: ['isUser'],
    exact: true,
  },
  {
    path: '/404',
    name: 'Page404',
    component: React.lazy(() => import('../../views/Page404')),
    // component: Page404,
    roles: null,
    exact: true,
  },
  {
    path: '*',
    name: 'Page404',
    component: React.lazy(() => import('../../views/Page404')),
    // component: Page404,
    roles: null,
    exact: false,
  },
];
