import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Posts from "../components/home/Posts/Posts";
// import Stories from "../components/home/Stories/Stories";
import { Container, Row, Col } from "react-bootstrap";
import * as Path from "../routeNames";

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
              <Link className="btn btn-primary mb-5" to={Path.POSTFORM}>
                Upload Post
              </Link>
              <Posts />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Home;
