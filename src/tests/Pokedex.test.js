import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemonList from '../data';
import renderWithRouter from './renderWithRouter';

describe('Componente Pokedex', () => {
  const typesPokemon = [...new Set(pokemonList
    .reduce((types, { type }) => [...types, type], []))];

  test('contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
  });

  test('é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
    pokemonList.forEach(({ name }) => {
      screen.getByText(name);
      userEvent.click(buttonNext);
    });
    screen.getByText(pokemonList[0].name);
  });

  test('exibe os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    const buttonsType = buttons.map((button) => button.textContent);
    expect(buttonsType).toEqual(typesPokemon);
  });

  test('ao clicar em um botão de tipo, a Pokédex deve circular somente pelos Pokemons daquele tipo', () => {
    renderWithRouter(<App />);
    typesPokemon.forEach((types) => {
      screen.getByRole('button', { name: 'All' });
      userEvent.click(screen.getByRole('button', { name: types }));
      pokemonList.filter(({ type }) => type === types).forEach(({ name }) => {
        screen.getByText(name);
        userEvent.click(screen.getByRole('button', { name: 'Próximo Pokémon' }));
      });
    });
  });

  test('contém um botão com o texto All e deve resetar o filtro ao ser clicado', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    screen.getByText(/charmander/i);
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    screen.getByText(/pikachu/i);
  });
});
