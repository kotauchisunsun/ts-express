import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { UserId } from "../UserId";
import { User } from "../User";

export class CreateUserUseCaseInput {
  public constructor(private _name: string) {}
  public get name(): string {
    return this._name;
  }
}
export class CreateUserUseCase {
  readonly repository: UserRepositoryInteface;
  public constructor(repository: UserRepositoryInteface) {
    this.repository = repository;
  }
  public async run(input: CreateUserUseCaseInput): Promise<void> {
    const id = Math.ceil(Math.random() * 100000);
    const userId = new UserId(String(id));
    const user = new User(userId, input.name);
    await this.repository.save(user);
  }
}
