import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSock } from "../hooks/useSock";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

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
    <div className="lobby-container">
      <div className="header">
        <h3>Gameroom {code}</h3>
        <Button onClick={() => {
          // Start Game
        }}>Start Game</Button>
      </div>

      <Table striped bordered hover variant={"dark"}>
        <thead>
        <tr>
          <th>S/N</th>
          <th>Room Code</th>
        </tr>
        </thead>
        <tbody>
        {
          players.map((player, index) =>
              <tr style={{ color: player.color }}>
                <td>{index}</td>
                <td>{player.username}</td>
              </tr>
          )
        }
        </tbody>
      </Table>
    </div>
  );
};

export default GameRoom;
