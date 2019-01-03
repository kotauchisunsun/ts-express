import { UserRepositoryInteface } from "../../src/repository/user/UserRepositoryInteface";
import { User } from "../../src/domain/User";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "../../src/domain/use_case/CreateUserUseCase";
import { UserDuplicatedError } from "../../src/repository/user/UserDuplicatedError";
import { UserService } from "../../src/domain/UserService";
import { UserId } from "../../src/domain/UserId";

describe("CreateUserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(1);
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({
      save: async (user: User): Promise<void> => {
        const a = 1;
      }
    }));
    const repositoryMock = new repositoryMockClass();

    const serviceMockClass = jest.fn<UserService>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        return false;
      }
    }));
    const serviceMock = new serviceMockClass();

    const useCase = new CreateUserUseCase(repositoryMock, serviceMock);
    const input = new CreateUserUseCaseInput("kotauchisunsun");

    await expect(useCase.run(input)).resolves.toBeUndefined();
  });

  it("異常系のテスト", async () => {
    expect.assertions(1);
    const Mock = jest.fn<UserRepositoryInteface>(() => ({
      save: async (user: User): Promise<void> => {
        const a = 1;
      }
    }));
    const mock = new Mock();

    const serviceMockClass = jest.fn<UserService>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        return true;
      }
    }));
    const serviceMock = new serviceMockClass();

    const useCase = new CreateUserUseCase(mock, serviceMock);
    const input = new CreateUserUseCaseInput("kotauchisunsun");

    await expect(useCase.run(input)).rejects.toBeInstanceOf(
      UserDuplicatedError
    );
  });
});
