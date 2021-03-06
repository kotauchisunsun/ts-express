import { User } from "../../src/domain/User";
import { UserId } from "../../src/domain/UserId";
import { InMemoryUserRepository } from "../../src/repository/user/InMemoryUserRepository";
import { UserNotFoundError } from "../../src/repository/user/UserNotFoundError";

describe("InMemoryUserRepositoryのテスト", () => {
  it("Saveのテスト", async () => {
    const user = new User(new UserId("1234"), "kotauchisunsun");

    const repository = new InMemoryUserRepository();
    await expect(repository.save(user)).resolves.toBeUndefined();
  });

  it("Findのテスト", async () => {
    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repository = new InMemoryUserRepository();
    await repository.save(user);
    const savedUser = await repository.find(new UserId("1234"));
    expect(savedUser.id.equals(user.id)).toBeTruthy();
    expect(savedUser.userName).toBe(user.userName);
  });

  it("Existsのテスト", async () => {
    const userId = new UserId("1234");
    const user = new User(userId, "kotauchisunsun");
    const repository = new InMemoryUserRepository();
    await expect(repository.exists(userId)).resolves.toBeFalsy();
    await repository.save(user);
    await expect(repository.exists(userId)).resolves.toBeTruthy();
  });

  it("Findの異常系のテスト", async () => {
    expect.assertions(1);
    const repository = new InMemoryUserRepository();
    await expect(repository.find(new UserId("1234"))).rejects.toBeInstanceOf(
      UserNotFoundError
    );
  });

  it("Deleteのテスト", async () => {
    expect.assertions(2);
    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repository = new InMemoryUserRepository();
    await expect(repository.delete(new UserId("1234"))).resolves.toBeFalsy();
    await repository.save(user);
    await expect(repository.delete(new UserId("1234"))).resolves.toBeTruthy();
  });
});
