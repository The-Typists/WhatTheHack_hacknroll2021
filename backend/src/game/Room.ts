import Player from "./Player";

import { Server } from "socket.io";
import { Event } from "./protocols";

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

/**
 * Room represents the game room that users belong in.
 */
class Room {
  players: Player[] = [];
  name: string;
  io: Server;

  public constructor(name: string, io: Server) {
    this.name = name;
    this.io = io;
  }

  private findPlayer(socketId: string): Player | undefined {
    return this.players.find((player) => player.socket.id === socketId);
  }

  getSize(): number {
    return this.players.length;
  }

  addPlayer(player: Player) {
    player.socket.join(this.name);
    this.players.push(player);
  }

  removePlayer(socketId: string) {
    let idx = 0;
    while (idx < this.players.length) {
      if (this.players[idx].socket.id === socketId) {
        break;
      }
      idx++;
    }
    this.players[idx].socket.leave(this.name);
    this.players.splice(idx, 1);
  }

  startGame() {
    const positions = this.players.map((player) =>
      player.getBroadcastPosition()
    );
    this.io
      .to(this.name)
      .emit(Event.StartGame, { text: text, positions: positions });
  }

  updatePlayerPosition(socketId: string, position: number) {
    const player = this.findPlayer(socketId);
    if (!player) return;

    player.updatePosition(position);
    this.io
      .to(this.name)
      .emit(Event.SendPosition, player.getBroadcastPosition());
  }

  setPlayerStart(socketId: string) {
    const player = this.findPlayer(socketId);
    if (!player) return;

    player.startTimer();
  }

  setPlayerFinished(socketId: string) {
    const player = this.findPlayer(socketId);
    if (!player) return;

    player.endTimer();
    this.io.to(this.name).emit(Event.PlayerFinishGame, {
      username: player.username,
      time: player.getTimeTaken(),
    });
  }
}

export default Room;
