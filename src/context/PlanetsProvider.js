import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchApi from '../services/fetchApi';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');

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
      const filtering = data.filter((planet) => Number(planet[filterColumn])
      > Number(filterValue));
      setFilterData(filtering);
    } if (filterComparison === 'menor que') {
      const filtering = data.filter((planet) => Number(planet[filterColumn])
      < Number(filterValue));
      setFilterData(filtering);
    } if (filterComparison === 'igual a') {
      const filtering = data.filter((planet) => Number(planet[filterColumn])
      === Number(filterValue));
      setFilterData(filtering);
    }
  };

  const handleChange = ({ target }) => {
    switch (target.id) {
    case 'search':
      return setFilterName(target.value);
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

  useEffect(() => {
    if (filterName.length > 0) {
      const filtering = data.filter((planet) => planet
        .name.toUpperCase().includes(filterName.toUpperCase()));
      setFilterData(filtering);
    } else {
      setFilterData(data);
    }
  }, [filterName]);

  const values = useMemo(() => ({
    loading,
    handleChange,
    filterData,
    filterColumn,
    filterComparison,
    filterValue,
    handleClick,
  }), [loading, filterData, filterColumn, filterComparison, filterValue]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.shape().isRequired,
});
