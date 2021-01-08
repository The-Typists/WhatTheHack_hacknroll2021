import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSock } from "../hooks/useSock";
import { CodeBox } from "../components/CodeBox";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

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

interface EndPosition {
  username: string;
  time: number;
}

const generateNumber255 = () => {
  return (Math.floor(Math.random() * 100) + 155).toString();
};

const color = `rgb(${generateNumber255()}, ${generateNumber255()}, ${generateNumber255()})`;
const names = [
  "Bob",
  "The Bobz",
  "Big Bob",
  "BOOOOOOOOOOOOOOOOOOOOOOOOOOB",
  "Hello World",
];

const GameRoom = () => {
  const { code } = useParams<Params>();
  const history = useHistory();
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const socket = useSock();

  // For the game
  const [positions, setPositions] = useState<Position[]>([]);
  const [text, setText] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<EndPosition[]>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on("get-room-players", (playerDetails: Player[]) => {
        console.log(playerDetails);
        setPlayers(playerDetails);
      });
      // @ts-ignore
      Promise.resolve(localStorage.getItem("user"))
        .then((json) => JSON.parse(json as string))
        .then((user) => {
          setName(user.username);
          socket.emit("join-room", {
            username: user.username,
            color: color,
            roomCode: code,
          });
        });

      socket.on("error-found", () => {
        history.push("/");
      });

      socket.on("start-game", (data: StartGame) => {
        setGameStarted(true);
        setPositions(data.positions);
        setText(data.text);
      });

      socket.on("send-position", (pos: Position) => {
        setPositions((positions) =>
          positions.map((position) => {
            if (position.username === pos.username) return pos;

            return position;
          })
        );
      });

      socket.on("player-finish-game", (end: EndPosition) => {
        console.log(end);
        setLeaderboard([...leaderboard, end]);
      });
    }
  }, [socket]);

  const startGame = () => {
    socket?.emit("start-game", code);
  };

  if (!gameStarted) {
    return (
      <div className="lobby-container">
        <div className="header">
          <h3>Gameroom {code}</h3>
          <Button onClick={startGame}>Start Game</Button>
        </div>

        <Table striped bordered hover variant={"dark"}>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr style={{ color: player.color }}>
                <td>{index}</td>
                <td>{player.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <CodeBox roomCode={code} text={text} positions={positions} name={name} />
    </div>
  );
};

export default GameRoom;
