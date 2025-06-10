// -------- Requests --------
export interface RegisterEmailRequest {
  email: string;
  lang: string;
}

export interface LoginEmailRequest {
  email: string;
  pincode: number;
}

export interface LoginCodeRequest {
  login_code: string;
}

// -------- Responses --------
export interface RegisterCodeResponse {
  data: {
    login_code: string;
  };
}

export interface SessionResponse {
  data: {
    session: string;
  };
}

export interface EmptyDataResponse {
  data: [];
}

// -------- Errors --------
export interface ValidationError {
  error: {
    code: string;
    message: string;
    details: Array<{ field: string; message: string }>;
  };
}

export interface AuthError {
  error: {
    code: string;
    message: string;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
