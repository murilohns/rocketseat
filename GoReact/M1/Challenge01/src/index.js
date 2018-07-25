import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';

import './main.css';

import Header from './Header';

class App extends Component {
  render() {
    return <Header />;
  }
}

render(<App />, document.querySelector('[name="app"]'));
