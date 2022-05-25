import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const VideoPreview = ({ vid, handleDelete }) => {
  return (
    <Row>
      <Col>
        <video src={vid} autoPlay controls width={250} height={300}></video>
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <FaTimes />
        </Button>
      </Col>
    </Row>
  );
};

export default VideoPreview;
