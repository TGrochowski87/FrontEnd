import React from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useHistory } from "react-router";

import { Link } from "react-router-dom";

import icon from "../../assets/icon.png";

const NavigationBar = ({ userName, setUserName }) => {
  const history = useHistory();

  const logoutHandler = async () => {
    setUserName("");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("userToken");
    history.push("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={icon} width="40px" height="40px" alt="Home" />
        <h2 className="m-0">Home Budget Planner</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {userName ? (
            <>
              <NavDropdown alignRight title="Expenses">
                <NavDropdown.Item as={Link} to="/expenses">
                  Your expenses
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/planning/expense">
                  Plan expenses
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown alignRight title="Incomes">
                <NavDropdown.Item as={Link} to="/incomes">
                  Your incomes
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/planning/income">
                  Plan incomes
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to="/analysis">
                Analysis
              </Nav.Link>
              <NavDropdown alignRight title={userName}>
                <NavDropdown.Item as={Link} to="/" onClick={logoutHandler}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              Sign in
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
