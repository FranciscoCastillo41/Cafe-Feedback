import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
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
      const res = await fetch('/api/user/signout', {
        method: 'POST',
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
    <Navbar
      collapseOnSelect
      expand="lg"
      data-bs-theme="dark"
      bg="dark"
      style={{
        padding: "0.8rem",
        borderBottom: "0.2rem solid #224C98",
      }}
    >
      <Container>
        <Navbar.Brand
          style={{
            color: "white",
            background:
              "linear-gradient(0deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
            padding: "0.6rem",
            borderRadius: "1rem",
          }}
        >
          <Link to="/">Dora's Cafe</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className="nav-link text-light">
              <Link to="/about">About</Link>
            </Nav.Item>
            <Nav.Item className="nav-link text-light">
              <Link to="/signup">Specials</Link>
            </Nav.Item>
            

            {currentUser ? (
              <NavDropdown
                title={
                  <Image
                    src={currentUser.profilePicture}
                    alt="Profile"
                    roundedCircle
                    className="mr-2"
                    style={{ width: "30px", height: "30px" }}
                  />
                }
                id="collapsible-nav-dropdown"
                className="no-arrow-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/dashboard">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignout}>Sign out</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/signin" className="nav-link" style={{
                      background:
                      "linear-gradient(259deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    }}>
                  
                  
                    Sign in
                  
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 bg-dark text-light"
                aria-label="Search"
              />
              <Button
                style={{
                  background:
                    "linear-gradient(259deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                  border: "none",
                }}
              >
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
