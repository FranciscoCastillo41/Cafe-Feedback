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
import { useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message)
        return;
      }
     
      if(res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch(error){
      setPublishError('Something went wrong');
    }
  }
  return (
    <Container className="min-vh-100 pt-5 mb-5">
      <h1 className="text-center mb-4 display-4 nav-font">Create post</h1>
      <Form className="nav-font" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="postTitle">
            <Form.Label className="text-center">Title</Form.Label>
            <Form.Control
              placeholder="Title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="postCategory">
            <Form.Label>Category</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e) => setFormData({...formData, category: e.target.value})}>
              <option value="category">Uncategorized</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <div className="border p-3 mb-3" style={{ borderColor: "#0072bc" }}>
          <Form.Group controlId="formFile">
            <Form.Label>File upload</Form.Label>
            <div className="d-flex">
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button onClick={handleUploadImage} className="ms-2" style={{ background: "#0072bc" }}>
                Upload
              </Button>
            </div>
          </Form.Group>
        </div>
        {imageUploadError && <Alert variant="danger">{imageUploadError}</Alert>}
        {formData.image && (
          <Image src={formData.image} className="w-100 h-72 object-cover mb-3" />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mt-3"
          required
          onChange={
            (value)=> {
              setFormData({...formData, content: value});
            }
          }
        />
        <Button
          type="submit"
          className=" w-100"
          style={{ background: "#0072bc", marginTop: "4.5rem" }}
        >
          Publish
        </Button>
        {
          publishError && <Alert variant="danger" className="mt-2">{publishError}</Alert>
        }
      </Form>
    </Container>
  );
}
