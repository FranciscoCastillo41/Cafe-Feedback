import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [ recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if(res.ok) {
          setRecentPosts(data.posts);
        }
      }
      fetchRecentPosts();
    } catch(error) {
      console.log(error);
    }
  },[])

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" animation="grow" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button style={{ background: "#0072bc", border: "none" }}>
          {post && post.category}
        </Button>
      </Link>
      <Image
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 mx-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3">
        <span className="text-muted">
          {post && new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <Container>
      <Row>
        <Col>
          <h1 className="text-center">Recent posts</h1>
        </Col>
      </Row>
      <Row xs={1} sm={2} md={3}>
        {recentPosts &&
          recentPosts.map((post) => (
            <Col key={post._id} className="mb-4">
              <PostCard post={post} />
            </Col>
          ))}
      </Row>
    </Container>
    </main>
  );
}
