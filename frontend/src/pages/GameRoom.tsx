import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSock } from "../hooks/useSock";

interface Params {
  code: string;
}

interface Player {
  color: string;
  username: string;
}

const colors = ["red", "green", "blue", "yellow", "purple"];
const color = colors[Math.floor(Math.random() * colors.length)];
const name = "Bob";

const GameRoom = () => {
  const { code } = useParams<Params>();
  const [players, setPlayers] = useState<Player[]>([]);
  const socket = useSock();

  useEffect(() => {
    if (socket) {
      socket.on("get-room-players", (playerDetails: Player[]) => {
        console.log(playerDetails);
        setPlayers(playerDetails);
      });
      socket.emit("join-room", {
        username: name,
        color: color,
        roomCode: code,
      });
    }
  }, [socket]);
  return (
    <div>
      <h1>Gameroom {code}</h1>
      {players.map((player) => (
        <p style={{ color: player.color }}>{player.username}</p>
      ))}
    </div>
  );
};

export default GameRoom;
