import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;

  [class$='-container'] {
    border-radius: 0.5rem;
    border: 1px solid var(--slate-400);
    color: var(--slate-600);

    [class$='-menu'],
    [class$='-menuList'] {
      background-color: white !important;
    }

    [class$='-control'] {
      background-color: unset;
      min-height: 36px;
    }

    [class$='-singleValue'] {
      color: var(--slate-600);
      font-size: 0.875rem;
    }

    [class$='-placeholder'] {
      color: var(--slate-400);
      font-size: 0.875rem;
    }

    [class$='-ValueContainer'],
    [class$='-Input'] {
      padding: 0;
    }

    [class$='-indicatorContainer'] {
      justify-content: center;
      align-items: center;
      align-self: center;
      color: var(--slate-600);
      width: 30px;
    }
    [class$='-indicatorSeparator'] {
      padding: 0;
      align-self: center;
      height: 20px;
      margin: 0;
      box-sizing: border-box;
    }
  }
`;

export const SelectContent = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  #content {
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
  #delete-icon {
    position: absolute;
    margin-right: 3rem;
    &:hover {
      color: var(--text-danger);
    }
  }
  .select {
    width: 100%;
  }
`;
