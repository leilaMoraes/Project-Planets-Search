import React from 'react';
import PropTypes from 'prop-types';

function Radio(props) {
  const { id, radioLabel, radioClass, value, dataName, checked, onChange } = props;
  return (
    <label htmlFor={ id }>
      <input
        className={ radioClass }
        name={ id }
        id={ id }
        type="radio"
        value={ value }
        data-testid={ dataName }
        checked={ checked }
        onChange={ onChange }
      />
      {radioLabel}
    </label>
  );
}

Radio.propTypes = {
  radioClass: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  radioLabel: PropTypes.node,
};

Radio.defaultProps = {
  radioClass: '',
  id: '',
  value: '',
  onChange: () => {},
  checked: false,
  radioLabel: null,
};

export default Radio;
