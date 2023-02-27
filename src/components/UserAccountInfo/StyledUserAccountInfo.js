import styled from "styled-components";

export const StyledUserAccountInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: ${({ theme }) => theme.boxShadow.dark};
`;
