import React from 'react';

export default [
  {
    path: '/',
    name: 'Home',
    component: React.lazy(() => import('../../views/Home')),
    roles: null,
    exact: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('../../views/Login')),
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
    roles: ['isUser'],
    exact: true,
    defaultQuery: '?pageMode=list&page=1&pageSize=10',
  },
  {
    path: '/404',
    name: 'Page404',
    component: React.lazy(() => import('../../views/Page404')),
    roles: null,
    exact: true,
  },
  {
    path: '*',
    name: 'Page404',
    component: React.lazy(() => import('../../views/Page404')),
    roles: null,
    exact: false,
  },
];
