import { UserRepositoryInteface } from "../../../src/repository/user/UserRepositoryInteface";
import { UserId } from "../../../src/domain/UserId";
import { User } from "../../../src/domain/User";
import { UserService } from "../../../src/domain/UserService";
import { UserNotFoundError } from "../../../src/repository/user/UserNotFoundError";
import { UpdateUserUseCase } from "../../../src/domain/use_case/UpdateUserUseCase";

describe("UpdateserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(1);

    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({
      save: async (_user: User): Promise<void> => {
        expect(_user).toBe(user);
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
    await useCase.run(user);
  });

  it("異常系のテスト", async () => {
    expect.assertions(1);

    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({}));
    const serviceMockClass = jest.fn<UserService>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        return false;
      }
    }));
    const serviceMock = new serviceMockClass();
    const repositoryMock = new repositoryMockClass();

    const useCase = new UpdateUserUseCase(repositoryMock, serviceMock);
    await expect(useCase.run(user)).rejects.toBeInstanceOf(UserNotFoundError);
  });
});
