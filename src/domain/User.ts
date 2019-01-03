import { UserId } from "src/domain/UserId";
export class User {
  private _id: UserId;
  private name: string;
  public constructor(_id: UserId, name: string) {
    this._id = _id;
    this.name = name;
  }

  public get id(): UserId {
    return this._id;
  }

  public changeUserName(name: string): void {
    this.name = name;
  }

  get userName() {
    return this.name;
  }
}
