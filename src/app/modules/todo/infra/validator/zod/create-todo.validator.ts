import { Inject } from '@nestjs/common';
import { AnyZodObject, z, ZodError } from 'zod';
import { ICreateTodo } from '../../../domain/entities/interfaces/create-todo';
import { ValidatorResponse } from '../validator-response';
import { Validator } from '../validator-protocol';
import { ZodSafeParseResponse } from './zod-safe-parse-response.interface';

export interface ZodCreateTodoProps extends AnyZodObject {}

export class ZodCreateTodoValidator implements Validator {
  private errors = [];
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
      isValid.error.errors.forEach((error) => {
        this.errors.push({ message: error.message, data: { ...object } });
      });
    }

    if (isValid.success) {
      this.success.push(isValid.data);
    }

    return {
      success: this.success,
      errors: this.errors,
    };
  }

  private clear() {
    this.errors = [];
    this.success = [];
  }
}
