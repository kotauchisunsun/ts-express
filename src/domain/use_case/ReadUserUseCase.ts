import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { UserId } from "../UserId";

export class ReadUserUseCaseInput {
  public constructor(private _userId: string) {}
  get userId() {
    return this._userId;
  }
}

export class ReadUserUseCaseOuput {
  public constructor(private _name: string) {}
  public get name() {
    return this._name;
  }
}

export class ReadUserUseCase {
  public readonly repository: UserRepositoryInteface;

  public constructor(repository: UserRepositoryInteface) {
    this.repository = repository;
  }

  public async run(input: ReadUserUseCaseInput): Promise<ReadUserUseCaseOuput> {
    const userId = new UserId(input.userId);
    const user = await this.repository.find(userId);
    return new ReadUserUseCaseOuput(user.userName);
  }
}
