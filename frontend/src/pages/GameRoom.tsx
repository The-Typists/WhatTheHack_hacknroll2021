import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSock } from "../hooks/useSock";
import { CodeBox } from "../components/CodeBox";

interface Params {
  code: string;
}

interface Player {
  color: string;
  username: string;
}

export interface Position {
  username: string;
  color: string;
  position: number;
}

interface StartGame {
  text: string;
  positions: Position[];
}

const colors = ["red", "green", "blue", "yellow", "purple"];
const color = colors[Math.floor(Math.random() * colors.length)];
const names = [
  "Bob",
  "The Bobz",
  "Big Bob",
  "BOOOOOOOOOOOOOOOOOOOOOOOOOOB",
  "Hello World",
];
const name = names[Math.floor(Math.random() * names.length)];

const GameRoom = () => {
  const { code } = useParams<Params>();
  const history = useHistory();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const socket = useSock();

  // For the game
  const [positions, setPositions] = useState<Position[]>([]);
  const [text, setText] = useState<string>("");

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

      socket.on("error-found", () => {
        history.push("/");
      });

      socket.on("start-game", (data: StartGame) => {
        setGameStarted(true);
        setPositions(data.positions);
        setText(data.text);
      });
    }
  }, [socket]);

  const startGame = () => {
    socket?.emit("start-game", {});
  };

  if (!gameStarted) {
    return (
      <div>
        <h1>Gameroom {code}</h1>
        {players.map((player) => (
          <p style={{ color: player.color }}>{player.username}</p>
        ))}
        <button onClick={startGame}>Start game</button>
      </div>
    );
  }

  return <CodeBox text={text} positions={positions} name={name} />;
};

export default GameRoom;
