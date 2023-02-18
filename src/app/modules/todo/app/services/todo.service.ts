import { BadRequestException, Injectable } from "@nestjs/common";
import { ICreateTodo } from "../../domain/entities/interfaces/create-todo";
import { Validator } from "../../infra/validator/validator-protocol";

@Injectable()
export class TodoService {
  constructor(private readonly validator: Validator) {}

  async createTodo(todo: ICreateTodo) {
    const { isValid, errors } = this.validator.validate(todo);

    if (!isValid) {
      throw new BadRequestException({
        errors
      });
    }

    return todo
  }
}
