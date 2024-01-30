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
    <footer className="footer-32892 pb-0 bg-dark text-light">
      <div className="site-section">
        <Container className="p-5">
          <Row>
            <Col md className="pr-md-5 mb-4 mb-md-0">
              <h1 className="mb-3" style={{ fontSize: "1.5rem" }}>
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
                  <a href="#" className="d-flex align-items-center">
                    <BsPhoneFill className="mr-3" /> +1 291 3912 329
                  </a>
                </li>
                <li>
                  <a href="#" className="d-flex align-items-center">
                    <BsEnvelopeFill className="mr-3" /> info@gmail.com
                  </a>
                </li>
              </ul>
            </Col>
            <Col md className="mb-4 mb-md-0">
              <h1 className="mb-3" style={{ fontSize: "1.5rem" }}>
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
              <h1 className="mb-3" style={{ fontSize: "1.5rem" }}>
                University Location
              </h1>
              <div className="row gallery">
                <div className="col-6">
                  <Image src={Food1} fluid />
                  <Image src={Food2} fluid />
                </div>
                <div className="col-6">
                  <Image src={Food3} fluid />
                  <Image src={Food4} fluid />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="py-5 footer-menu-wrap d-md-flex align-items-center">
                <ul className="list-unstyled footer-menu d-flex flex-wrap mr-auto">
                  <li className="mr-3">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mr-3">
                    <a href="#">About</a>
                  </li>
                  <li className="mr-3">
                    <a href="#">Our works</a>
                  </li>
                  <li className="mr-3">
                    <a href="#">Services</a>
                  </li>
                  <li className="mr-3">
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Contacts</a>
                  </li>
                </ul>
                <div className="site-logo-wrap ml-auto">
                  <Link
                    to="/"
                    className="navbar-brand text-light"
                    style={{
                      fontSize: "2rem",
                      color: "white",
                      background:
                        "linear-gradient(0deg, rgba(34,76,152,1) 0%, rgba(45,206,253,1) 100%)",
                      padding: "0.6rem",
                      borderRadius: "1rem",
                    }}
                  >
                    Dora's Cafe
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
}
