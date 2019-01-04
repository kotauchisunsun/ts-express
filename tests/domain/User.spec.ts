import { User } from "../../src/domain/User";
import { UserId } from "../../src/domain/UserId";

describe("Userのテスト", () => {
  it("changeNameのテスト", () => {
    const userId = new UserId("1234");
    const user = new User(userId, "kotauchisunsun");
    user.changeUserName("kotauchi");
    expect(user.userName).toBe("kotauchi");
  });
});
