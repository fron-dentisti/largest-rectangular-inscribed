export class NotTypeError extends Error {
  constructor(typeName: string, varName: string, variable: unknown) {
    super(`"${varName}" is not a ${typeName}! ${typeof variable}`);
  }
}

export class NotAnArray extends NotTypeError {
  constructor(varName: string, variable: unknown) {
    super("array", varName, variable);
  }
}
