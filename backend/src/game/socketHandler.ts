import { Server, Socket } from "socket.io";
import { Global } from "./events";
import { generateRoomCode } from "./util";

export default function (io: Server) {
  io.on("connection", (socket) => {
    console.log("Connected");
  });
  io.on(Global.Rooms, () => {
    // Return all rooms and their sizes
  });

  io.on(Global.CreateRoom, (socket: Socket) => {
    // Generate room code for user
    console.log(socket);
    socket.send(Global.CreateRoom, generateRoomCode(6));
  });
}
