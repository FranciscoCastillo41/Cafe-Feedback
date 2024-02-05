import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl">
          Welcome to Dora's Cafe Feedback app
        </h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
          justo ut massa tincidunt dapibus. Aenean euismod nisl ut libero
          cursus, vitae cursus velit bibendum.
        </p>
        <Link to="/search">View Posts</Link>
      </div>
      <div className="p-3 text-center" style={{ background: "lightgray" }}>
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <Row>
            {posts.map((post, index) => (
              <Col key={post._id} xs={12} sm={6} md={4}>
                <PostCard post={post} />
              </Col>
            ))}
            <Link
              to={"/search"}
              className="text-lg text-teal-500 text-center hover:underline"
            >
              View all posts
            </Link>
          </Row>
        )}
      </div>
    </div>
  );
}
