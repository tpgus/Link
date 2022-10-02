import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  width: 100%;
  font-weight: bold;
  margin-top: 1rem;
  color: #fff;
  background-color: rgb(224, 69, 45);
  height: 2.5rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgb(224, 110, 54);
  }
`;
