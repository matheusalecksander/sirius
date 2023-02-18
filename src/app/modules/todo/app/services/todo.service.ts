import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { randomUUID } from "crypto";
import { ICreateTodo } from "../../domain/entities/interfaces/create-todo";
import { ITodo } from "../../domain/entities/interfaces/todo.interface";
import { Repository } from "../../infra/repository/repository-protocol";
import { Validator } from "../../infra/validator/validator-protocol";

@Injectable()
export class TodoService {
  constructor(
    private readonly validator: Validator,
    private readonly repository: Repository
  ) {}

  async createTodo(todo: ICreateTodo) {
    const { isValid, errors } = this.validator.validate(todo);

    if (!isValid) {
      throw new BadRequestException({
        errors
      });
    }

    const parsedTodo: ITodo = {
      name: todo.name,
      description: todo.description,
      isComplete: false,
      id: randomUUID(),
    }

    const created = await this.repository.create<ITodo>(parsedTodo);

    if (!created) {
      throw new InternalServerErrorException("Ocorreu um erro ao salvar o seu ToDo");
    }

    return parsedTodo;
  }
}
