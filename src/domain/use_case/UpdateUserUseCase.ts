import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { User } from "../User";
import { UserService } from "../UserService";
import { UserNotFoundError } from "../../repository/user/UserNotFoundError";

export class UpdateUserUseCase {
  readonly repository: UserRepositoryInteface;
  readonly userService: UserService;
  public constructor(
    repository: UserRepositoryInteface,
    userService: UserService
  ) {
    this.repository = repository;
    this.userService = userService;
  }
  public async run(user: User): Promise<void> {
    const isExists = await this.userService.exists(user.id);
    if (!isExists) {
      throw new UserNotFoundError();
    } else {
      this.repository.save(user);
    }
  }
}
