import styled from "styled-components";

export const Container = styled.div`
  width: 20%;
  height: 50vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  button {
    font-weight: bold;
    color: #fff;
    background-color: rgb(224, 69, 45);
    height: 2.5rem;
    border-radius: 10px;
    width: 60%;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgb(224, 110, 54);
    }
  }
`;

export const Logo = styled.div`
  margin-top: 2rem;
  text-align: center;
  img {
    width: 10rem;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 60%;
    border-radius: 6px;
    border: 1px solid #9d9d9d;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  p {
    color: red;
    visibility: hidden;
  }
  .active {
    visibility: visible;
  }
`;
