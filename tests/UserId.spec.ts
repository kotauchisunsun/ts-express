import { UserId } from "../src/domain/UserId";
import { InvalidUserIdError } from "../src/domain/InvalidUserIdError";

describe("UserIdのテスト", () => {
  it("正常系", () => {
    expect(() => {
      const userId = new UserId("1234");
    }).not.toThrow();
  });

  it("異常系", () => {
    expect(() => {
      const userId = new UserId("abcd");
    }).toThrowError(InvalidUserIdError);
  });

  it("値のチェック", () => {
    const value = "1234";
    const userId = new UserId(value);
    expect(userId.value).toBe(value);
  });

  describe("同値性のチェック", () => {
    it("一致の場合", () => {
      const value = "1234";
      const userId1 = new UserId(value);
      const userId2 = new UserId(value);
      expect(userId1.equals(userId2)).toBeTruthy();
    });

    it("不一致の場合", () => {
      const value1 = "1234";
      const userId1 = new UserId(value1);

      const value2 = "2345";
      const userId2 = new UserId(value2);
      expect(userId1.equals(userId2)).toBeFalsy();
    });
  });
});
