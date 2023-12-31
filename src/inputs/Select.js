import React from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const { selectClass, dataName, id, handleChange, selectLabel, option, value } = props;
  return (
    <label htmlFor={ id }>
      { selectLabel }
      <select
        className={ selectClass }
        name={ id }
        id={ id }
        value={ value }
        data-testid={ dataName }
        onChange={ handleChange }
      >
        { option }
      </select>
    </label>
  );
}

Select.propTypes = {
  selectClass: PropTypes.string,
  dataName: PropTypes.string.isRequired,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  selectLabel: PropTypes.node,
  option: PropTypes.node.isRequired,
  value: PropTypes.string,
};

Select.defaultProps = {
  selectClass: '',
  id: '',
  value: '',
  handleChange: () => {},
  selectLabel: null,
};

export default Select;
