import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
};
const { id, name, type, averageWeight, image } = pokemon;

describe('Componente Pokemon', () => {
  test('renderiza um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name').textContent).toBe(name);
    expect(screen.getByTestId('pokemon-type').textContent).toBe(type);
    expect(screen.getByTestId('pokemon-weight').textContent).toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`).src).toBe(image);
  });

  test('renderiza um card com um link de navegação para exibir detalhes desse pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /more details/i }).href).toContain(`/pokemon/${id}`);
  });

  test('ao clicar no link de navegação do Pokemon é feito o redirecionamento para a página de detalhes que contém a URL com o endpoint /pokemon/id', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);
    screen.getByText(`${name} Details`);
  });

  test('existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText(`${name} is marked as favorite`).src).toBe('http://localhost/star-icon.svg');
  });
});
