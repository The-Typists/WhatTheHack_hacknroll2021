export enum Event {
  GetRooms = "rooms",
  CreateRoom = "create-room",
  JoinRoom = "join-room",
  PlayersInRoom = "get-room-players",
  StartGame = "start-game",
  FinishGame = "finish-game",
  SendPosition = "send-position",
  PlayerStartGame = "player-start-game",
  PlayerFinishGame = "player-finish-game",
  Disconnect = "disconnect",
  ErrorEncounted = "error-found",
}

export type JoinRoomRequest = {
  username: string;
  color: string;
  roomCode: string;
};

export type SendPositionRequest = number;
