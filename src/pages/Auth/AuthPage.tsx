import './AuthPage.css';
import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithCode, loginWithGoogle, registerWithEmail } from '../../api';
import { MESSAGES } from '../../constants/messages';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../context/toast-context';
import { useCountdown } from '../../hooks/useCountdown';
import { isLoginCode } from '../../utils/validators';

const AuthPage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { countdown, start } = useCountdown(60);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  type APIError = {
    error?: {
      code?: string;
      message?: string;
      details?: { message?: string }[];
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      showToast(MESSAGES.EMAIL_REQUIRED, 'error');
      return;
    }

    setLoading(true);
    try {
      if (input.includes('@')) {
        if (countdown > 0) {
          showToast(MESSAGES.RESEND_TOO_EARLY(countdown), 'error');
          return;
        }
        await registerWithEmail({ email: input, lang: 'en' });
        start();
        navigate('/auth/email', { state: { email: input } });
      } else if (isLoginCode(input)) {
        const data = await loginWithCode({ login_code: input });
        login(data.data.session);
        showToast(MESSAGES.LOGIN_SUCCESS, 'success');
      } else {
        showToast(MESSAGES.INVALID_INPUT, 'error');
      }
    } catch (err: unknown) {
      const typedError = err as APIError;
      if (typedError?.error?.code === 'VALIDATION_ERROR') {
        showToast(typedError.error.message || MESSAGES.LOGIN_FAILED, 'error');
      } else {
        showToast(MESSAGES.LOGIN_FAILED, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const payload = {
        code: 'sample-auth-code',
        redirect_uri: 'http://localhost:5173/auth/callback/google',
      };

      const response = await loginWithGoogle(payload);
      login(response.data.session);
      showToast(MESSAGES.GOOGLE_LOGIN_SUCCESS, 'success');
      navigate('/dashboard');
    } catch {
      showToast(MESSAGES.GOOGLE_LOGIN_FAILED, 'error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign In</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or 16-digit code"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="auth-input"
            data-testid="auth-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="auth-button primary"
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading
              ? 'Please wait…'
              : countdown > 0
                ? `Resend in ${countdown}s`
                : 'Continue'}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="auth-button google"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
