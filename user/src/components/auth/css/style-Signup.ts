import styled from "styled-components";

export const SignupForm = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;

  input {
    width: 100%;
    border: 1px solid #9d9d9d;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  label {
    width: 100%;
    display: inline-block;
    span {
      display: inline-block;
      overflow: hidden;
      width: 4px;
      height: 4px;
      margin-top: 7px;
      border-radius: 50%;
      background-color: red;
      text-indent: -9999px;
      vertical-align: top;
    }
  }
`;
