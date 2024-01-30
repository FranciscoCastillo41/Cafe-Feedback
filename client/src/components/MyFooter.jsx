import React from "react";
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Food1 from "../../src/assets/images/food1.jpg";
import Food2 from "../../src/assets/images/food2.jpg";
import Food3 from "../../src/assets/images/food3.jpg";
import Food4 from "../../src/assets/images/food4.jpg";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {
  BsFacebook,
  BsInstagram,
  BsTwitterX,
  BsEnvelopeFill,
  BsPhoneFill,
} from "react-icons/bs";

export default function ComponentFooter() {
  return (
    <footer className="footer-32892 pb-0 bg-dark text-light ">
      <div className="site-section">
        <Container className="p-5">
          <Row>
            <Col md className="pr-md-5 mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                About Us
              </h1>
              <p className="mb-4 text-secondary">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Laboriosam itaque unde facere repellendus, odio et iste
                voluptatum aspernatur ratione mollitia tempora eligendi maxime
                est, blanditiis accusamus. Incidunt, aut, quis!
              </p>
              <ul className="list-unstyled quick-info mb-4">
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none"
                    style={{ color: "#5c8ab9" }}
                  >
                    <BsPhoneFill className="mr-3 text-secondary" /> +1 291 3912
                    329
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="d-flex align-items-center text-decoration-none"
                    style={{ color: "#5c8ab9" }}
                  >
                    <BsEnvelopeFill className="mr-3 text-secondary" />{" "}
                    info@gmail.com
                  </a>
                </li>
              </ul>
            </Col>
            <Col md className="mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                Social Media
              </h1>
              <ul className="list-unstyled tweets text-secondary">
                <li className="d-flex">
                  <div className="mr-4">
                    <BsInstagram />
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere unde omnis veniam porro excepturi.
                  </div>
                </li>
                <li className="d-flex">
                  <div className="mr-4">
                    <BsFacebook />
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere unde omnis veniam porro excepturi.
                  </div>
                </li>
                <li className="d-flex">
                  <div className="mr-4">
                    <BsTwitterX />
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facere unde omnis veniam porro excepturi.
                  </div>
                </li>
                {/* Add more tweets as needed */}
              </ul>
            </Col>
            <Col md={3} className="mb-4 mb-md-0">
              <h1
                className="mb-3 nav-font"
                style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
              >
                University Location
              </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="py-5 footer-menu-wrap d-md-flex align-items-center">
                <ul className="list-unstyled footer-menu d-flex flex-wrap mr-auto">
                  <li className="mr-3">
                    <Link to="/" className="text-decoration-none text-light">
                      Home
                    </Link>
                  </li>
                  <li className="mr-3 ">
                    <a href="#" className="text-decoration-none text-light">
                      About
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="#" className="text-decoration-none text-light">
                      Our works
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="#" className="text-decoration-none text-light">
                      Services
                    </a>
                  </li>
                  <li className="mr-3">
                    <a href="#" className="text-decoration-none text-light">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none text-light">
                      Contacts
                    </a>
                  </li>
                </ul>
                <div className="site-logo-wrap ml-auto">
                  <h1
                    className="display-3 nav-font"
                    style={{
                      color: "#5c8ab9",
                      fontWeight: "bolder",
                      textTransform: "uppercase",
                    }}
                  >
                    Dora's Cafe
                  </h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
