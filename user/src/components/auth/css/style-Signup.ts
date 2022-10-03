import styled from "styled-components";

export const SignupWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  /* margin-top: 3rem; */

  input {
    width: 100%;
    border: 1px solid #9d9d9d;
    padding: 0.5rem;
  }

  label {
    width: 100%;
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

export const IdWrapper = styled.div`
  width: 100%;
  .email-form {
    display: flex;
  }

  button {
    width: 30%;
    cursor: pointer;
  }

  p {
    color: #60c0fd;
    font-size: 0.8rem;
    /* visibility: hidden; */
    /* display: none; */
  }
`;

export const PasswordWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
