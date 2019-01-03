export class UserNotFoundError implements Error {
  public name: string;
  public message: string;
  constructor() {
    this.name = "UserNotFoundError";
    this.message = "User is not Found.";
  }
  public toString(): string {
    return `${this.name}:${this.message}`;
  }
}
