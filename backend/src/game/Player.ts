/**
 * Player represents a single user in a room.
 */
class Player {
  id: string;
  username: string;
  color: string;
  private startTime: Date | undefined;
  private endTime: Date | undefined;

  public constructor(id: string, username: string, color: string) {
    this.id = id;
    this.username = username;
    this.color = color;
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
      throw new Error("Times are not correctly initialized");
    }

    return this.endTime.getTime() - this.startTime.getTime();
  }
}

export default Player;
