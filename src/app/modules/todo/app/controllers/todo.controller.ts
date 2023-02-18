import { Body, Controller, Post } from "@nestjs/common";
import { ICreateTodo } from "../../domain/entities/interfaces/create-todo";
import { TodoService } from "../services/todo.service";

@Controller()
export class TodoController {
  constructor(private readonly service: TodoService) {}
  @Post('/')
  async createTodo(@Body() body: ICreateTodo) {
    return this.service.createTodo(body);
  }
}
