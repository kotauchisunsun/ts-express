import {
  ReadUserUseCase,
  ReadUserUseCaseInput
} from "../../src/domain/use_case/ReadUserUseCase";
import { UserRepositoryInteface } from "../../src/repository/user/UserRepositoryInteface";
import { UserId } from "../../src/domain/UserId";
import { User } from "../../src/domain/User";
import { UserNotFoundError } from "../../src/repository/user/UserNotFoundError";

describe("ReadUserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(1);
    const Mock = jest.fn<UserRepositoryInteface>(() => ({
      find: async (userId: UserId): Promise<User> => {
        return new User(userId, "name1");
      }
    }));
    const mock = new Mock();

    const useCase = new ReadUserUseCase(mock);
    const input = new ReadUserUseCaseInput("1234");
    const output = await useCase.run(input);

    expect(output.name).toBe("name1");
  });

  it("異常系のテスト", async () => {
    expect.assertions(1);
    const Mock = jest.fn<UserRepositoryInteface>(() => ({
      find: async (userId: UserId): Promise<User> => {
        throw new UserNotFoundError();
      }
    }));
    const mock = new Mock();

    const useCase = new ReadUserUseCase(mock);
    const input = new ReadUserUseCaseInput("1234");

    await expect(useCase.run(input)).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
