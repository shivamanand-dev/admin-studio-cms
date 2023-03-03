import styled from "styled-components";

export const StyledNavbarData = styled.section`
  .navbar {
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  .navbar p {
    color: #fff;
    text-decoration: none;
  }
  .navbar-brand {
    input {
      width: 180px;
    }
  }
  .navbar-menu {
    display: flex;
  }
  .navbar-menu-item {
    input {
      width: 75px;
      background: none;
      color: #fff;
      margin: 0 10px;
      padding: 5px 10px;
      border-radius: 5px;
      border: none;
      border-bottom: 1px solid #aaa;
      text-align: center;
    }
    transition: all 0.2s ease-in-out;
  }

  .navbar-menu-plus {
    display: flex;
    align-items: center;
  }
  .navbar-menu-plus button {
    margin-left: 10px;
  }
  .navbar-menu-item button,
  .navbar-brand button {
    border: none;
    background-color: #000;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    /* margin-left: 5px; */
  }
  .navbar-menu-item button:focus {
    outline: none;
  }
  .navbar-menu-item button:hover {
    color: #f8f8f8;
  }
`;
