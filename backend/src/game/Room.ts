import Player from "./Player";

/**
 * Room represents the game room that users belong in.
 */
class Room {
  players: Player[] = [];
  name: string;

  public constructor(name: string) {
    this.name = name;
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }
}

export default Room;
