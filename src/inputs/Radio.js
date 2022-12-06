import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { id, radioLabel, radioClass, value, dataName, onClick } = props;
  return (
    <label htmlFor={ id }>
      <input
        className={ radioClass }
        name={ id }
        id={ id }
        type="radio"
        value={ value }
        data-testid={ dataName }
        onClick={ onClick }
      />
      {radioLabel}
    </label>
  );
}

Radio.propTypes = {
  radioClass: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  id: PropTypes.string,
  onClick: PropTypes.func,
  radioLabel: PropTypes.node,
  value: PropTypes.string,
};

Radio.defaultProps = {
  radioClass: '',
  id: '',
  value: '',
  onClick: () => {},
  radioLabel: null,
};

export default Radio;
