import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const { btnClass, dataName, id, handleClick, btnName } = props;
  return (
    <button
      className={ `btn-${btnClass}` }
      type="button"
      data-testid={ dataName }
      id={ id }
      onClick={ handleClick }
    >
      {btnName}
    </button>
  );
}

Button.propTypes = {
  btnClass: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  id: PropTypes.string,
  handleClick: PropTypes.func,
  btnName: PropTypes.node,
};

Button.defaultProps = {
  btnClass: '',
  id: '',
  handleClick: () => {},
  btnName: null,
};

export default Button;
