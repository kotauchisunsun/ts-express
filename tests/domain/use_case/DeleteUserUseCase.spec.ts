import {
  DeleteUserUseCase,
  DeleteUserUseCaseInput
} from "../../../src/domain/use_case/DeleteUserUseCase";
import { UserId } from "../../../src/domain/UserId";
import { UserService } from "../../../src/domain/UserService";
import { UserRepositoryInteface } from "../../../src/repository/user/UserRepositoryInteface";

describe("DeleteUserUseCaseのテスト", () => {
  it("正常系のテスト", async () => {
    expect.assertions(1);
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({
      delete: async (userId: UserId): Promise<boolean> => {
        expect(userId.value).toBe("1234");
        return true;
      }
    }));
    const repositoryMock = new repositoryMockClass();

    const input = new DeleteUserUseCaseInput("1234");
    const useCase = new DeleteUserUseCase(repositoryMock);

    await useCase.run(input);
  });
});
