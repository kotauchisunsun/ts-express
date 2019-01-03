import * as express from "express";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput
} from "./domain/use_case/ReadUserUseCase";
import { InMemoryUserRepository } from "./repository/user/InMemoryUserRepository";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "./domain/use_case/CreateUserUseCase";

export function makeApp(): express.Application {
  const repository = new InMemoryUserRepository();
  const readUserUseCase = new ReadUserUseCase(repository);
  const createUserUseCase = new CreateUserUseCase(repository);

  return makeApp2(readUserUseCase, createUserUseCase);
}

export function makeApp2(
  readUserUseCase: ReadUserUseCase,
  createUserUseCase: CreateUserUseCase
): express.Application {
  const app: express.Application = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get(
    "/users/:id",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const userId = req.params.id;
      const input = new ReadUserUseCaseInput(userId);
      try {
        const output = await readUserUseCase.run(input);
        const data = {
          name: output.name
        };
        res.json(data);
        res.end();
      } catch (e) {
        res.status(400);
        res.end();
      }
    }
  );

  app.post(
    "/users/",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const name = req.body.name;
      const input = new CreateUserUseCaseInput(name);
      try {
        await createUserUseCase.run(input);
        res.end();
      } catch (e) {
        res.status(400);
        res.end();
      }
    }
  );

  app.put(
    "/users/:id",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.write("Hello");
      res.end();
    }
  );

  app.delete(
    "/users/:id",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.write("Hello");
      res.end();
    }
  );

  return app;
}
