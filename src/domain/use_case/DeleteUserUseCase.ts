import { UserRepositoryInteface } from "../../repository/user/UserRepositoryInteface";
import { UserId } from "../UserId";

export class DeleteUserUseCaseInput {
  public constructor(readonly userId: string) {}
}

export class DeleteUserUseCase {
  public constructor(private repository: UserRepositoryInteface) {}
  public async run(input: DeleteUserUseCaseInput): Promise<boolean> {
    const userId = new UserId(input.userId);
    return this.repository.delete(userId);
  }
}
