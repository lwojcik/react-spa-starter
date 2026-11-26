import styled, { css } from 'styled-components';

export interface ButtonProperties {
  $variant?: 'primary' | 'secondary';
}

export const Button = styled.button.attrs({ type: 'button' })<ButtonProperties>`
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.lg}`};
  border-radius: ${({ theme }) => theme.radius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  ${({ theme, $variant = 'secondary' }) =>
    $variant === 'primary'
      ? css`
          background: ${theme.colors.primary};
          border-color: ${theme.colors.primary};
          color: ${theme.colors.primaryText};
        `
      : css`
          background: ${theme.colors.surface};
          color: ${theme.colors.text};
        `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
