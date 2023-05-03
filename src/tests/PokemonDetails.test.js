import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};
const { id, name, foundAt } = pokemon;

describe('Componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(`/pokemon/${id}`);
    });
  });

  test('renderiza as informações detalhadas do Pokémon na tela', () => {
    screen.getByText(`${name} Details`);

    expect(screen.queryByRole('link', { name: /more details/i })).not.toBeInTheDocument();

    screen.getByRole('heading', { name: /summary/i, level: 2 });

    screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat/i);
  });

  test('renderiza as informações detalhadas do Pokémon na tela', () => {
    screen.getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    foundAt.forEach(({ location, map }, index) => {
      screen.getByText(location);
      const imagens = screen.getAllByAltText(`${name} location`);
      expect(imagens[index].src).toBe(map);
    });
  });

  test('é possível favoritar um Pokémon', () => {
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(checkbox);
    const altImage = `${name} is marked as favorite`;
    expect(screen.getByAltText(altImage)).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(screen.queryByAltText(altImage)).not.toBeInTheDocument();
  });
});
