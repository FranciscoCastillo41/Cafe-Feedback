import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import "./Header.css";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" className="border-bottom shadow sticky-top">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none nav-font nav-brand-style" style={{color: "#002460"}}>
            Dora's Cafe
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className="nav-link">
              <Link className="text-decoration-none text-muted nav-font">About</Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link className="text-decoration-none text-muted nav-font">Specials</Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link className="text-decoration-none text-muted nav-font">About</Link>
            </Nav.Item>
            <NavDropdown title="More info" id="collapsible-nav-dropdown" className="nav-font">
              <NavDropdown.Item href="#action/3.1">Dora's Cafe website</NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Texas Wesleyan Website
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {/* 
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 bg-dark text-light"
                  aria-label="Search"
                />
                <Button>Search</Button>
              </Form>
            */}
            {currentUser ? (
              <NavDropdown
                title={
                  <Image
                    src={currentUser.profilePicture}
                    alt="Profile"
                    roundedCircle
                    className="mr-2"
                    style={{ width: "35px", height: "35px" }}
                  />
                }
                id="collapsible-nav-dropdown"
                className="no-arrow-dropdown nav-font"
              >
                <NavDropdown.Item>
                  <Link
                    to="/dashboard"
                    className="text-decoration-none text-dark"
                  >
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignout}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/signin" className="nav-link">
                  Sign in
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
