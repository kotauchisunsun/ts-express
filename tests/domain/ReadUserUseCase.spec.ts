import {
  ReadUserUseCase,
  ReadUserUseCaseInput,
  ReadUserUseCaseOuput
} from "../../src/domain/use_case/ReadUserUseCase";
import { UserRepositoryInteface } from "../../src/repository/user/UserRepositoryInteface";
import { UserId } from "../../src/domain/UserId";
import { User } from "../../src/domain/User";

describe("ReadUserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
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
});
