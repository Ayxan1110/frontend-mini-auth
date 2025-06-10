export const MESSAGES = {
  // Auth Success
  LOGIN_SUCCESS: 'Logged in successfully!',
  GOOGLE_LOGIN_SUCCESS: 'Logged in with Google!',
  PIN_SENT: 'Verification code sent to your email',
  PIN_RESENT: 'Verification code resent',

  // Auth Errors
  LOGIN_FAILED: 'Login failed. Please try again.',
  GOOGLE_LOGIN_FAILED: 'Google login failed',
  INVALID_INPUT: 'Enter a valid email or 16-digit code',
  PIN_INVALID_FORMAT: 'PIN must be 6 numeric digits',
  PIN_WRONG: 'Invalid PIN or server error.',
  EMAIL_REQUIRED: 'Input is required',
  RESEND_TOO_EARLY: (seconds: number) =>
    `Please wait ${seconds} seconds before resending.`,
  COPY_FAILED: 'Copy failed. Try again.',

  // Success UX
  COPY_SUCCESS: 'Copied!',
  SESSION_RESTORED: 'Session restored successfully',

  // Validation
  EMAIL_FORMAT_ERROR: 'Email address format is incorrect',
};
