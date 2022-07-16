import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProjectsDashboard from './components/ProjectsDashboard/ProjectsDashboard';
import Register from './components/Register/Register';


class App extends Component {

  render() {

    const routing = (
      <Switch>
        <Route path="/account/login" exact component={Register} />
        <Route path="/account/register" exact component={Register} />
        <Route path="/dashboard" component={ProjectsDashboard} />
        <Redirect from="/" to="/account/login" />
      </Switch>
    );

    return (
      <BrowserRouter>
        <Layout>
          {routing}
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
