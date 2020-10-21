import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import useAuth from '../contexts/auth';

const PrivateRoute: React.FC<RouteProps> = props => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Route {...props} component={undefined} render={() => <div />} />;
  }

  if (!user) {
    return (
      <Route
        {...props}
        component={undefined}
        render={() => <Redirect to="/dashboard/login" />}
      />
    );
  }

  return <Route {...props} />;
};

export default PrivateRoute;
