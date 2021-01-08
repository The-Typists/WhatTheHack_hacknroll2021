import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSock } from "../hooks/useSock";

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

  return (
    <div>
      <h1>Available Rooms</h1>
      {rooms.map((room) => {
        {
          return (
            <h4>
              {room.roomCode} has {room.size}
            </h4>
          );
        }
      })}
      <button onClick={onCreate}>Create Room</button>
    </div>
  );
};

export default Home;
