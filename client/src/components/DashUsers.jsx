import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try{
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }

    }catch(error){

    }

  };

  return (
    <div className="mt-5">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr className="nav-font">
                <th style={{ color: "#0072bc" }}>Date created</th>
                <th style={{ color: "#0072bc" }}>User image</th>
                <th style={{ color: "#0072bc" }}>Username</th>
                <th style={{ color: "#0072bc" }}>Email</th>
                <th style={{ color: "#0072bc" }}>Admin</th>
                <th style={{ color: "#0072bc" }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="nav-font" key={user._id}>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <Image
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-20 h-auto object-cover"
                      roundedCircle
                    />
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck className="text-green" />
                    ) : (
                      <FaTimes className="text-red" />
                    )}
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      style={{ color: "darkred", cursor: "pointer" }}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showMore && (
            <Button style={{ background: "#0072bc" }} onClick={handleShowMore}>
              {" "}
              show more
            </Button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} centered>
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
    </div>
  );
}
