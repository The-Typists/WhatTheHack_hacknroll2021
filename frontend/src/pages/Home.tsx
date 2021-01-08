import React, { useEffect } from "react";
import { io } from "socket.io-client";

const Home = () => {
  useEffect(() => {
    const socket = io("/");
    socket.on("connect", () => {
      socket.emit("rooms", "gimme rooms");
    });
  }, []);
  return <div>Hello</div>;
};

export default Home;
