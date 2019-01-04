import { UserId } from "../../src/domain/UserId";
import { UserService } from "../../src/domain/UserService";
import { UserRepositoryInteface } from "../../src/repository/user/UserRepositoryInteface";

describe("UserServiceのテスト", () => {
  it("Existsのテスト", async () => {
    expect.assertions(2);
    const repositoryMockClass = jest.fn<UserRepositoryInteface>(() => ({
      exists: async (userId: UserId): Promise<boolean> => {
        expect(userId.value).toBe("1234");
        return true;
      }
    }));
    const repository = new repositoryMockClass();
    const service = new UserService(repository);

    await expect(service.exists(new UserId("1234"))).resolves.toBeTruthy();
  });
});
