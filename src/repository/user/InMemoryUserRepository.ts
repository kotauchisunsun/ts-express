import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
import { UserDuplicatedError } from "./UserDuplicatedError";
import { UserNotFoundError } from "./UserNotFoundError";
import { UserRepositoryInteface } from "./UserRepositoryInteface";

export class InMemoryUserRepository implements UserRepositoryInteface {
  private data: Map<string, User>;

  public constructor() {
    this.data = new Map<string, User>();
  }

  public async find(id: UserId): Promise<User> {
    const result = this.data.get(id.value);
    if (typeof result === "undefined") {
      throw new UserNotFoundError();
    } else {
      return result;
    }
  }

  public async save(user: User): Promise<void> {
    const userId = user.id.value;
    this.data.set(userId, user);
  }

  public async exists(userId: UserId): Promise<boolean> {
    const key = userId.value;
    return this.data.has(key);
  }

  public async delete(userId: UserId): Promise<boolean> {
    return this.data.delete(userId.value);
  }
}
