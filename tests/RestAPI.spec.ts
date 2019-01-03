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
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput
} from "../src/domain/use_case/UpdateUserUseCase";

function makeReadUserUseCaseMock(): ReadUserUseCase {
  const mockClass = jest.fn<ReadUserUseCase>();
  return new mockClass();
}

function makeCreateUserUseCaseMock(): CreateUserUseCase {
  const mockClass = jest.fn<CreateUserUseCase>();
  return new mockClass();
}

function makeUpdateUserUseCaseMock(): UpdateUserUseCase {
  const mockClass = jest.fn<UpdateUserUseCase>();
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
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
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
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
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
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
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
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
    );
    const response = await request.post("/users").send({ name: name });
    expect(response.status).toBe(400);
  });
});

describe("PUT /users", () => {
  it("正常系のテスト", async () => {
    const Mock = jest.fn<UpdateUserUseCase>(() => ({
      run: async (input: UpdateUserUseCaseInput): Promise<void> => {
        const a = 1;
      }
    }));

    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const createUserUseCaseMock = makeCreateUserUseCaseMock();
    const updateUserUseCaseMock = new Mock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
    );
    const response = await request
      .put("/users/1234")
      .send({ name: "kotauchisunsun" });
    expect(response.status).toBe(200);
  });

  it("異常系のテスト", async () => {
    const Mock = jest.fn<UpdateUserUseCase>(() => ({
      run: async (input: UpdateUserUseCaseInput): Promise<void> => {
        throw new UserNotFoundError();
      }
    }));

    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const createUserUseCaseMock = makeCreateUserUseCaseMock();
    const updateUserUseCaseMock = new Mock();

    const request = supertest(
      makeApp2(
        readUserUseCaseMock,
        createUserUseCaseMock,
        updateUserUseCaseMock
      )
    );
    const response = await request
      .put("/users/1234")
      .send({ name: "kotauchisunsun" });
    expect(response.status).toBe(400);
  });
});

describe("Rest APIのテスト", () => {
  it("DELETE /users/:id", async () => {
    const request = supertest(makeApp());
    const response = await request.delete("/users/:id");
    expect(response.status).toBe(200);
  });
});
