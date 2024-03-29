/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { Suspense } from 'react';
import {
  Switch,
  Route,
  Redirect,
  Router,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { QueryParamProvider } from 'use-query-params';

import _ from 'lodash';

import routes from './routes';
import history from '../libs/history';

import {
  setUser,
  setAuthorization,
  setRoles,
  setCurrentRole,
  clearAuth,
} from '../store/reducers/auth';

import ApiServiceClass from '../services/ApiService';
import JsonHelper from '../utils/JsonHelper';
import SwalHelper from '../utils/SwalHelper';

const ApiService = new ApiServiceClass();

const getToken = () => localStorage.getItem('token');
const getRoles = () => {
  try {
    return JSON.parse(localStorage.getItem('roles'));
  } catch (error) {
    return null;
  }
};
const getCurrentRole = () => localStorage.getItem('currentRole');

function ProtectedRoutes(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { routes } = props;

  const user = useSelector((state) => state.auth.user);

  const refreshToken = async () => {
    try {
      const { data } = await ApiService.get({
        url: '/auth/profile',
      });

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('roles', JsonHelper.JsonSerialize(['IsUser']));
      localStorage.setItem('currentRole', 'IsUser');
      localStorage.setItem('user', JsonHelper.JsonSerialize(data.data.user));

      ApiService.setToken(data.Authorization);

      dispatch(setAuthorization(data.data.token));
      dispatch(setUser(data.data.user));
      dispatch(setRoles(['IsUser']));
      dispatch(setCurrentRole('IsUser'));

      return {
        token: data.data.token,
        roles: ['IsUser'],
      };
    } catch (e) {
      console.log('e.response => ', e.response);

      if (e.response.status === 401) {
        dispatch(clearAuth());
        ApiService.clearToken();
        localStorage.clear();

        SwalHelper.fail('token 過期');

        history.push('/login');
      } else {
        await SwalHelper.fail(e.response.message);
        return null;
      }
    }
  };

  // get localStorage
  const roles = getRoles();

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // 監聽 store裡的auth
    // 當 store裡的auth拿不到，且有localStorage又有token，才敲token-login
    (async () => {
      if (!user && getToken()) {
        console.debug('token-login');
        await refreshToken();
      }
    })();
  }, [location.pathname]);

  // 1. roles: null => 大家都可以
  // 2. roles.length === 0 => only guest
  // 3. roles.length > 0 => need login(isUser)

  return (
    <Suspense fallback={() => <>loading</>}>
      <Switch>
        {routes &&
          routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact || false}
              render={(props) => {
                if (_.has(route, 'defaultQuery') && location.search === '') {
                  history.push(`${route.path}${route.defaultQuery}`);
                }

                return route.roles === null ||
                  (route.roles.length === 0 && !getToken()) ||
                  (route.roles.length > 0 && !!getToken()) ? (
                  <route.component {...props} />
                ) : route.roles.length === 0 && getToken() ? (
                  // <Redirect {...props} to="/notes" />
                  <Redirect {...props} to="/profile" />
                ) : route.roles.length > 0 && !getToken() ? (
                  <Redirect {...props} to="/login" />
                ) : (
                  <Redirect {...props} to="/404" />
                );
              }}
            />
          ))}
      </Switch>
    </Suspense>
  );
}

export default function PathRouter() {
  return (
    <Router history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <ProtectedRoutes routes={routes} />
      </QueryParamProvider>
    </Router>
  );
}
