import React from 'react';
import { Switch, Route, Redirect, Router } from 'react-router-dom';

import _ from 'lodash';

import routes from './routes';
import history from '../libs/history';

function ProtectedRoutes(props) {
  const { routes } = props;

  // get localStorage
  const token = localStorage.getItem('token');
  const roles = localStorage.getItem('roles');

  // TODO: token-login
  React.useEffect(() => {
    // 監聽 store裡的auth
    // 當 store裡的auth拿不到，且有localStorage又有token，才敲token-login
  }, []);

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
            render={(props) =>
              route.roles === null ||
              (route.roles.length === 0 && !token) ||
              (route.roles.length > 0 && !!token) ? (
                <route.component {...props} />
              ) : route.roles.length === 0 && token ? (
                <Redirect {...props} to="/" />
              ) : route.roles.length > 0 && !token ? (
                <Redirect {...props} to="/login" />
              ) : (
                <Redirect {...props} to="/404" />
              )
            }
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
