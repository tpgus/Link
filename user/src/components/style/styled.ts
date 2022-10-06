import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ButtonProps {
  btnHeight?: string;
}

export const Button = styled.button<ButtonProps>`
  display: inline-block;
  width: 100%;
  height: ${(props) => props.btnHeight && props.btnHeight};
  font-weight: bold;
  color: #fff;
  background-color: rgb(224, 69, 45);
  border: none;
  cursor: pointer;
`;
