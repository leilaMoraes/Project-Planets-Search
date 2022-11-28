import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchApi from '../services/fetchApi';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterName, setFilterName] = useState([]);
  const [filterData, setFilterData] = useState([]);

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

  useEffect(() => {
    const filtering = data.filter((planet) => planet
      .name.toUpperCase().includes(filterName.toUpperCase()));
    setFilterData(filtering);
  }, [filterName]);

  const handleChange = ({ target }) => {
    setFilterName(target.value);
  };

  const values = useMemo(() => ({
    loading, handleChange, filterData,
  }), [loading, filterData]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.shape().isRequired,
});
