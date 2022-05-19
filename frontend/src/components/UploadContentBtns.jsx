import React from "react";
import { FaCamera, FaVideo } from "react-icons/fa";
import { Button } from "react-bootstrap";

const UploadContentBtns = ({ handlePhotoInput, handleVideoInput }) => {
  return (
    <div className="d-flex flex-col justify-content-evenly">
      <Button variant="primary" onClick={handlePhotoInput}>
        <FaCamera />
      </Button>
      <Button variant="success" onClick={handleVideoInput}>
        <FaVideo />
      </Button>
    </div>
  );
};

export default UploadContentBtns;
