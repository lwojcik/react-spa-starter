import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

export const Value = styled.output`
  min-width: 3ch;
  font-size: 1.5rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
`;
