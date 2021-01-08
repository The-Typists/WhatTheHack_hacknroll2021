import Player from "./Player";

import { Server } from "socket.io";
import { Event } from "./protocols";
import { Profile } from "../models/Profile";

const text = `package org.arpit.java2blog;

import java.util.Scanner;

public class FizzBuzzMain {

	public static void main(String[] args) {

		Scanner s = new Scanner(System.in);
		System.out.println("Enter number:");
		int n = s.nextInt();
		System.out.println("The FizzBuzz numberswill be: ");
		for (int i = 1; i <= n; i++) {
			if (i % 3 == 0 && i % 5 == 0) { //multiple of 3 & 5
				System.out.print("FizzBuzz");
			} else if (i % 3 == 0) { //multiple of 3
				System.out.print("Fizz");
			} else if (i % 5 == 0) { //multiple of 5
				System.out.print("Buzz");
			} else {
				System.out.print(i);
			}
			System.out.print(" ");
		}
		s.close();
	}
}`;
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
    if (idx === this.players.length) return;
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

    Profile.updateProfile(
      playerName,
      1,
      text.length,
      text.split(" ").length,
      player.getTimeTaken()
    ).catch((e) => console.log(e));
  }
}

export default Room;
