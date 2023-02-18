import { Injectable } from "@nestjs/common";
import { ICreateTodo } from "../../domain/entities/interfaces/create-todo";
import { Validator } from "../../infra/validator/validator-protocol";

@Injectable()
export class TodoService {
  constructor(private readonly validator: Validator) {}

  async createTodo(todos: ICreateTodo) {
    const { success, errors } = this.validator.validate(todos);
    
    return {
      success,
      errors,
    }
  }
}
