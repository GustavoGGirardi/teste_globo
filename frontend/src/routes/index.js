import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Posts from '../pages/Posts';
import Forgot from '../pages/Forgot';
import SignUp from '../pages/SignUp';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" exact component={SignIn} />
        <Route path="/posts" isPrivate component={Posts} />
        <Route path="/forgot" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
