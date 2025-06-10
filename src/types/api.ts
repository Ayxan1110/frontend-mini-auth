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

export interface GoogleRequest {
  code: string;
  redirect_uri: string;
}

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

export interface ValidationError {
  error: {
    code: 'VALIDATION_ERROR';
    message: string;
    details: Array<{
      field: string;
      message: string;
    }>;
  };
}

export interface AuthError {
  error: {
    code: 'AUTHENTICATION_ERROR' | 'WRONG_PIN_CODE';
    message: string;
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
