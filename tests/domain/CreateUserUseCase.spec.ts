import { UserRepositoryInteface } from "../../src/repository/user/UserRepositoryInteface";
import { User } from "../../src/domain/User";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "../../src/domain/use_case/CreateUserUseCase";
import { UserDuplicatedError } from "../../src/repository/user/UserDuplicatedError";

describe("CreateUserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(1);
    const Mock = jest.fn<UserRepositoryInteface>(() => ({
      save: async (user: User): Promise<void> => {
        const a = 1;
      }
    }));
    const mock = new Mock();

    const useCase = new CreateUserUseCase(mock);
    const input = new CreateUserUseCaseInput("kotauchisunsun");

    await expect(useCase.run(input)).resolves.toBeUndefined();
  });

  it("異常系のテスト", async () => {
    expect.assertions(1);
    const Mock = jest.fn<UserRepositoryInteface>(() => ({
      save: async (user: User): Promise<void> => {
        throw new UserDuplicatedError();
      }
    }));
    const mock = new Mock();

    const useCase = new CreateUserUseCase(mock);
    const input = new CreateUserUseCaseInput("kotauchisunsun");

    await expect(useCase.run(input)).rejects.toBeInstanceOf(
      UserDuplicatedError
    );
  });
});
