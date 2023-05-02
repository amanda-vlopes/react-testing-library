import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Componente App', () => {
  test('contém um conjunto fixo de links de navegação com os textos Home, About, Favorite Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('link', { name: 'Home' });
    screen.getByRole('link', { name: 'About' });
    screen.getByRole('link', { name: 'Favorite Pokémon' });
  });

  test('ao clicar no link Home é redirecionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('ao clicar no link About é redirecionado para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('ao clicar no link Favorite é redirecionado para a página de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('ao entrar em uma URL que não existe é redirecionado para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => { history.push('/pagina'); });
    expect(screen.getByRole('heading', { name: /Page requested not found/i })).toBeInTheDocument();
  });
});
