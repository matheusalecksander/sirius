/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TodoController } from './app/controllers/todo.controller';
import { TodoService } from './app/services/todo.service';
import { Validator } from './infra/validator/validator-protocol';
import { ZodCreateTodoValidator } from './infra/validator/zod/create-todo.validator';
import { createTodoShape } from './infra/validator/zod/shapes/create-todo-shape';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: Validator,
      useClass: ZodCreateTodoValidator,
    },
    {
      provide: 'ZodCreateTodoProps',
      useValue: createTodoShape,
    },
  ],
})
export class TodoModule {}
