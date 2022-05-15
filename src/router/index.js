import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

import _ from 'lodash';

import routes from './routes';

export function ProtectedRoute(props) {
  const { component: Component, roles: routeRoles, ...rest } = props;

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
  if (
    routeRoles === null ||
    (routeRoles.length === 0 && !token) ||
    (routeRoles.length > 0 && !!token)
  ) {
    console.log('path => ', rest.path);
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  }

  if (routeRoles.length === 0 && token) {
    return (
      <Route {...rest} render={(props) => <Redirect {...props} to="/" />} />
    );
  }

  if (routeRoles.length > 0 && !token) {
    return (
      <Route
        {...rest}
        render={(props) => <Redirect {...props} to="/login" />}
      />
    );
  }

  return (
    <Route {...rest} render={(props) => <Redirect {...props} to="/404" />} />
  );
}

export default function Router() {
  return (
    <Switch>
      {routes.map((route) => (
        <ProtectedRoute key={route.path} exact={route.exact} {...route} />
      ))}
    </Switch>
  );
}
