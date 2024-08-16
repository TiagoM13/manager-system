import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 40px 30px;
  max-width: 450px;
  background-color: var(--white);

  border-radius: 1.5rem;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.23);

  h2 {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 3rem;
    text-align: center;
  }

  @media (max-width: 1024px) {
    max-width: 600px;
  }

  @media (max-width: 560px) {
    h2 {
      font-size: 1.675rem;
      margin-bottom: 1.5rem;
    }

    label {
      font-size: 0.875rem;
    }

    input {
      padding: 0.75rem 0.875rem;
    }
  }
`;
