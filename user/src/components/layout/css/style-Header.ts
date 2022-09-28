import styled from "styled-components";

export const HeaderContainer = styled.header`
  width: 100%;
  padding: 1rem 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgb(0 0 0 / 20%) 0px 0px 4px 0px;
`;

export const Logo = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  img {
    object-fit: cover;
    width: 10rem;
  }
`;

export const NavMenu = styled.nav`
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;

  ul {
    display: flex;
  }

  li {
    margin-left: 1.5rem;
    cursor: pointer;
    &:hover {
      color: #000;
    }
    .active {
      padding-bottom: 5px;
      border-bottom: 2px solid rgb(224, 68, 39);
    }
  }
`;
