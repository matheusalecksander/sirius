/* istanbul ignore file */

import { z } from "zod";

export const createTodoShape = z.object({
  name: z.string({
    required_error: 'O nome da tarefa é obrigatório',
    invalid_type_error: 'O nome da tarefa deve ser uma string',
  }),
  description: z.string({
    invalid_type_error: 'A descrição da tarefa deve ser uma string',
  }).optional(),
});
