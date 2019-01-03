import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { UserId } from "../UserId";
import { User } from "../User";
import { UserService } from "../UserService";
import { UserDuplicatedError } from "../../repository/user/UserDuplicatedError";

export class CreateUserUseCaseInput {
  public constructor(private _name: string) {}
  public get name(): string {
    return this._name;
  }
}
export class CreateUserUseCase {
  readonly repository: UserRepositoryInteface;
  readonly userService: UserService;

  public constructor(
    repository: UserRepositoryInteface,
    userService: UserService
  ) {
    this.repository = repository;
    this.userService = userService;
  }

  public async run(input: CreateUserUseCaseInput): Promise<void> {
    const id = Math.ceil(Math.random() * 100000);
    const userId = new UserId(String(id));
    if (await this.userService.exists(userId)) {
      throw new UserDuplicatedError();
    }
    const user = new User(userId, input.name);
    await this.repository.save(user);
  }
}
