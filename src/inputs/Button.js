import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnClass, dataName, id, disabled, handleClick, btnName } = props;
  return (
    <button
      className={ `btn-${btnClass}` }
      type="button"
      data-testid={ dataName }
      id={ id }
      disabled={ disabled }
      onClick={ handleClick }
    >
      {btnName}
    </button>
  );
}

Button.propTypes = {
  btnClass: PropTypes.string,
  dataName: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  btnName: PropTypes.node,
};

Button.defaultProps = {
  btnClass: '',
  dataName: '',
  id: '',
  disabled: false,
  handleClick: () => {},
  btnName: null,
};

export default Button;
