import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  margin-top: 0.25rem;

  @media (max-width: 460px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }
`;

export const BreadcrumbContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  a {
    display: flex;
    gap: 8px;
    line-height: 1.25;
    color: var(--slate-600);
    transition: all 0.5s ease-in-out;
    border-radius: 10px;
    padding: 1px 6px;

    &:hover {
      background-color: var(--slate-200);
      color: var(--sky-600);
    }
  }
`;
