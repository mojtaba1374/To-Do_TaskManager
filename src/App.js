import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import ProjectsDashboard from './components/ProjectsDashboard/ProjectsDashboard';

import axios from 'axios';

import { createStore } from 'redux';
import { Provider } from 'react-redux/es/exports';
import reducer from './store/reducer';
// import { DragDropContext } from 'react-beautiful-dnd';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

  // componentDidMount() {
  //   axios.get('http://localhost:8000/projects/')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     // .catch(err => {
  //     //   console.log(err);
  //     // });
  // }

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <Header />
          <ProjectsDashboard />
        </Layout>
      </Provider>
    );
  }
}

export default App;
