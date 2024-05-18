import styled from 'styled-components';

export const SelectTriggerContainer = styled.button`
  width: fit-content;
  height: 100%;
  padding: 0.25rem 0;
  background-color: var(--sky-600);

  display: flex;
  align-items: center;

  font-size: 0.875rem;
  color: var(--slate-100);

  border-radius: 0.5rem;
  cursor: pointer;

  transition: all 0.5s ease-in;

  &:hover {
    background-color: var(--sky-500);
  }
`;

export const ContentIcon = styled.div`
  border-left-width: 1px;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
`;
