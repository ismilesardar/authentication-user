import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getToken, getUser, removeSession } from "../helper/SessionHelper";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  // console.log(user)

  return (
    <Navbar className="fixed-top px-0 shadow-sm">
      <Container>
        <Navbar.Brand to="/" className="fs-4">
          {" "}
          User App{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="fs-5 text-white">
              Home
            </Link>
          </Nav>
          <Nav>
            {token ? null : (
              <>
                <Button variant="outline-primary" className="m-1">
                  Login
                </Button>
                <Button variant="outline-success" className="m-1">
                  Registration
                </Button>
              </>
            )}

            <NavDropdown
              title={user["role"] === 1 ? "Admin Dashboard" : "User Dashboard"}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() =>
                  navigate(
                    user["role"] === 1 ? "/dashboard/admin" : "/dashboard/user"
                  )
                }
              >
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => removeSession()}>
                Log Out
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
