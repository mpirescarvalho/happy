import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import Login from './pages/Dashboard/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DeleteOrphanage from './pages/Dashboard/DeleteOrphanage';
import EditOrphanage from './pages/Dashboard/EditOrphanage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/app" component={OrphanagesMap} />

      <Route path="/orphanages/create" component={CreateOrphanage} />
      <Route path="/orphanages/:id" component={Orphanage} />

      <Route path="/dashboard/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute
        exact
        path="/dashboard/orphanages/:id"
        component={EditOrphanage}
      />
      <PrivateRoute
        path="/dashboard/orphanages/:id/delete"
        component={DeleteOrphanage}
      />
    </Switch>
  </BrowserRouter>
);

export default Routes;
