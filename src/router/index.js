import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  Router,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useQuery } from '../hooks';

import Swal from 'sweetalert2';
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
  const query = useQuery();
  const { routes } = props;

  const user = useSelector((state) => state.auth.user);

  const refreshToken = async () => {
    try {
      const { data } = await ApiService.get({
        url: 'auth/profile',
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

        Swal.fire({
          icon: 'error',
          title: 'token 過期',
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        history.push('/login');
      } else {
        await Swal.fire({
          icon: 'error',
          title: e.response.message,
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        return null;
      }
    }
  };

  // get localStorage
  const roles = getRoles();

  // TODO: token-login
  React.useEffect(() => {
    window.scrollTo(0, 0);
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
                <Redirect {...props} to="/" />
              ) : route.roles.length > 0 && !getToken() ? (
                <Redirect {...props} to="/login" />
              ) : (
                <Redirect {...props} to="/404" />
              );
            }}
          />
        ))}
    </Switch>
  );
}

export default function PathRouter() {
  return (
    <Router history={history}>
      <ProtectedRoutes routes={routes} />
    </Router>
  );
}
