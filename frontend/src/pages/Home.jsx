import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Posts from "../components/home/Posts/Posts";
import Stories from "../components/home/Stories/Stories";
import { Container, Row, Col } from "react-bootstrap";
import * as Path from "../routeNames";
import PostForm from "../components/home/PostForm/PostForm";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Path.AUTH);
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <Container fluid="md">
          <Row>
            <Col md="8">
              <Stories />
              <Posts />
            </Col>
            <Col md="4">
              <PostForm />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
