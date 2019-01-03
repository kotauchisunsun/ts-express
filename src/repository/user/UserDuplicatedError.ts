export class UserDuplicatedError implements Error {
  public name: string;
  public message: string;
  constructor() {
    this.name = "UserDuplicatedError";
    this.message = "User is duplicated.";
  }
  public toString(): string {
    return `${this.name}:${this.message}`;
  }
}
