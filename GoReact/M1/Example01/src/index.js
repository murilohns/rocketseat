import React, { Component, Fragment } from 'react';
import { render } from 'react-dom'

import Button from './Button';

class App extends Component { //main app component
  state = { // cria um estado para a aplicação
    counter: 0,
  };

  // Montagem / atualização
  //static getDerivedStateFromProps(nextProps, prevState) {
  // return { counter: nextProps.initialCounter };
  //}

  // Atualizações
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.counter < 10;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) { //é executado se o shouldComponentUpdate retornar true
     return prevState.counter;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevState, snapshot)
  }

  // Desmontagem
  componentWillUnmount() { // é executado antes de o componenete deixar de existir

  }

  // Error
  componentDidCatch(error, info) {
    console.log('Erro', error);
  }

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
