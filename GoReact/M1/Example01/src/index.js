import React, { Component, Fragment } from 'react';
import { render } from 'react-dom'

class Button extends Component {
  render() { //component render function
    return <a href="">Salvar</a>
  }
}
class App extends Component { //main app component
  render() { //component render function
    return (
      <Fragment>
        <h1>Hello Rocketseat</h1>
        <Button />
    </Fragment>
    )
  }
}

render( //imported render function
  <App />,
  document.querySelector('#app')
)
