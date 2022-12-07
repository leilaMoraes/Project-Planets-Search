import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import Button from '../inputs/Button';
import Radio from '../inputs/Radio';
import Select from '../inputs/Select';

const comparison = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { filterColumn, filterComparison, filterValue,
    handleChange, handleClick, show, filter, btn,
    handleClickRemoveAll, filterHeadColumn, column,
    handleEachClick, order, handleClickOrder } = useContext(PlanetsContext);
  return (
    <div>
      <Select
        id="column"
        selectLabel="Coluna"
        dataName="column-filter"
        value={ filterColumn }
        handleChange={ handleChange }
        option={
          filterHeadColumn.map((e, index) => (
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
        disabled={ btn }
        handleClick={ handleClick }
        btnName="FILTRAR"
      />
      <Select
        id="sortC"
        selectLabel="Ordenar"
        dataName="column-sort"
        value={ order.column }
        handleChange={ handleChange }
        option={
          column.map((e, index) => (
            <option key={ index }>{ e }</option>
          ))
        }
      />
      <Radio
        id="asc"
        radioLabel="Ascendente"
        value="ASC"
        dataName="column-sort-input-asc"
        checked={ order.sort === 'ASC' }
        onChange={ handleChange }
      />
      <Radio
        id="desc"
        radioLabel="Descendente"
        value="DESC"
        dataName="column-sort-input-desc"
        checked={ order.sort === 'DESC' }
        onChange={ handleChange }
      />
      <Button
        dataName="column-sort-button"
        id="btnOrder"
        handleClick={ handleClickOrder }
        btnName="ORDENAR"
      />
      <Button
        dataName="button-remove-filters"
        id="btnRemoveAll"
        handleClick={ handleClickRemoveAll }
        btnName="REMOVER FILTROS"
      />
      {show
      && (filter.map((phrase, i) => (
        <p key={ i } data-testid="filter">
          {phrase}
          {' '}
          <Button
            id={ phrase }
            handleClick={ handleEachClick }
            btnName="APAGAR"
          />
        </p>
      )))}
    </div>
  );
}

export default Filters;
