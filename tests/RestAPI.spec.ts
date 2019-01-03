import * as supertest from "supertest";
import { makeApp, makeApp2 } from "../src/makeApp";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput,
  ReadUserUseCaseOuput
} from "../src/domain/use_case/ReadUserUseCase";

describe("Rest APIのテスト", () => {
  it("GET /users/:id", async () => {
    const Mock = jest.fn<ReadUserUseCase>(() => ({
      run: async (
        input: ReadUserUseCaseInput
      ): Promise<ReadUserUseCaseOuput> => {
        return new ReadUserUseCaseOuput("kotauchisunsun");
      }
    }));
    const mock = new Mock();

    const request = supertest(makeApp2(mock));
    const response = await request.get("/users/1234");
    expect(response.status).toBe(200);

    const data = JSON.parse(response.text);
    expect(data).toEqual({ name: "kotauchisunsun" });
  });

  it("POST /users", async () => {
    const request = supertest(makeApp());
    const response = await request
      .post("/users")
      .send({ name: "kotauchisusun" });
    expect(response.status).toBe(200);
  });

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
