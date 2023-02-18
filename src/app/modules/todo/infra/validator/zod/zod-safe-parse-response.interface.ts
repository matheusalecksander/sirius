export interface ZodSafeParseResponse<S, T> {
  success: boolean;
  data?: S;
  error?: T;
}
