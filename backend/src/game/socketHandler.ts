import { Server, Socket } from "socket.io";
import { Event, JoinRoomRequest, SendPositionRequest } from "./protocols";
import { generateRoomCode } from "./util";
import Player from "./Player";
import Room from "./Room";
import { socketHandler } from ".";

interface CustomSocket extends Socket {
  room: Room;
}

const rooms: Record<string, Room> = {};
export default function (io: Server) {
  io.on("connection", (socket: CustomSocket) => {
    // Return all rooms and their sizes
    socket.on(Event.GetRooms, () => {});

    // Generate room code for user
    socket.on(Event.CreateRoom, () => {
      const roomCode = generateRoomCode(6);

      rooms[roomCode] = new Room(roomCode, io);
      io.to(socket.id).emit(Event.CreateRoom, roomCode);
    });

    // Add player to existing room
    socket.on(Event.JoinRoom, (data: JoinRoomRequest) => {
      const player = new Player(data.username, data.color, socket);
      const room = rooms[data.roomCode];
      if (room) {
        socket.room = room;
        room.addPlayer(player);
      }
    });

    // Remove player from room and delete the room if it is empty
    socket.on(Event.Disconnect, () => {
      const room = socket.room;
      room.removePlayer(socket.id);
      if (room.players.length === 0) {
        delete rooms[room.name];
      }
    });

    // User starts a game for the lobby
    socket.on(Event.StartGame, () => {
      socket.room.startGame();
    });

    // A player starts his game (e.g. char press)
    socket.on(Event.StartGame, () => {
      socket.room.setPlayerStart(socket.id);
    });

    // A player finishes his game
    socket.on(Event.FinishGame, () => {
      socket.room.setPlayerFinished(socket.id);
    });

    // Update player positions for the room
    socket.on(Event.SendPosition, (data: SendPositionRequest) => {
      socket.room.updatePlayerPosition(socket.id, data.position);
    });
  });
}
