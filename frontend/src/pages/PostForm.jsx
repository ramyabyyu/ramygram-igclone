import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Image, Container, Row, Col } from "react-bootstrap";
import PopUpButton from "../components/PopUpButton";
import UploadContentBtns from "../components/UploadContentBtns";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Path from "../routeNames";

const PostForm = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Path.AUTH);
    }
  }, [user, navigate]);

  const initialPostData = {
    content: [],
    caption: "",
    tags: "",
  };

  const [postData, setPostData] = useState(initialPostData);
  const [imageUrls, setImageUrls] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  //   const [contentContainer, setContentContainer] = useState([]);

  const handleImagePreview = (e) => {
    const selectedFiles = e.target.files;

    const contentUrls = mapContentsToState(selectedFiles);

    setImageUrls((prevImages) => prevImages.concat(contentUrls));
  };

  const handleVideoPreview = (e) => {
    const selectedFiles = e.target.files;

    const contentUrls = mapContentsToState(selectedFiles);

    setVideoUrls((prevImages) => prevImages.concat(contentUrls));
  };

  const handleDeleteVideo = (vid) => {
    setVideoUrls(videoUrls.filter((v) => v !== vid));
    setPostData({
      ...postData,
      content: postData.content.filter((v) => v !== vid),
    });
  };

  const handleDeleteImage = (image) => {
    setImageUrls(imageUrls.filter((img) => img !== image));
    setPostData({
      ...postData,
      content: postData.content.filter((img) => img !== image),
    });
  };

  const mapContentsToState = (selectedFiles) => {
    const selectedFilesArray = Array.from(selectedFiles);

    const contentsArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setPostData({
      ...postData,
      content: postData.content.concat(contentsArray),
    });

    return contentsArray;
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
        {postData.content.length > 10 ? (
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
          onChange={handleImagePreview}
        />
        <input
          type="file"
          ref={hiddenVideoInput}
          accept="video/*"
          style={{ display: "none" }}
          onChange={handleVideoPreview}
        />

        <div className="d-flex flex-col mt-3">
          {imageUrls &&
            imageUrls.map((image) => (
              <div key={image} className="me-3 mb-5 preview__container">
                <Image
                  src={image}
                  width={250}
                  height={300}
                  alt="171x180"
                  className="image__preview"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteImage(image)}
                >
                  <FaTimes />
                </Button>
              </div>
            ))}
        </div>

        <div className="d-flex flex-col mt-5">
          {videoUrls &&
            videoUrls.map((vid) => (
              <div key={vid} className="me-3 preview__container">
                <video
                  src={vid}
                  width={250}
                  height={300}
                  autoPlay
                  controls
                ></video>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteVideo(vid)}
                >
                  <FaTimes />
                </Button>
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
