import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";
import {
  HiArrowNarrowUp,
  HiOutlineUserGroup,
  HiAnnotation,
  HiDocumentText,
} from "react-icons/hi";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <Container className="mt-5 mb-5">
      <Row className="flex-wrap">
        <Col xs={12} sm={6} md={4} lg={4}>
          <Card className="mb-3 p-3 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="d-flex justify-content-between">
              <div className="flex-shrink-1">
                <Card.Title className="text-gray-500 text-md uppercase">
                  Total Users
                </Card.Title>
                <p className="text-2xl">{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="d-flex flex-column gap-2 text-sm">
              <span className="text-green-500 d-flex align-items-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={4}>
          <Card className="mb-3 p-3 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="d-flex justify-content-between">
              <div className="flex-shrink-1">
                <Card.Title className="text-gray-500 text-md uppercase">
                  Total Users
                </Card.Title>
                <p className="text-2xl">{totalComments}</p>
              </div>
              <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="d-flex flex-column gap-2 text-sm">
              <span className="text-green-500 d-flex align-items-center">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={4}>
          <Card className="mb-3 p-3 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="d-flex justify-content-between">
              <div className="flex-shrink-1">
                <Card.Title className="text-gray-500 text-md uppercase">
                  Total Users
                </Card.Title>
                <p className="text-2xl">{totalPosts}</p>
              </div>
              <HiDocumentText className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
            </div>
            <div className="d-flex flex-column gap-2 text-sm">
              <span className="text-green-500 d-flex align-items-center">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="flex-wrap">
        <Col xs={12} lg={6} xl={6} className="mb-3">
          <Card className=" mb-2 p-2 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="flex justify-between text-sm p-3">
              <Card.Title className="text-gray-500 text-md uppercase">
                Recent Users
              </Card.Title>
              <Button className="btn" style={{background: "#0072bc", border: "none"}}>
                <Link to={"/dashboard?tab=users"} style={{ color: "white", }} className="text-decoration-none">
                  See all
                </Link>
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr className="nav-font">
                  <th style={{ color: "#0072bc" }}>User image</th>
                  <th style={{ color: "#0072bc" }}>Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="nav-font" key={user._id}>
                    <td>
                      <Image
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-auto object-cover"
                        roundedCircle
                      />
                    </td>
                    <td>{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col xs={12} lg={6} xl={6}>
          <Card className=" mb-2 p-2 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="flex justify-between text-sm p-3">
              <Card.Title className="text-gray-500 text-md uppercase">
                Recent Comments
              </Card.Title>
              <Button className="btn" style={{background: "#0072bc", border: "none"}}>
                <Link to={"/dashboard?tab=comments"} style={{ color: "white" }} className="text-decoration-none">
                  See all
                </Link>
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr className="nav-font">
                  <th style={{ color: "#0072bc" }}>Comment content</th>
                  <th style={{ color: "#0072bc" }}>Number of likes</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr className="nav-font" key={comment._id}>
                    <td>{comment.content}</td>
                    <td>{comment.numberOfLikes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-2 shadow-md rounded-md" style={{ border: "none"}}>
            <div className="flex justify-between text-sm p-3">
              <Card.Title className="text-gray-500 text-md uppercase">
                Recent Users
              </Card.Title>
              <Button className="btn" style={{background: "#0072bc", border: "none"}}>
                <Link to={"/dashboard?tab=posts"} style={{ color: "white" }} className="text-decoration-none">
                  See all
                </Link>
              </Button>
            </div>
            <Table responsive>
              <thead>
                <tr className="nav-font">
                  <th style={{ color: "#0072bc" }}>Post image</th>
                  <th style={{ color: "#0072bc" }}>Post title</th>
                  <th style={{ color: "#0072bc" }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="nav-font">
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
