import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router";

const NavigationBar = ({ nickName, setNickName }) => {
  const history = useHistory();

  const logoutHandler = async () => {
    setNickName("");
    history.push("/");
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/">BUDGET</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {nickName !== "" ? (
              <NavDropdown title={nickName} id="collasible-nav-dropdown">
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
            ) : (
              <Nav.Link href="/login">Sign in</Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
