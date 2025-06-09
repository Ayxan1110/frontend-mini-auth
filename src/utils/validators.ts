/**
 * Validates if a given string is a standard email.
 */
export const isEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/**
 * Validates if a string is exactly a 16-digit anonymous login code.
 */
export const isLoginCode = (value: string): boolean =>
  /^\d{16}$/.test(value.trim());

/**
 * Validates if a string is a valid 6-digit PIN code.
 */
export const isPinCode = (value: string): boolean =>
  /^\d{6}$/.test(value.trim());
