import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const Card = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--slate-400);

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  line-height: 1.25rem;

  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    strong,
    span {
      font-size: 0.75rem;
      line-height: 1rem;
    }
  }
`;
