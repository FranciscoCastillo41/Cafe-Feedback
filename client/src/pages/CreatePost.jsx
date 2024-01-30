import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {

  return (
    <section style={{ background: "#2c353d" }}  
    data-bs-theme="dark" className="text-light">
    <Container className="min-vh-100 pt-5">
      <h1 className="text-center mb-4 display-4">Create post</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="postTitle">
            <Form.Label className="text-center">Title</Form.Label>
            <Form.Control placeholder="Title"></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="postCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option value="category">Uncategorized</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <div className="border border-info p-3">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>File upload</Form.Label>
            <Form.Control type="file" accept="image/*" />
            <Button>Upload Image</Button>
          </Form.Group>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mt-4 text-light"/>
        <Button type="submit" className="mt-5 w-100">Publish</Button>
      </Form>
    </Container>
    </section>
  );
}
