/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { z } from 'zod';
import { TodoController } from './app/controllers/todo.controller';
import { TodoService } from './app/services/todo.service';
import { Validator } from './infra/validator/validator-protocol';
import { ZodCreateTodoValidator } from './infra/validator/zod/create-todo.validator';

const validatorShape = z.object({
  name: z.string({
    required_error: 'O nome da tarefa é obrigatório',
    invalid_type_error: 'O nome deve ser uma string',
  }),
  description: z.string({
    invalid_type_error: 'A descrição da tarefa deve ser uma string',
  }).optional(),
});

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
      useValue: validatorShape,
    },
  ],
})
export class TodoModule {}
