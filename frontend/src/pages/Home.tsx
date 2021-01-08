import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSock } from "../hooks/useSock";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Home.css";

interface Room {
  roomCode: string;
  size: number;
}
const Home = () => {
  const socket = useSock();
  const [rooms, setRooms] = useState<Room[]>([]);
  const history = useHistory();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected");
        socket.emit("rooms");
      });

      socket.on("rooms", (data: Room[]) => {
        console.log(data);
        setRooms(data);
      });
    }
  }, [socket]);

  const onCreate = () => {
    socket?.on("create-room", (roomCode: string) => {
      history.push(`/room/${roomCode}`);
    });

    socket?.emit("create-room");
  };

  // @ts-ignore
  return (
    <div className="lobby-container">
      <div className="header">
        <h3>Available Rooms</h3>
        <Button variant="dark" onClick={onCreate}>
          Create Room
        </Button>
      </div>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Room Code</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr
              onClick={() => {
                history.push(`/room/${room.roomCode}`);
              }}
            >
              <td>{index}</td>
              <td>{room.roomCode}</td>
              <td>{room.size} / 5</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
