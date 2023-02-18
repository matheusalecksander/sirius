import { Repository } from '../../infra/repository/repository-protocol';
import { Validator } from '../../infra/validator/validator-protocol';
import { TodoService } from './todo.service';

class ValidatorMock implements Validator {
  validate(object: any): any {
    return {
      isValid: true,
      errors: [],
    };
  }
}

class ValidatorWithError implements Validator {
  validate(object: any): any {
    return {
      isValid: false,
      errors: ['Failed'],
    };
  }
}

class RepositoryMock implements Repository {
  public items: any[] = [];

  async create<T>(data: T): Promise<boolean> {
    this.items.push(data);

    return true;
  }
}

class RepositoryWithError implements Repository {
  async create<T>(data: T): Promise<boolean> {
    return false;
  }
}

function makeSut() {
  const validator = new ValidatorMock();
  const validatorWithError = new ValidatorWithError();

  const repository = new RepositoryMock();
  const repositoryWithError = new RepositoryWithError();

  const sut = new TodoService(validator, repository);
  const sutWithValidatorError = new TodoService(validatorWithError, repository);
  const sutWithRepositoryError = new TodoService(
    validator,
    repositoryWithError,
  );

  return {
    sut,
    repository,
    sutWithValidatorError,
    sutWithRepositoryError,
  };
}

describe('TodoService', () => {
  it('Should create an record on database', async () => {
    const { sut, repository } = makeSut();

    const result = await sut.createTodo({
      name: 'Teste',
    });

    expect(result).toBeTruthy();
    expect(repository.items[0]).toHaveProperty('id');
    expect(repository.items[0].isComplete).toBe(false);
  });

  it('Should throw an error if validation fails', () => {
    const { sutWithValidatorError } = makeSut();

    const result = sutWithValidatorError.createTodo({ name: undefined });
    expect(result).rejects.toThrow();
  });

  it('Should throw an error if repository fails', () => {
    const { sutWithRepositoryError } = makeSut();

    const result = sutWithRepositoryError.createTodo({ name: 'Teste' });
    expect(result).rejects.toThrow();
  });
});
