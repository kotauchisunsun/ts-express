/* tslint:disable:no-duplicate-string */

import * as express from "express";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput
} from "./domain/use_case/CreateUserUseCase";
import {
  DeleteUserUseCase,
  DeleteUserUseCaseInput
} from "./domain/use_case/DeleteUserUseCase";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput
} from "./domain/use_case/ReadUserUseCase";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput
} from "./domain/use_case/UpdateUserUseCase";
import { UserService } from "./domain/UserService";
import { InMemoryUserRepository } from "./repository/user/InMemoryUserRepository";

export function makeApp(
  createUserUseCase: CreateUserUseCase,
  readUserUseCase: ReadUserUseCase,
  updateUserUseCase: UpdateUserUseCase,
  deleteUserUseCase: DeleteUserUseCase
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
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const userId = req.params.id;
      const name = req.body.name;
      const input = new UpdateUserUseCaseInput(userId, name);
      try {
        await updateUserUseCase.run(input);
        res.end();
      } catch (e) {
        res.status(400);
        res.end();
      }
    }
  );

  app.delete(
    "/users/:id",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const userId = req.params.id;
      const input = new DeleteUserUseCaseInput(userId);
      await deleteUserUseCase.run(input);
      res.end();
    }
  );

  return app;
}
