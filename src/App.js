import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ProjectsDashboard from './components/ProjectsDashboard/ProjectsDashboard';
import Register from './components/Register/Register';
import * as actions from './store/actions/index';

// import axios from 'axios';
import { connect } from 'react-redux';



class App extends Component {

  // componentDidMount() {
  //   this.props.onAutoLogin();
  // }

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

// const mapStateToProps = state => {
//   return {
//     isAuth: state.isAuth
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch(actions.autoLogin())
  };
};

export default connect(null, mapDispatchToProps)(App);
