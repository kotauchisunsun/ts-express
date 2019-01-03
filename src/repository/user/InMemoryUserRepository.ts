import { UserId } from "../../domain/UserId";
import { User } from "../../domain/User";
import { UserRepositoryInteface } from "./UserRepositoryInteface";
import { UserNotFoundError } from "./UserNotFoundError";

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
    const userId = user.id;
    this.data.set(userId.value, user);
  }
}
