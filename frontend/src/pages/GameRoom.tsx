import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSock } from "../hooks/useSock";

interface Params {
  code: string;
}

const GameRoom = () => {
  const { code } = useParams<Params>();
  const socket = useSock();

  useEffect(() => {
    if (socket) {
      socket.emit("join-room");
    }
  }, [socket]);
  return <h1>Gameroom {code}</h1>;
};

export default GameRoom;
