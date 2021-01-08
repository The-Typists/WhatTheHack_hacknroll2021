export enum Event {
  GetRooms = "rooms",
  CreateRoom = "create-room",
  JoinRoom = "join-room",
  StartGame = "start-game",
  FinishGame = "finish-game",
  SendPosition = "send-position",
  PlayerStartGame = "player-start-game",
  PlayerFinishGame = "player-finish-game",
  Disconnect = "disconnect",
}

export type JoinRoomRequest = {
  username: string;
  id: string;
  color: string;
  roomCode: string;
};

export type SendPositionRequest = {
  roomCode: string;
  position: number;
};
