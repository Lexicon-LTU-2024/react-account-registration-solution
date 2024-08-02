// These functions are located here since they don't neew acces to anything in React. They are just plain functions that accepts arguments and returns something.

export function isPasswordValid(password: string): boolean {
  return password.length >= 8;
}

export function isConfirmPasswordValid(confirmPassword: string, password: string): boolean {
  return confirmPassword === password;
}
