import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import './main.css';

import Header from './Header';
import Post from './Post';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Post />
        <Post />
      </Fragment>
    );
  }
}

render(<App />, document.querySelector('[name="app"]'));
