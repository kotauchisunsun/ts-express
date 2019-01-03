import * as express from "express";
import {
  ReadUserUseCase,
  ReadUserUseCaseInput
} from "./domain/use_case/ReadUserUseCase";
import { InMemoryUserRepository } from "./repository/user/InMemoryUserRepository";

export function makeApp(): express.Application {
  const repository = new InMemoryUserRepository();
  const useCase = new ReadUserUseCase(repository);

  return makeApp2(useCase);
}

export function makeApp2(useCase: ReadUserUseCase): express.Application {
  const app: express.Application = express();

  app.get(
    "/users/:id",
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const userId = req.params.id;
      const input = new ReadUserUseCaseInput(userId);
      const result = useCase.run(input);
      result
        .then(output => {
          const data = {
            name: output.name
          };
          res.json(data);
          res.end();
        })
        .catch(e => {
          res.status(400);
          res.end();
        });
    }
  );

  app.post(
    "/users/",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.write("Hello");
      res.end();
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
