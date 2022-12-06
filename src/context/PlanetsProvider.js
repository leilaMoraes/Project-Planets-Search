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
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState([]);
  const [column] = useState(['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water']);
  const [filterHeadColumn, setFilterHeadColumn] = useState([]);
  const [btn, setBtn] = useState(false);
  const [prev, setPrev] = useState({});
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    setFilterHeadColumn(column);
    const getData = async () => {
      setLoading(true);
      const useFetch = await fetchApi();
      setData(useFetch);
      setFilterData(useFetch);
      setLoading(false);
    };
    getData();
  }, [column]);

  useEffect(() => {
    setFilterColumn(filterHeadColumn[0]);
  }, [filterHeadColumn]);

  const handleClick = () => {
    if (filterComparison === 'maior que') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      > Number(filterValue));
      setFilterData(filtering);
      setPrev({ one: filterData, two: filtering });
    } if (filterComparison === 'menor que') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      < Number(filterValue));
      setFilterData(filtering);
      setPrev({ one: filterData, two: filtering });
    } if (filterComparison === 'igual a') {
      const filtering = filterData.filter((planet) => Number(planet[filterColumn])
      === Number(filterValue));
      setFilterData(filtering);
      setPrev({ one: filterData, two: filtering });
    } if (filterHeadColumn.length === 1) {
      setBtn(true);
    }
    setFilterHeadColumn(filterHeadColumn.filter((string) => string !== filterColumn));
    setFilter([...filter, `${filterColumn} ${filterComparison} ${filterValue}`]);
    setShow(true);
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
    case 'sortC':
      return setOrder({ column: target.value });
    default:
      setFilterData(data);
    }
  };

  const handleClickRemoveAll = () => {
    setFilterData(data);
    setFilterHeadColumn(column);
    setShow(false);
    setFilter([]);
    setBtn(false);
  };

  const handleEachClick = ({ target: { id } }) => {
    setBtn(false);
    setFilter(filter.filter((element) => element !== id));
    setFilterHeadColumn([...filterHeadColumn, id.split(' ')[0]]);
    const number = 4;
    if (filterHeadColumn.length === number) {
      setFilterData(data);
    } else {
      setFilterData(prev.one);
    }
  };

  const handleClickOrder = () => {
    console.log(order);
  };

  const values = ({
    loading,
    handleChange,
    filterData,
    filterColumn,
    filterComparison,
    filterValue,
    handleClick,
    show,
    filter,
    handleClickRemoveAll,
    filterHeadColumn,
    handleEachClick,
    btn,
    column,
    order,
    handleClickOrder,
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
