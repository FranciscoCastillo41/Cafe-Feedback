import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);
  
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch(error) {
      console.log(error.message)
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try{
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
      {
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
        prev.filter((post) => post._id !== postIdToDelete))
      }
    } catch(error) {

    }
  }
  return (
    <div className="shadow-md rounded-md mt-5 mb-3 p-3">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table responsive>
            <thead>
              <tr className="nav-font">
                <th style={{ color: "#0072bc" }}>Date updated</th>
                <th style={{ color: "#0072bc" }}>Post image</th>
                <th style={{ color: "#0072bc" }}>Post title</th>
                <th style={{ color: "#0072bc" }}>Category</th>
                <th style={{ color: "#0072bc" }}>Delete</th>
                <th style={{ color: "#0072bc" }}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="nav-font">
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/post/${post.slug}`}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-auto"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none text-secondary"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.category}</td>
                  <td>
                    <span onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }} style={{ color: "darkred", cursor:"pointer" }}>Delete</span>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {showMore && <Button style={{background: "#0072bc"}} onClick={handleShowMore}> show more</Button>}
        </>
      ) : (
        <p>You have no posts yet</p>
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
            <Button variant="danger" onClick={handleDeletePost}>
              Yes I'm sure
            </Button>
            <Button onClick={() => setShowModal(false)}>No, cancel</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
