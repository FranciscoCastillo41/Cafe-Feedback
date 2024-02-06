import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import "./Header.css";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      className="border-bottom shadow sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            className="text-decoration-none nav-font nav-brand-style"
            style={{ color: "#002460" }}
          >
            Dora's Cafe
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className="nav-link">
              <Link to="/" className="text-decoration-none text-muted nav-font">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link
                to="/university"
                className="text-decoration-none text-muted nav-font"
              >
                University
              </Link>
            </Nav.Item>
            <Nav.Item className="nav-link">
              <Link
                to="/about"
                className="text-decoration-none text-muted nav-font"
              >
                About
              </Link>
            </Nav.Item>
            <NavDropdown
              title="More info"
              id="collapsible-nav-dropdown"
              className="nav-font"
            >
              <NavDropdown.Item href="https://txwes.campusdish.com/en/LocationsAndMenus/DoraRobertsDiningHall">
                Dora's Cafe website
              </NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="https://txwes.edu/">
                Texas Wesleyan Website
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Search"
                className="me-2 bg-light"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                style={{ background: "#0072bc", border: "none" }}
              >
                Search
              </Button>
            </Form>

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
