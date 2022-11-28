import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Header() {
  const { handleChange } = useContext(PlanetsContext);
  return (
    <label htmlFor="search">
      <input
        type="text"
        name="search"
        id="search"
        data-testid="name-filter"
        onChange={ handleChange }
      />
    </label>
  );
}

export default Header;
