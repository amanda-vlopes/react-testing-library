import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Componente Not Found', () => {
  test('contém um heading com o texto: Page requested no found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole('heading', { name: /Page requested not found/i, level: 2 })).toBeInTheDocument();
  });
  test('contém uma imagem com a src especificada', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img');
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image.src).toContain(srcImage);
  });
});
