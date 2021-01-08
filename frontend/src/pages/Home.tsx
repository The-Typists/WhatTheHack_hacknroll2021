import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Home = () => {
  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);
  return <div>Hello</div>;
};

export default Home;
