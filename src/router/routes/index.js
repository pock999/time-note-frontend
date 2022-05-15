import Home from '../../views/Home';
import Login from '../../views/Login';
import Page404 from '../../views/Page404';

import NoteList from '../../views/Note/List';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    roles: null,
    exact: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    roles: [],
    exact: true,
  },
  {
    path: '/notes',
    name: 'NoteList',
    component: NoteList,
    roles: ['isUser'],
    exact: true,
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    roles: null,
    exact: true,
  },
  {
    path: '*',
    name: 'Page404',
    component: Page404,
    roles: null,
    exact: false,
  },
];
