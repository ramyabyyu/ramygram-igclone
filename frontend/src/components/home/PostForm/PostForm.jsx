import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import PopUpButton from "../../PopUpButton";
import UploadContentBtns from "../../UploadContentBtns";

const PostForm = () => {
  const initialPostData = {
    content: [],
    caption: "",
    tags: "",
  };

  const [postData, setPostData] = useState(initialPostData);
  const [contentUrls, setContentUrls] = useState([]);

  const handleContentPreview = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setContentUrls((prevContents) => prevContents.concat(imagesArray));
  };

  const hiddenPhotoInput = useRef(null);
  const handlePhotoInput = (e) => {
    hiddenPhotoInput.current.click();
  };

  const hiddenVideoInput = useRef(null);
  const handleVideoInput = (e) => {
    hiddenVideoInput.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="mb-3">
        {contentUrls.length > 10 ? (
          <Button variant="outline-success" disabled>
            Upload Contents
          </Button>
        ) : (
          <PopUpButton
            trigger="click"
            placement="right"
            title="Upload Options"
            body={
              <UploadContentBtns
                handlePhotoInput={handlePhotoInput}
                handleVideoInput={handleVideoInput}
              />
            }
            btnVariant="outline-success"
            btnName="Upload Contents"
          />
        )}

        <input
          type="file"
          ref={hiddenPhotoInput}
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleContentPreview}
        />
        <input
          type="file"
          ref={hiddenVideoInput}
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleContentPreview}
        />
      </div>
      <Form.Group className="mb-3" controlId="caption">
        <Form.Label>Caption</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          spellCheck="false"
          style={{ resize: "none" }}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="tags">
        <Form.Label>Tags</Form.Label>
        <Form.Control type="text" spellCheck="false" />
      </Form.Group>

      <div className="mb-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;
