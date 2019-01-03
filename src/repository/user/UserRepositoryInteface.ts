import { UserId } from "../../domain/UserId";
import { User } from "../../domain/User";
export interface UserRepositoryInteface {
  find(id: UserId): Promise<User>;
  save(user: User): Promise<void>;
  exists(id: UserId): Promise<boolean>;
}
