import { makeApp } from "./makeApp";
import { InMemoryUserRepository } from "./repository/user/InMemoryUserRepository";
import { CreateUserUseCase } from "./domain/use_case/CreateUserUseCase";
import { UserService } from "./domain/UserService";
import { ReadUserUseCase } from "./domain/use_case/ReadUserUseCase";
import { UpdateUserUseCase } from "./domain/use_case/UpdateUserUseCase";
import { DeleteUserUseCase } from "./domain/use_case/DeleteUserUseCase";

const repository = new InMemoryUserRepository();
const service = new UserService(repository);

const createUserUseCase = new CreateUserUseCase(repository, service);
const readUserUseCase = new ReadUserUseCase(repository);
const updateUserUseCase = new UpdateUserUseCase(repository, service);
const deleteUserUseCase = new DeleteUserUseCase(repository);

const app = makeApp(
  createUserUseCase,
  readUserUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

app.listen(3000);
