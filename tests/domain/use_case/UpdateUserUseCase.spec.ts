import { UserRepositoryInteface } from "../../../src/repository/user/UserRepositoryInteface";
import { UserId } from "../../../src/domain/UserId";
import { User } from "../../../src/domain/User";
import { UserService } from "../../../src/domain/UserService";
import { UserNotFoundError } from "../../../src/repository/user/UserNotFoundError";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput
} from "../../../src/domain/use_case/UpdateUserUseCase";

describe("UpdateserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(2);

    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({
      find: async (userId: UserId): Promise<User> => {
        return user;
      },
      save: async (_user: User): Promise<void> => {
        expect(_user).toBe(user);
        expect(_user.userName).toBe("piyo");
      }
    }));
    const serviceMockClass = jest.fn<UserService>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        return true;
      }
    }));
    const serviceMock = new serviceMockClass();
    const repositoryMock = new repositoryMockClass();

    const useCase = new UpdateUserUseCase(repositoryMock, serviceMock);
    const input = new UpdateUserUseCaseInput("1234", "piyo");
    await useCase.run(input);
  });

  it("異常系のテスト", async () => {
    expect.assertions(1);

    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({}));
    const serviceMockClass = jest.fn<UserService>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        return false;
      }
    }));
    const serviceMock = new serviceMockClass();
    const repositoryMock = new repositoryMockClass();

    const useCase = new UpdateUserUseCase(repositoryMock, serviceMock);
    const input = new UpdateUserUseCaseInput("1234", "kotauchisunsun");
    await expect(useCase.run(input)).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
