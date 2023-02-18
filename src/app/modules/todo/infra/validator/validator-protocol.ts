/* istanbul ignore file */

import { ValidatorResponse } from "./validator-response";

export abstract class Validator {
  validate(object: any): ValidatorResponse {
    return;
  };
}
