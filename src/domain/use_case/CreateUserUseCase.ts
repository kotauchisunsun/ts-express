import { UserDuplicatedError } from "../../repository/user/UserDuplicatedError";
import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { User } from "../User";
import { UserId } from "../UserId";
import { UserService } from "../UserService";

export class CreateUserUseCaseInput {
  public constructor(private _name: string) {}
  public get name(): string {
    return this._name;
  }
}

export class CreateUserUseCaseOutput {
  public constructor(private _userId: UserId) {}
  public get userId(): UserId {
    return this._userId;
  }
}

export class CreateUserUseCase {
  public readonly repository: UserRepositoryInteface;
  public readonly userService: UserService;

  public constructor(
    repository: UserRepositoryInteface,
    userService: UserService
  ) {
    this.repository = repository;
    this.userService = userService;
  }

  public async run(
    input: CreateUserUseCaseInput
  ): Promise<CreateUserUseCaseOutput> {
    const id = Math.ceil(Math.random() * 100000);
    const userId = new UserId(String(id));
    if (await this.userService.exists(userId)) {
      throw new UserDuplicatedError();
    }
    const user = new User(userId, input.name);
    await this.repository.save(user);
    return new CreateUserUseCaseOutput(userId);
  }
}
