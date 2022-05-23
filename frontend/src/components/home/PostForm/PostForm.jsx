import React, { useRef, useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import PopUpButton from "../../PopUpButton";
import UploadContentBtns from "../../UploadContentBtns";
import { FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";

const PostForm = () => {
  const initialPostData = {
    content: [],
    caption: "",
    tags: "",
  };

  const [postData, setPostData] = useState(initialPostData);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);

  const handleContentPreview = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles[0].type.substr(0, 4) === "image") {
      mapContentsToState(selectedFiles, setImageUrls);
    } else {
      mapContentsToState(selectedFiles, setVideoUrls);
    }
  };

  const mapContentsToState = (selectedFiles, setState) => {
    const selectedFilesArray = Array.from(selectedFiles);

    const contentsArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setState((prevContents) => prevContents.concat(contentsArray));
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
        {imageUrls.length > 10 ? (
          <Button variant="outline-secondary" disabled>
            Max 10 Contents
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

        <div className="d-flex flex-col">
          {imageUrls &&
            imageUrls.map((image) => (
              <div key={image}>
                <Image
                  src={image}
                  width={171}
                  height={180}
                  alt="171x180"
                  className="image__preview"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() =>
                    setImageUrls(imageUrls.filter((e) => e !== image))
                  }
                >
                  <FaTimes />
                </Button>
              </div>
            ))}
        </div>

        <div className="d-flex flex-col">
          {videoUrls &&
            videoUrls.map((vid) => (
              <div key={vid}>
                <video
                  src={vid}
                  width={250}
                  height={300}
                  autoPlay
                  controls
                ></video>
              </div>
            ))}
        </div>
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
