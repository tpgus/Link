import styled from "styled-components";

export const AuthContainer = styled.div`
  width: 25%;
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  margin-top: 4rem;
  text-align: center;
  img {
    width: 10rem;
  }
`;
