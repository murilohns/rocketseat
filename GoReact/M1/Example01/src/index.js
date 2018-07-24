import React, { Component, Fragment } from 'react';
import { render } from 'react-dom'

import Button from './Button';

import './style.css';

class App extends Component { //main app component
  state = { // cria um estado para a aplicação
    counter: 0,
  };

  handleClick = () => { // declara a função handleClick para App
    this.setState({ counter: this.state.counter + 1 }); // sobrepõe o valor de state.counter
  }

  render() { //component render function
    return (
      <Fragment>
        <h1>Hello Rocketseat</h1>
        <h2>{this.state.counter}</h2>
        <Button onClick={this.handleClick}>Somar</Button> {/* Cria um componente Button com o texto somar */}
      </Fragment>
    )
  }
}

render( //imported render function
  <App />,
  document.querySelector('#app')
)
