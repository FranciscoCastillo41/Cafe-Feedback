import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";

import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  console.log(imageFileUploadProgress, imageFileUploadError);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    console.log("uploading image...");
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setFile
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <Container className="mx-auto mb-5 mt-5">
      <h1
        className="text-center mb-4 mt-4 text-light"
        style={{ fontSize: "2rem", fontWeight: "700" }}
      >
        Profile
      </h1>
      {imageFileUploadError && (
        <Alert variant="danger">{imageFileUploadError}</Alert>
      )}

      <Card
        className="mx-auto "
        data-bs-theme="dark"
        bg="dark"
        style={{ maxWidth: "400px", border: "none" }}
      >
        <Image
          src={imageFileUrl || currentUser.profilePicture}
          roundedCircle
          className="mx-auto mt-3"
          onClick={() => filePickerRef.current.click()}
          style={{
            width: "150px",
            height: "150px",
            border: "7px solid #224C98",
          }}
        />
        <Card.Body>
          <Form>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={filePickerRef}
              hidden
            />
            <Form.Group className="mb-3">
              <Form.Control
                type="username"
                placeholder="Username"
                defaultValue={currentUser.username}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit" style={{ width: "100%" }}>
              Update
            </Button>
          </Form>
          <div className="flex justify-between mt-2" style={{ color: "red" }}>
            <span>Delete</span>
            <span>Sign out</span>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
