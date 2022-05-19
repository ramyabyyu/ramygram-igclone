import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import noImage from "../../../userImage/noimage.png";

const Stories = () => {
  return (
    <div className="stories__container">
      <Image
        src={noImage}
        alt="No Image"
        className="profile__story"
        fluid
        roundedCircle
      />
      <Image
        src={noImage}
        alt="No Image"
        className="profile__story"
        fluid
        roundedCircle
      />
    </div>
  );
};

export default Stories;
