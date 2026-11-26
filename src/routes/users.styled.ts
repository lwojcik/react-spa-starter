import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius};
`;

export const Email = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.danger};
`;
