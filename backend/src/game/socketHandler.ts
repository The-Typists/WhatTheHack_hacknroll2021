import { Server, Socket } from "socket.io";
import { Event, JoinRoomRequest, SendPositionRequest } from "./protocols";
import { generateRoomCode } from "./util";
import Player from "./Player";
import Room from "./Room";
import { socketHandler } from ".";

interface CustomSocket extends Socket {
  room: Room | undefined;
}

const rooms: Record<string, Room> = {};
export default function (io: Server) {
  io.on("connection", (socket: CustomSocket) => {
    // Return all rooms and their sizes
    socket.on(Event.GetRooms, () => {
      const sizes = Object.keys(rooms).map((key) => ({
        roomCode: key,
        size: rooms[key].getSize(),
      }));
      io.to(socket.id).emit(Event.GetRooms, sizes);
      console.log(`Current room sizes are ${sizes}`);
    });

    // Generate room code for user
    socket.on(Event.CreateRoom, () => {
      const roomCode = generateRoomCode(6);

      rooms[roomCode] = new Room(roomCode, io);
      io.to(socket.id).emit(Event.CreateRoom, roomCode);
      console.log(`Room was created with ${roomCode}`);
    });

    // Add player to existing room
    socket.on(Event.JoinRoom, (data: JoinRoomRequest) => {
      console.log(`Got request from ${data.username}`);
      const player = new Player(data.username, data.color, socket);
      const room = rooms[data.roomCode];
      if (room) {
        if (room.getSize() > 4) {
          io.to(socket.id).emit(Event.ErrorEncounted, {});
        }
        socket.room = room;
        room.addPlayer(player);
        room.sendRoomDetails();
      }
    });

    // Remove player from room and delete the room if it is empty
    socket.on("disconnect", (reason: string) => {
      console.log(`A socket is disconnecting ${reason}`);
      const room = socket.room;
      if (room) {
        room.removePlayer(socket.id);
        if (room.players.length === 0) {
          delete rooms[room.name];
        }
      }
    });

    // User starts a game for the lobby
    socket.on(Event.StartGame, () => {
      socket.room?.startGame();
    });

    // A player starts his game (e.g. char press)
    socket.on(Event.StartGame, () => {
      socket.room?.setPlayerStart(socket.id);
    });

    // A player finishes his game
    socket.on(Event.FinishGame, () => {
      socket.room?.setPlayerFinished(socket.id);
    });

    // Update player positions for the room
    socket.on(Event.SendPosition, (position: SendPositionRequest) => {
      console.log(position);
      socket.room?.updatePlayerPosition(socket.id, position);
    });
  });
}
