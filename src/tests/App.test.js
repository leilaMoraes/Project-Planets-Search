import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import data from './mocks/ApiMock';

describe('Teste do App', () => {

  beforeEach(() => 
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ),
    global.fetch = jest.fn(async () => ({
      json: async () => data}))
  );

  it('01 - Testa se os inputs estão sendo renderizados na tela', () => {

    const inputName = screen.getByTestId('name-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');

    expect(inputName).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
  });

  it('02 - Testa se os botões estão sendo renderizados na tela', () => {

    const filterBtn = screen.getByTestId('button-filter');

    expect(filterBtn).toBeInTheDocument();
    expect(filterBtn).toHaveTextContent(/filtrar/i);
  });

  it('03 - Testa se `Loading...` é renderizado na tela', () => {

    const loading = screen.getByText(/loading.../i);

    expect(loading).toBeInTheDocument();
  });

  it('04 - Testa se a API é chamada', () => {

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  });

  it('05 - Testa se a tabela é renderizada na tela', () => {

    const table = screen.findAllByRole('row');
    const planetName = screen.findAllByTestId('planet-name');

    waitFor(() => expect(table).toHaveLength(11));
    waitFor(() => expect(planetName).toHaveLength(10));
  });

  it('06 - Testa se o filtro de nome funciona', () => {

    const inputName = screen.getByTestId('name-filter');
    const planetName = screen.findAllByTestId('planet-name');

    waitFor(() => expect(planetName).toHaveLength(10));

    userEvent.type(inputName, 'oo')

    waitFor(() => expect(planetName).toHaveLength(2));
    waitFor(() => expect(/tatooine/i).toBeInTheDocument);
    waitFor(() => expect(/naboo/i).toBeInTheDocument);
  });

  it('07 - Testa a filtragem pelos inputs de número', async() => {

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const planetName = screen.findAllByTestId('planet-name');
    const filterBtn = screen.getByTestId('button-filter');

    await waitFor(() => expect(planetName).toHaveLength(10));

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.type(inputNumber, '20');
    userEvent.click(filterBtn);

    await waitFor(() => expect(planetName).toHaveLength(8));
  });
});
