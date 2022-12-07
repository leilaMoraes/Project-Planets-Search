import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import data from './mocks/ApiMock';

describe('Teste do App', () => {

  beforeEach(() => 
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    ),
    global.fetch = jest.fn( async () => ({
      json: async () => data}))
  );

  it('01 - Testa se os inputs estão sendo renderizados na tela', () => {

    const inputName = screen.getByTestId('name-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const orderColumn = screen.getByTestId('column-sort');
    const orderAsc = screen.getByTestId('column-sort-input-asc');
    const orderDesc = screen.getByTestId('column-sort-input-desc');

    expect(inputName).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(selectColumn).toBeInTheDocument();
    expect(selectComparison).toBeInTheDocument();
    expect(orderColumn).toBeInTheDocument();
    expect(orderAsc).toBeInTheDocument();
    expect(orderDesc).toBeInTheDocument();
  });

  it('02 - Testa se os botões estão sendo renderizados na tela', () => {

    const btns = screen.getAllByRole('button');

    expect(btns).toHaveLength(3);
    expect(btns[0]).toHaveTextContent(/filtrar/i);
    expect(btns[1]).toHaveTextContent(/ordenar/i);
    expect(btns[2]).toHaveTextContent(/remover filtros/i);
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

  it('07 - Testa as mudanças na tela quando o botão filtrar é clicado', () => {

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(selectColumn, 'rotation_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(inputNumber, '20');
      userEvent.click(filterBtn);
    })

    const text = screen.findByText(/rotation_period maior que 20/i);
    const btn = screen.findByRole('btn', {name: /apagar/i});

    waitFor(() => expect(text).toBeInTheDocument());
    waitFor(() => expect(btn).toBeInTheDocument());
  });

  it('08 - Testa a filtragem pelos inputs de número', () => {

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const planetName = screen.findAllByTestId('planet-name');
    const filterBtn = screen.getByTestId('button-filter');

    waitFor(() => expect(planetName).toHaveLength(10));

    act(() => {
      userEvent.selectOptions(selectColumn, 'rotation_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(inputNumber, '20');
      userEvent.click(filterBtn);
    })

    waitFor(() => expect(planetName).toHaveLength(8));

    act(() => {
      userEvent.selectOptions(selectColumn, 'orbital_period');
      userEvent.selectOptions(selectComparison, 'menor que');
      userEvent.type(inputNumber, '400');
      userEvent.click(filterBtn);
    })

    waitFor(() => expect(planetName).toHaveLength(5));

    act(() => {
      userEvent.selectOptions(selectColumn, 'population');
      userEvent.selectOptions(selectComparison, 'igual a');
      userEvent.type(inputNumber, '1000');
      userEvent.click(filterBtn);
    })

    waitFor(() => expect(planetName).toHaveLength(1));
  });

  it('09 - Testa a ordenação da tabela', () => {

    const orderColumn = screen.getByTestId('column-sort');
    const orderAsc = screen.getByTestId('column-sort-input-asc');
    const orderDesc = screen.getByTestId('column-sort-input-desc');
    const orderBtn = screen.getByTestId('column-sort-button')
    const planetName = screen.findAllByTestId('planet-name');

    waitFor(() => expect(planetName[0]).toHaveTextContent(/alderaan/i));

    act(() => {
      userEvent.selectOptions(orderColumn, 'population');
      userEvent.click(orderAsc);
      userEvent.click(orderBtn);
    })

    waitFor(() => expect(orderAsc).toBeChecked());
    waitFor(() => expect(planetName[0]).toHaveTextContent(/yavin iv/i));

    act(() => {
      userEvent.selectOptions(orderColumn, 'diameter');
      userEvent.click(orderDesc);
      userEvent.click(orderBtn);
    })

    waitFor(() => expect(orderDesc).toBeChecked());
    waitFor(() => expect(planetName[0]).toHaveTextContent(/bespin/i));
  });

  it('10 - Testa os botão de apagar todos os filtros', () => {

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');
    const removeBtn = screen.getByTestId('button-remove-filters');

    act(() => {
      userEvent.selectOptions(selectColumn, 'rotation_period');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(inputNumber, '20');
      userEvent.click(filterBtn);
    })

    const text = screen.findByText(/rotation_period maior que 20/i);
    const btn = screen.findByRole('button', {name: /apagar/i});

    waitFor(() => expect(text).toBeInTheDocument());
    waitFor(() => expect(btn).toBeInTheDocument());

    userEvent.click(removeBtn);

    waitFor(() => expect(text).not.toBeInTheDocument());
    waitFor(() => expect(btn).not.toBeInTheDocument());
  });

  it('11 - Testa os botão de apagar um filtro', () => {

    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const inputNumber = screen.getByTestId('value-filter');
    const filterBtn = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(selectColumn, 'population');
      userEvent.selectOptions(selectComparison, 'maior que');
      userEvent.type(inputNumber, '0');
      userEvent.click(filterBtn);
    })

    const text = screen.getByText(/population maior que 0/i);
    const btn = screen.getByRole('button', {name: /apagar/i});

    waitFor(() => expect(text).toBeInTheDocument());
    waitFor(() => expect(btn).toBeInTheDocument());

    userEvent.click(btn);

    waitFor(() => expect(text).not.toBeInTheDocument());
    waitFor(() => expect(btn).not.toBeInTheDocument());
  });
});
