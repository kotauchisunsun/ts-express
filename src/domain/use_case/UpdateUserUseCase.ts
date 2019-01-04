import { UserNotFoundError } from "../../repository/user/UserNotFoundError";
import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { User } from "../User";
import { UserId } from "../UserId";
import { UserService } from "../UserService";

export class UpdateUserUseCaseInput {
  constructor(private _userId: string, private _name: string) {}

  public get userId(): string {
    return this._userId;
  }

  public get name(): string {
    return this._name;
  }
}

export class UpdateUserUseCase {
  public readonly repository: UserRepositoryInteface;
  public readonly userService: UserService;
  public constructor(
    repository: UserRepositoryInteface,
    userService: UserService
  ) {
    this.repository = repository;
    this.userService = userService;
  }
  public async run(input: UpdateUserUseCaseInput): Promise<void> {
    const userId = new UserId(input.userId);
    const isExists = await this.userService.exists(userId);
    if (!isExists) {
      throw new UserNotFoundError();
    } else {
      const user = await this.repository.find(userId);
      user.changeUserName(input.name);
      await this.repository.save(user);
    }
  }
}
