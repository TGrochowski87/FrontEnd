import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import icon from "../assets/icon.png";

const NavigationBar = ({ userName, setUserName }) => {
  const history = useHistory();

  const logoutHandler = async () => {
    setUserName("");
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <Navbar expand="lg">
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
                <Nav.Link href="/expenses">Expenses</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/categories">Categories</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <NavDropdown title={userName} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    My account
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Budget analysis
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Manage budget
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/" onClick={logoutHandler}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Item>
            </>
          ) : (
            <Nav.Link href="/login">Sign in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
