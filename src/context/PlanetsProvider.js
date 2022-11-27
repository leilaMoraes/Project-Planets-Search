import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchApi from '../services/fetchApi';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const useFetch = await fetchApi();
      setData(useFetch);
      setLoading(false);
    };
    getData();
  }, []);

  const values = useMemo(() => ({
    data, loading,
  }), [data, loading]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.shape().isRequired,
});
