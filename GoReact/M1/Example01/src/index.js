import React, { Component, Fragment } from 'react';
import { render } from 'react-dom'

class Button extends Component {
  render() { //component render function
    return (
      <a href=""
        onClick={this.props.onClick}>{this.props.title}
      </a>
    )
  }
}
class App extends Component { //main app component
  handleClick() {
    alert('Botão Clicado')
  }
  render() { //component render function
    return (
      <Fragment>
        <h1>Hello Rocketseat</h1>
        <Button title="Meu botãozinho" onClick={this.handleClick} />
    </Fragment>
    )
  }
}

render( //imported render function
  <App />,
  document.querySelector('#app')
)
