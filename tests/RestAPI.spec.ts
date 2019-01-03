import * as supertest from "supertest";
import { makeApp, makeApp2 } from "../src/makeApp";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput,
  ReadUserUseCaseOuput
} from "../src/domain/use_case/ReadUserUseCase";
import { UserNotFoundError } from "../src/repository/user/UserNotFoundError";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "../src/domain/use_case/CreateUserUseCase";
import { UserDuplicatedError } from "../src/repository/user/UserDuplicatedError";

function makeReadUserUseCaseMock(): ReadUserUseCase {
  const mockClass = jest.fn<ReadUserUseCase>();
  return new mockClass();
}

function makeCreateUserUseCaseMock(): CreateUserUseCase {
  const mockClass = jest.fn<CreateUserUseCase>();
  return new mockClass();
}

describe("GET /users/:id", () => {
  it("正常系のテスト", async () => {
    const Mock = jest.fn<ReadUserUseCase>(() => ({
      run: async (
        input: ReadUserUseCaseInput
      ): Promise<ReadUserUseCaseOuput> => {
        return new ReadUserUseCaseOuput("kotauchisunsun");
      }
    }));
    const readUserUseCaseMock = new Mock();
    const createUserUseCaseMock = makeCreateUserUseCaseMock();

    const request = supertest(
      makeApp2(readUserUseCaseMock, createUserUseCaseMock)
    );
    const response = await request.get("/users/1234");
    expect(response.status).toBe(200);

    const data = JSON.parse(response.text);
    expect(data).toEqual({ name: "kotauchisunsun" });
  });

  it("異常系のテスト", async () => {
    const Mock = jest.fn<ReadUserUseCase>(() => ({
      run: async (
        input: ReadUserUseCaseInput
      ): Promise<ReadUserUseCaseOuput> => {
        throw new UserNotFoundError();
      }
    }));
    const readUserUseCaseMock = new Mock();
    const createUserUseCaseMock = makeCreateUserUseCaseMock();

    const request = supertest(
      makeApp2(readUserUseCaseMock, createUserUseCaseMock)
    );
    const response = await request.get("/users/1234");
    expect(response.status).toBe(400);
  });
});

describe("POST /users", () => {
  it("正常系のテスト", async () => {
    const name = "kotauchisunsun";

    const Mock = jest.fn<CreateUserUseCase>(() => ({
      run: async (input: CreateUserUseCaseInput): Promise<void> => {
        expect(input.name).toBe(name);
      }
    }));

    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const createUserUseCaseMock = new Mock();

    const request = supertest(
      makeApp2(readUserUseCaseMock, createUserUseCaseMock)
    );
    const response = await request.post("/users").send({ name: name });
    expect(response.status).toBe(200);
  });

  it("異常系のテスト", async () => {
    const name = "kotauchisunsun";

    const Mock = jest.fn<CreateUserUseCase>(() => ({
      run: async (input: CreateUserUseCaseInput): Promise<void> => {
        throw new UserDuplicatedError();
      }
    }));

    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const createUserUseCaseMock = new Mock();

    const request = supertest(
      makeApp2(readUserUseCaseMock, createUserUseCaseMock)
    );
    const response = await request.post("/users").send({ name: name });
    expect(response.status).toBe(400);
  });
});

describe("Rest APIのテスト", () => {
  it("PUT /users", async () => {
    const request = supertest(makeApp());
    const response = await request
      .put("/users/:id")
      .send({ name: "kotauchisunsun" });
    expect(response.status).toBe(200);
  });

  it("DELETE /users/:id", async () => {
    const request = supertest(makeApp());
    const response = await request.delete("/users/:id");
    expect(response.status).toBe(200);
  });
});
