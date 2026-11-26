import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '@/test/render';

import { Counter } from './Counter';

describe('Counter', () => {
  it('renders the initial count', () => {
    renderWithTheme(<Counter initialCount={5} />);
    expect(screen.getByLabelText('Current count')).toHaveTextContent('5');
  });

  it('increments and decrements by step', async () => {
    const { user } = renderWithTheme(<Counter step={2} />);

    await user.click(screen.getByRole('button', { name: 'Increment' }));
    await user.click(screen.getByRole('button', { name: 'Increment' }));
    expect(screen.getByLabelText('Current count')).toHaveTextContent('4');

    await user.click(screen.getByRole('button', { name: 'Decrement' }));
    expect(screen.getByLabelText('Current count')).toHaveTextContent('2');
  });

  it('resets to the initial count', async () => {
    const { user } = renderWithTheme(<Counter initialCount={3} />);

    await user.click(screen.getByRole('button', { name: 'Increment' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByLabelText('Current count')).toHaveTextContent('3');
  });
});
