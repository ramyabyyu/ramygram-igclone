import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, reset } from "../../../features/post/postSlice";
import { toast } from "react-toastify";
import * as Path from "../../../routeNames";
import Loader from "../../Loader";
import { Card } from "react-bootstrap";

const PostItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate(Path.AUTH);
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Card
        className="rounded shadow border-0"
        style={{ width: "18rem" }}
      ></Card>
    </>
  );
};

export default PostItem;
