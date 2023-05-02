import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente FavoritePokemon', () => {
  test('renderiza a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);
    screen.getByText('No favorite Pokémon found');
  });

  test('são exibidos apenas os Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const favorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favorite);

    const favoritePokemon = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(favoritePokemon);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
