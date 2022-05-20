import React from "react";
import { Figure } from "react-bootstrap";

const ContentPreview = ({ contents }) => {
  return (
    <div className="d-flex flex-col">
      {contents.map((content) => (
        <Figure>
          <Figure.Image width={171} height={180} alt="171x180" src={content} />
        </Figure>
      ))}
    </div>
  );
};

export default ContentPreview;
