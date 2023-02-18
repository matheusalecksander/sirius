import { z } from "zod";
import { ZodCreateTodoValidator } from "./create-todo.validator"

function makeSut() {
  const zodShape = z.object({
    name: z.string(),
    description: z.string().optional(),
  });

  const sut = new ZodCreateTodoValidator(zodShape);

  const validName = {
    name: "Teste",
  }

  const validNameAndDescription = {
    name: "Teste",
    description: "Teste",
  }

  const withoutName = {
    name: undefined,
    description: "Teste"
  }

  const invalidNameAndDescription = {
    name: undefined,
    description: undefined,
  }

  return {
    sut,
    validName,
    validNameAndDescription,
    withoutName,
    invalidNameAndDescription,
  }
}

describe("Todo Validator", () => {
  it("Should return isValid = true and errors with zero records when only name is provided", () => {
    const { sut, validName } = makeSut();

    const { errors, isValid } = sut.validate(validName)

    expect(errors.length).toBe(0);
    expect(isValid).toBe(true);
  });

  it("Should return isValid = true erros with zero records when both params is provided", () => {
    const { sut, validNameAndDescription } = makeSut();

    const { errors, isValid } = sut.validate(validNameAndDescription)

    expect(errors.length).toBe(0);
    expect(isValid).toBe(true);
  });

  it("Should return isValid = false and errors with one record when only description is provided", () => {
    const { sut, withoutName } = makeSut();

    const { errors, isValid } = sut.validate(withoutName);

    expect(errors.length).toBe(1);
    expect(isValid).toBe(false);
  });

  it("Should return isValid = false and errors with one record when params is not provided", () => {
    const { sut, invalidNameAndDescription } = makeSut();

    const { errors, isValid } = sut.validate(invalidNameAndDescription);

    expect(errors.length).toBe(1);
    expect(isValid).toBe(false);
  });
});
