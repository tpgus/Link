import styled from "styled-components";

export const LoginForm = styled.form`
  width: 60%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;

  input {
    appearance: none;
    width: 100%;
    border: 1px solid #9d9d9d;
    padding: 0.5rem;
    margin: 0.5rem;
  }

  p {
    padding-bottom: 0.5rem;
    overflow: hidden;
    width: 100%;
    color: red;
    visibility: hidden;
    &.active {
      visibility: visible;
    }
  }
`;

export const FindInformation = styled.div`
  /* margin-top: 0.5rem; */
  display: flex;
  justify-content: end;
  width: 60%;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.8rem;

  ul {
    display: flex;
  }

  li {
    cursor: pointer;
    position: relative;
    margin: 0 0.5rem;

    &:not(&:last-child)::after {
      display: block;
      position: absolute;
      top: 4px;
      right: -10px;
      width: 1px;
      height: 14px;
      background-color: rgba(0, 0, 0, 0.3);
      content: "";
    }

    &:hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const SignupWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  color: rgba(0, 0, 0, 0.5);
  a {
    text-decoration: underline;
    &:hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export const SocialLogin = styled.div`
  margin-top: 3rem;
  width: 60%;

  span {
    display: flex;
    flex-basis: 100%;
    align-items: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.8rem;
    margin: 10px 0px;

    &::before,
    &::after {
      content: "";
      flex: 1;
      background: rgba(0, 0, 0, 0.5);
      height: 1px;
      margin: 0px 8px;
    }
  }

  button {
    display: block;
    width: 100%;
    background-color: #fee500;
    cursor: pointer;
    border: none;
  }

  img {
    max-width: 100%;
  }
`;
