import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const tableHead = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate',
  'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created',
  'Edited', 'URL'];

function Table() {
  const { filterData, loading } = useContext(PlanetsContext);
  return (
    <div>
      {loading
        ? <h1>Loading...</h1>
        : (
          <table>
            <thead>
              <tr>
                { tableHead.map((head, i) => (
                  <th key={ i }>
                    { head }
                  </th>)) }
              </tr>
            </thead>
            <tbody>
              {filterData.length > 0 && filterData.map((planets) => (
                <tr key={ planets.name }>
                  <td data-testid="planet-name">{planets.name}</td>
                  <td>{planets.rotation_period}</td>
                  <td>{planets.orbital_period}</td>
                  <td>{planets.diameter}</td>
                  <td>{planets.climate}</td>
                  <td>{planets.gravity}</td>
                  <td>{planets.terrain}</td>
                  <td>{planets.surface_water}</td>
                  <td>{planets.population}</td>
                  <td>
                    {planets.films.map((film, i) => <p key={ i }>{film}</p>)}
                  </td>
                  <td>{planets.created}</td>
                  <td>{planets.edited}</td>
                  <td>{planets.url}</td>
                </tr>))}
            </tbody>
          </table>)}
    </div>
  );
}

export default Table;
