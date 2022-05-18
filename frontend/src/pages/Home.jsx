import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Path from "../routeNames";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Path.AUTH);
    }
  }, [user, navigate]);

  return <>{user && <h3>Hello {user.user.name}</h3>}</>;
};

export default Home;
