/* IMPORT MODULES */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* COMPONENT */
const ProtectedRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={() => (
      user.admin === true
        ? <Component user={user} {...rest} /> : <Redirect to="/" />)
    }
  />
);

export default ProtectedRoute;
