import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Button extends Component {

  static defaultProps = {
    children: 'Salvar',
  };

  static propTypes = {
    onClick: propTypes.func.isRequired, // Declara a propriedade onClick do elemento como obrigatório.
    children: propTypes.string, // o Children do elemento button deve ser uma string.
  }

  render() { //component render function
    return (
      <button onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}
