import { UserRepositoryInteface } from "src/repository/user/UserRepositoryInteface";
import { UserId } from "./UserId";

export class UserService {
  readonly repository: UserRepositoryInteface;

  public constructor(repository: UserRepositoryInteface) {
    this.repository = repository;
  }

  public async exists(userId: UserId): Promise<boolean> {
    return this.repository.exists(userId);
  }
}
