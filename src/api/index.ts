import axios from 'axios';
import type {
  EmptyDataResponse,
  GoogleRequest,
  LoginCodeRequest,
  LoginEmailRequest,
  RegisterCodeResponse,
  RegisterEmailRequest,
  SessionResponse,
} from '../types/api';

const api = axios.create({
  baseURL: 'http://localhost:8080/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerAnonymous = async (): Promise<RegisterCodeResponse> => {
  const res = await api.post<RegisterCodeResponse>('/user/register/code', {});
  return res.data;
};

export const registerWithEmail = async (
  payload: RegisterEmailRequest,
): Promise<EmptyDataResponse> => {
  const res = await api.post<EmptyDataResponse>(
    '/user/register/email',
    payload,
  );
  return res.data;
};

export const loginWithEmail = async (
  payload: LoginEmailRequest,
): Promise<SessionResponse> => {
  const res = await api.post<SessionResponse>('/auth/login/email', payload);
  return res.data;
};

export const loginWithCode = async (
  payload: LoginCodeRequest,
): Promise<SessionResponse> => {
  const res = await api.post<SessionResponse>('/auth/login/code', payload);
  return res.data;
};

export const loginWithGoogle = async (
  payload: GoogleRequest,
): Promise<SessionResponse> => {
  const res = await api.post<SessionResponse>(
    '/user/register/google_account',
    payload,
  );
  return res.data;
};
