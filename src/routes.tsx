import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignupSignin from './pages/SignupSignin';

function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignupSignin} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;