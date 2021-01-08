import { Socket } from "socket.io";
/**
 * Player represents a single user in a room.
 */
class Player {
  username: string;
  color: string;
  socket: Socket;
  private startTime: Date | undefined;
  private endTime: Date | undefined;
  private position: number = 0;

  public constructor(username: string, color: string, socket: Socket) {
    this.username = username;
    this.color = color;
    this.socket = socket;
  }

  /**
   * Time should start when first character is pressed.
   */
  startTimer(): void {
    this.startTime = new Date();
  }

  /**
   * Time should end when success event is triggered.
   */
  endTimer(): void {
    this.endTime = new Date();
  }

  /**
   * @returns Time taken in milliseconds
   */
  getTimeTaken(): number {
    if (this.startTime === undefined || this.endTime === undefined) {
      // throw new Error("Times are not correctly initialized");
      return -1;
    }

    return this.endTime.getTime() - this.startTime.getTime();
  }

  updatePosition(position: number) {
    this.position = position;
  }

  getBroadcastPosition() {
    return {
      username: this.username,
      color: this.color,
      position: this.position,
    };
  }
}

export default Player;
