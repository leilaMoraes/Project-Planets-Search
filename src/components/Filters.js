import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Button from './Button';
import Select from './Select';

const column = ['population', 'orbital_period', 'diameter', 'rotation_period',
  'surface_water'];

const comparison = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { filterColumn, filterComparison, filterValue } = useContext(PlanetsContext);
  return (
    <div>
      <Select
        id="column"
        selectLabel="Coluna"
        dataName="column-filter"
        value={ filterColumn }
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
          value={ filterValue }
          data-testid="value-filter"
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
