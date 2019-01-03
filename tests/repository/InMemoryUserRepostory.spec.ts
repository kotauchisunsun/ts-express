import { UserId } from "../../src/domain/UserId";
import { InMemoryUserRepository } from "../../src/repository/user/InMemoryUserRepository";
import { User } from "../../src/domain/User";
import { UserNotFoundError } from "../../src/repository/user/UserNotFoundError";

describe("InMemoryUserRepositoryのテスト", () => {
  it("Saveのテスト", async () => {
    const user = new User(new UserId("1234"), "kotauchisunsun");

    const repository = new InMemoryUserRepository();
    expect(async () => {
      await repository.save(user);
    }).not.toThrow();
  });

  it("Findのテスト", async () => {
    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repository = new InMemoryUserRepository();
    await repository.save(user);
    const savedUser = await repository.find(new UserId("1234"));
    expect(savedUser.id.equals(user.id)).toBeTruthy();
    expect(savedUser.userName).toBe(user.userName);
  });

  it("Findの異常系のテスト", async () => {
    const repository = new InMemoryUserRepository();
    try {
      await repository.find(new UserId("1234"));
      fail();
    } catch (e) {
      expect(e.name).toBe("UserNotFoundError");
    }
  });

  it("Saveの異常系のテスト", async () => {
    const user = new User(new UserId("1234"), "kotauchisunsun");
    const repository = new InMemoryUserRepository();
    await repository.save(user);

    try {
      await repository.save(user);
    } catch (e) {
      expect(e.name).toBe("UserDuplicatedError");
    }
  });
});
