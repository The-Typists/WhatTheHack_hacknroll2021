import Player from "./Player";

import { Server } from "socket.io";
import { Event } from "./protocols";

const text = `Lorem Ipsum is typesetting industry.`;

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

  private findPlayer(name: string): Player | undefined {
    return this.players.find((player) => player.username === name);
  }

  getSize(): number {
    return this.players.length;
  }

  addPlayer(player: Player) {
    player.socket.join(this.name);
    this.players.push(player);
  }

  sendRoomDetails() {
    const playerDetails = this.players.map((player) => ({
      username: player.username,
      color: player.color,
    }));
    console.log(playerDetails);
    this.io.to(this.name).emit(Event.PlayersInRoom, playerDetails);
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

  updatePlayerPosition(playerName: string, position: number) {
    const player = this.findPlayer(playerName);

    if (!player) return;

    player.updatePosition(position);

    this.io
      .to(this.name)
      .emit(Event.SendPosition, player.getBroadcastPosition());
  }

  setPlayerStart(playerName: string) {
    const player = this.findPlayer(playerName);
    if (!player) return;

    player.startTimer();
    console.log("timer started");
  }

  setPlayerFinished(playerName: string, text: string) {
    const player = this.findPlayer(playerName);
    if (!player) return;

    player.endTimer();
    console.log("timer ended");
    console.log(player.getTimeTaken());
    console.log(text);
    this.io.to(this.name).emit(Event.PlayerFinishGame, {
      username: player.username,
      time: player.getTimeTaken(),
    });
  }
}

export default Room;
