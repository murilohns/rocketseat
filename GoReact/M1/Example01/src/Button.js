import React from 'react';
import propTypes from 'prop-types';

const Button = (props) => {
  const { onClick, children } = props;
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
};

Button.defaultProps = {
  children: 'Salvar',
};

Button.propTypes = {
  onClick: propTypes.func.isRequired, // Declara a propriedade onClick do elemento como obrigatório.
  children: propTypes.string, // o Children do elemento button deve ser uma string.
};

export default Button;
