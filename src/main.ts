import * as express from "express";

const app: express.Application = express();

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.write("Hello");
    res.end();
  }
);

app.listen(3000);
