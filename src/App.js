import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import ProjectsDashboard from './components/ProjectsDashboard/ProjectsDashboard';

import { createStore } from 'redux';
import { Provider } from 'react-redux/es/exports';
import reducer from './store/reducer';
// import { DragDropContext } from 'react-beautiful-dnd';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends Component {

  onDragEndHandler = () => {
    console.log('yeap dragend ');
  }

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
