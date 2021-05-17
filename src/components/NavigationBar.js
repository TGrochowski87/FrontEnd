import React from "react";

import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useHistory } from "react-router";

import { Link } from "react-router-dom";

import icon from "../assets/icon.png";

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
      <Navbar.Brand href="/">
        <img src={icon} width="50px" alt="Home" />
        <h2>Home Budget Planner</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {userName ? (
            <>
              <Nav.Item>
                <Nav.Link eventKey="1" as={Link} to="/expenses">
                  Expenses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2" as={Link} to="/planning/expense">
                  Plan expenses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="3" as={Link} to="/planning/income">
                  Plan incomes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="4" as={Link} to="/categories">
                  Categories
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown
                  alignRight
                  title={userName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item>My account</NavDropdown.Item>
                  <NavDropdown.Item>Budget analysis</NavDropdown.Item>
                  <NavDropdown.Item>Manage budget</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/" onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
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
