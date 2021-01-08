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

export type SendPositionRequest = {
  position: number;
  roomCode: string;
  playerName: string;
};

export type RoomAndName = {
  roomCode: string;
  name: string;
};

export type RoomNameText = {
  roomCode: string;
  name: string;
  text: string;
};
