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

  const invalidNameAndDescription = {}

  return {
    sut,
    validName,
    validNameAndDescription,
    withoutName,
    invalidNameAndDescription,
  }
}

describe("Todo Validator", () => {
  it("Should return success with one record and erros with zero records when only name is provided", () => {
    const { sut, validName } = makeSut();

    const { errors, success } = sut.validate(validName)

    expect(errors.length).toBe(0);
    expect(success.length).toBe(1);
  });

  it("Should return success with one record and erros with zero records when both params is provided", () => {
    const { sut, validNameAndDescription } = makeSut();

    const { errors, success } = sut.validate(validNameAndDescription)

    expect(errors.length).toBe(0);
    expect(success.length).toBe(1);
  });

  it("Should return succes with zero records and erros with one record when name only description is provided", () => {
    const { sut, withoutName } = makeSut();

    const { errors, success } = sut.validate(withoutName);

    expect(errors.length).toBe(1);
    expect(errors[0].message).toBe("Required");
    expect(success.length).toBe(0);
  });
});
