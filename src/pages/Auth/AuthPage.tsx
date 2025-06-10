import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithCode, loginWithGoogle, registerWithEmail } from '../../api';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../context/toast-context';
import { useCountdown } from '../../hooks/useCountdown';
import { isEmail, isLoginCode } from '../../utils/validators';

const AuthPage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { countdown, start } = useCountdown(60);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      showToast('Input required', 'error');
      setError('Input is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEmail(input)) {
        if (countdown > 0) {
          showToast(
            `Please wait ${countdown} seconds before resending.`,
            'error',
          );
          return;
        }
        await registerWithEmail({ email: input, lang: 'en' });
        start();
        navigate('/auth/email', { state: { email: input } });
      } else if (isLoginCode(input)) {
        const data = await loginWithCode({ login_code: input });
        login(data.data.session);
        showToast('Logged in successfully!', 'success');
      } else {
        showToast('Enter a valid email or 16-digit code', 'error');
        setError('Invalid input');
      }
    } catch (err) {
      showToast('Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      login(response.data.session);
      navigate('/dashboard');
    } catch (error) {
      showToast('Google login failed', 'error');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-describedby="login-feedback">
        <input
          type="text"
          placeholder="Enter email or 16-digit code"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-invalid={!!error}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderColor: error ? 'red' : undefined,
          }}
          disabled={loading}
        />
        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading
            ? 'Please wait…'
            : countdown > 0
              ? `Resend in ${countdown}s`
              : 'Continue'}
        </button>
      </form>
      <button onClick={handleGoogleLogin} style={{ marginTop: '1rem' }}>
        Continue with Google
      </button>
      <output
        id="feedback"
        aria-live="polite"
        style={{ height: '1rem', marginTop: '0.5rem' }}
      >
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </output>
    </div>
  );
};

export default AuthPage;
