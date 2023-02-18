import { Inject } from '@nestjs/common';
import { AnyZodObject, z, ZodError } from 'zod';
import { ICreateTodo } from '../../../domain/entities/interfaces/create-todo';
import { ValidatorResponse } from '../validator-response';
import { Validator } from '../validator-protocol';
import { ZodSafeParseResponse } from './zod-safe-parse-response.interface';

export interface ZodCreateTodoProps extends AnyZodObject {}

export class ZodCreateTodoValidator implements Validator {
  private erros = [];
  private success = [];

  constructor(
    @Inject('ZodCreateTodoProps') private readonly shape: ZodCreateTodoProps,
  ) {}

  validate(object: ICreateTodo): ValidatorResponse {
    this.clear();
    const isValid = this.shape.safeParse(object) as ZodSafeParseResponse<
      any,
      ZodError
    >;

    if (!isValid.success) {
      isValid.error.issues.forEach((issue, index) => {
        this.erros.push({ message: issue.message, index, object: { ...object } });
      });
    }

    if (isValid.success) {
      this.success.push(isValid.data);
    }

    return {
      success: this.success,
      errors: this.erros,
    };
  }

  private clear() {
    this.erros = [];
    this.success = [];
  }
}
