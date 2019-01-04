import { User } from "../../domain/User";
import { UserId } from "../../domain/UserId";
export interface UserRepositoryInteface {
  find(id: UserId): Promise<User>;
  save(user: User): Promise<void>;
  exists(id: UserId): Promise<boolean>;
  delete(id: UserId): Promise<boolean>;
}
