import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Componente About contém as informações sobre a Pokédex', () => {
  test('contém um heading com o texto About Pokédex', () => {
    render(<About />);
    screen.getAllByRole('heading', { name: 'About Pokédex', level: 2 });
  });

  test('contém dois parágrafos com o texto sobre a Pokédex', () => {
    render(<About />);
    const p1 = 'This application simulates a Pokédex a digital encyclopedia containing all Pokémon';
    const p2 = 'One can filter Pokémon by type, and see more details for each one of them';
    screen.findByText(p1);
    screen.findByText(p2);
  });

  test('contém a imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toContain(srcImage);
  });
});
