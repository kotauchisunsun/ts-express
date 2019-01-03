import { InvalidUserIdError } from "./InvalidUserIdError";

export class UserId {
  private _value: string;
  public constructor(_value: string) {
    const pattern = /^[0-9]+$/g;
    if (_value.match(pattern) === null) {
      throw new InvalidUserIdError();
    }
    this._value = _value;
  }
  public get value(): string {
    return this._value;
  }
  public equals(obj: UserId): boolean {
    return this._value === obj._value;
  }
}
