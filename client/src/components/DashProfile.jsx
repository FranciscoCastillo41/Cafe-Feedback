import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { signout } from "../../../api/controllers/user.controller";

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

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
    setImageFileUploading(true);
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
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(error.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
    <Container className="min-vh-100 mt-5 mb-5">
      <h1 className="display-4 text-center nav-font">Profile Settings</h1>
      <p className="lead text-center">Edit, change or update your profile!</p>
      <Image
        src={imageFileUrl || currentUser.profilePicture}
        roundedCircle
        className="mx-auto mt-3"
        onClick={() => filePickerRef.current.click()}
        style={{
          width: "200px",
          height: "200px",
          border: "5px solid #002460",
          cursor: "pointer",
        }}
      />

      <Form onSubmit={handleSubmit} className="w-100 mx-auto mt-5">
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
            id="username"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          type="submit"
          style={{
            width: "100%",
            background: "#0072bc",
            border: "none",
          }}
        >
          Update
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              className="mt-3"
              style={{
                background: "transparent",
                border: "2px solid #0072bc",
                color: "black",
                width: "100%",
                borderRadius: "2px !important",
              }}
            >
              Create a post
            </Button>
          </Link>
        )}
        <div className="d-flex justify-between mt-2 text-center ">
          <span
            onClick={() => setShowModal(true)}
            style={{ cursor: "pointer", color: "darkred" }}
          >
            Delete
          </span>
          <span
            onClick={handleSignout}
            style={{ cursor: "pointer" }}
            className="text-secondary"
          >
            Sign out
          </span>
        </div>
      </Form>
      {updateUserSuccess && (
        <Alert variant="success" className="mt-3 w-100 mx-auto">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert variant="warning" className="mt-3 w-100 mx-auto">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert variant="warning" className="mt-3 w-100 mx-auto">
          {error}
        </Alert>
      )}
      <Modal
        
        show={showModal}
        onClose={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle
              className="text-secondary mx-auto"
              style={{ fontSize: "4rem" }}
            />
          </div>
          <h3 className="mb-5 text-center mt-3">
            Are you sure you want to delete your account?
          </h3>
          <div className="d-flex justify-center gap-4">
            <Button variant="danger" onClick={handleDeleteUser}>
              Yes I'm sure
            </Button>
            <Button onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
