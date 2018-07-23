import React, { Component, Fragment } from 'react';
import { render } from 'react-dom'
import propTypes from 'prop-types';

class Button extends Component {

  static defaultProps = {
    children: 'Salvar',
  };

  static propTypes = {
    onClick: propTypes.func.isRequired, // Declara a propriedade onClick do elemento como obrigatório.
    children: propTypes.string, // o Children do elemento button deve ser uma string.
  }
  render() { //component render function
    return (
      <a href=""
        onClick={this.props.onClick}>{this.props.children}
      </a>
    )
  }
}

class App extends Component { //main app component
  handleClick() { // declara a função handleClick para App
    alert('Botão Clicado')
  }
  render() { //component render function
    return (
      <Fragment>
        <h1>Hello Rocketseat</h1>
        <Button onClick={() => { //declara uma nova função onclick nesse botão
          alert('Button ')
        }} />
      <Button onClick={this.handleClick}> Enviar </Button> // usa a função handleClick de App. Enviar representa o children 
    </Fragment>
    )
  }
}

render( //imported render function
  <App />,
  document.querySelector('#app')
)
