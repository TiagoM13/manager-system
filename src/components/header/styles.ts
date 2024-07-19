import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

export const BreadcrumbContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  a {
    margin-right: 10px;
    line-height: 1.25;
    color: var(--slate-600);

    &:hover {
      color: var(--sky-600);
    }
  }

  span {
    line-height: 1.25;
    color: var(--slate-600);
  }
`;
