import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";

const ImagePreview = ({ image, handleDelete }) => {
  return (
    <Row>
      <Col>
        <Image src={image} width={171} height={180} alt="171x180" />
        <Button variant="danger" size="sm" onClick={handleDelete}>
          <FaTimes />
        </Button>
      </Col>
    </Row>
  );
};

export default ImagePreview;
