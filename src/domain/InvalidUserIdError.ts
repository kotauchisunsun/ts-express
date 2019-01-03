export class InvalidUserIdError implements Error {
  public name: string;
  public message: string;
  constructor() {
    this.name = "InvalidUserIdError";
    this.message = "Invalid UserId Format.";
  }
  public toString(): string {
    return `${this.name}:${this.message}`;
  }
}
