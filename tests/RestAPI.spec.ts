/* tslint:disable:no-duplicate-string */

import {
  DeleteUserUseCase,
  DeleteUserUseCaseInput
} from "src/domain/use_case/DeleteUserUseCase";
import * as supertest from "supertest";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "../src/domain/use_case/CreateUserUseCase";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput,
  ReadUserUseCaseOuput
} from "../src/domain/use_case/ReadUserUseCase";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput
} from "../src/domain/use_case/UpdateUserUseCase";
import { makeApp } from "../src/makeApp";
import { UserDuplicatedError } from "../src/repository/user/UserDuplicatedError";
import { UserNotFoundError } from "../src/repository/user/UserNotFoundError";

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

function makeDeleteUserUseCaseMock(): DeleteUserUseCase {
  const mockClass = jest.fn<DeleteUserUseCase>();
  return new mockClass();
}

describe("GET /users/:id", () => {
  function makeDummyApp(
    readUserUseCaseMock: ReadUserUseCase
  ): supertest.SuperTest<supertest.Test> {
    const createUserUseCaseMock = makeCreateUserUseCaseMock();
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();
    const deleteUserUseCaseMock = makeDeleteUserUseCaseMock();

    return supertest(
      makeApp(
        createUserUseCaseMock,
        readUserUseCaseMock,
        updateUserUseCaseMock,
        deleteUserUseCaseMock
      )
    );
  }

  it("正常系のテスト", async () => {
    const Mock = jest.fn<ReadUserUseCase>(() => ({
      run: async (
        input: ReadUserUseCaseInput
      ): Promise<ReadUserUseCaseOuput> => {
        return new ReadUserUseCaseOuput("kotauchisunsun");
      }
    }));

    const request = makeDummyApp(new Mock());
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

    const request = makeDummyApp(new Mock());
    const response = await request.get("/users/1234");
    expect(response.status).toBe(400);
  });
});

describe("POST /users", () => {
  function makeDummyApp(
    createUserUseCaseMock: CreateUserUseCase
  ): supertest.SuperTest<supertest.Test> {
    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();
    const deleteUserUseCaseMock = makeDeleteUserUseCaseMock();

    return supertest(
      makeApp(
        createUserUseCaseMock,
        readUserUseCaseMock,
        updateUserUseCaseMock,
        deleteUserUseCaseMock
      )
    );
  }

  it("正常系のテスト", async () => {
    const name = "kotauchisunsun";

    const Mock = jest.fn<CreateUserUseCase>(() => ({
      run: async (input: CreateUserUseCaseInput): Promise<void> => {
        expect(input.name).toBe(name);
      }
    }));

    const request = makeDummyApp(new Mock());
    const response = await request.post("/users").send({ name });
    expect(response.status).toBe(200);
  });

  it("異常系のテスト", async () => {
    const name = "kotauchisunsun";

    const Mock = jest.fn<CreateUserUseCase>(() => ({
      run: async (input: CreateUserUseCaseInput): Promise<void> => {
        throw new UserDuplicatedError();
      }
    }));

    const request = makeDummyApp(new Mock());
    const response = await request.post("/users").send({ name });
    expect(response.status).toBe(400);
  });
});

describe("PUT /users", () => {
  function makeDummyApp(
    updateUserUseCaseMock: UpdateUserUseCase
  ): supertest.SuperTest<supertest.Test> {
    const createUserUseCaseMock = makeCreateUserUseCaseMock();
    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const deleteUserUseCaseMock = makeDeleteUserUseCaseMock();

    return supertest(
      makeApp(
        createUserUseCaseMock,
        readUserUseCaseMock,
        updateUserUseCaseMock,
        deleteUserUseCaseMock
      )
    );
  }

  it("正常系のテスト", async () => {
    const Mock = jest.fn<UpdateUserUseCase>(() => ({
      run: async (input: UpdateUserUseCaseInput): Promise<void> => {
        const a = 1;
      }
    }));

    const request = makeDummyApp(new Mock());
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

    const request = makeDummyApp(new Mock());
    const response = await request
      .put("/users/1234")
      .send({ name: "kotauchisunsun" });
    expect(response.status).toBe(400);
  });
});

describe("DELETE /users/:id", () => {
  it("正常系のテスト", async () => {
    const Mock = jest.fn<DeleteUserUseCase>(() => ({
      run: async (input: DeleteUserUseCaseInput): Promise<boolean> => {
        return false;
      }
    }));

    const createUserUseCaseMock = makeCreateUserUseCaseMock();
    const readUserUseCaseMock = makeReadUserUseCaseMock();
    const updateUserUseCaseMock = makeUpdateUserUseCaseMock();
    const deleteUserUseCase = new Mock();

    const request = supertest(
      makeApp(
        createUserUseCaseMock,
        readUserUseCaseMock,
        updateUserUseCaseMock,
        deleteUserUseCase
      )
    );
    const response = await request.delete("/users/:id");
    expect(response.status).toBe(200);
  });
});
