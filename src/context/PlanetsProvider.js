import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchApi from '../services/fetchApi';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [column, setColumn] = useState(['orbital_period', 'population', 'diameter',
    'rotation_period', 'surface_water']);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const useFetch = await fetchApi();
      setData(useFetch);
      setFilterData(useFetch);
      setLoading(false);
    };
    getData();
  }, []);

  const handleClick = () => {
    if (filterComparison === 'maior que') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      > Number(filterValue));
      setFilterData(filtering);
    } if (filterComparison === 'menor que') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      < Number(filterValue));
      console.log(filterColumn);
      setFilterData(filtering);
    } if (filterComparison === 'igual a') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      === Number(filterValue));
      setFilterData(filtering);
    }
    setColumn(column.filter((string) => string !== filterColumn));
  };

  const onChance = (filterName) => {
    if (filterName.length > 0) {
      return setFilterData(filterData.filter((planet) => planet
        .name.toUpperCase().includes(filterName.toUpperCase())));
    }
    return setFilterData(data);
  };

  const handleChange = ({ target }) => {
    switch (target.id) {
    case 'search':
      return onChance(target.value);
    case 'column':
      return setFilterColumn(target.value);
    case 'comparison':
      return setFilterComparison(target.value);
    case 'value':
      return setFilterValue(target.value);
    default:
      setFilterData(data);
    }
  };

  const values = ({
    loading,
    handleChange,
    filterData,
    filterColumn,
    filterComparison,
    filterValue,
    handleClick,
    column,
  });

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.shape().isRequired,
});
