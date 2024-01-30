import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ReactQuill from "react-quill";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred.bytesTransferred / snapshot.totalBytes) *
            100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <section
      style={{ background: "#2c353d" }}
      data-bs-theme="dark"
      className="text-light"
    >
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
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button onClick={handleUploadImage}>Upload Image</Button>
            </Form.Group>
          </div>
          {imageUploadError && (
            <Alert>
              {imageUploadError}
            </Alert>
          )}
          {formData.image && (
            <Image src={formData.image} className="w-full h-72 object-cover"/>
          )}
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-72 mt-3 text-light"
          />
          <Button type="submit" className="mt-5 w-100">
            Publish
          </Button>
        </Form>
      </Container>
    </section>
  );
}
