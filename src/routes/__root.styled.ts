import { Link } from '@tanstack/react-router';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.xl}`};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Title = styled.span`
  font-weight: 600;
`;

export const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.muted};
  text-decoration: none;

  &[data-status='active'] {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
  }
`;

export const Main = styled.main`
  max-width: 48rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xxl};
`;
