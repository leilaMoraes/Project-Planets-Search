import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Button from '../inputs/Button';
import Select from '../inputs/Select';

const column = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

const comparison = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { filterColumn, filterComparison, filterValue,
    handleChange } = useContext(PlanetsContext);
  return (
    <div>
      <Select
        id="column"
        selectLabel="Coluna"
        dataName="column-filter"
        value={ filterColumn }
        handleChange={ handleChange }
        option={
          column.map((e, index) => (
            <option key={ index }>{ e }</option>
          ))
        }
      />
      <Select
        id="comparison"
        selectLabel="Operador"
        dataName="comparison-filter"
        value={ filterComparison }
        handleChange={ handleChange }
        option={
          comparison.map((e, index) => (
            <option key={ index }>{ e }</option>
          ))
        }
      />
      <label htmlFor="value">
        <input
          type="number"
          name="value"
          id="value"
          data-testid="value-filter"
          value={ filterValue }
          onChange={ handleChange }
        />
      </label>
      <Button
        dataName="button-filter"
        id="btnFilter"
        btnName="FILTRAR"
      />
    </div>
  );
}

export default Filters;
