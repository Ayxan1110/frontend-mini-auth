import './EmailAuthPage.css';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginWithEmail, registerWithEmail } from '../../api';
import { MESSAGES } from '../../constants/messages';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../context/toast-context';
import { useCountdown } from '../../hooks/useCountdown';
import { isPinCode } from '../../utils/validators';

const EmailAuthPage = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const { countdown, start } = useCountdown(60);

  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const email = location.state?.email;

  useEffect(() => {
    start();
  }, [start]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPinCode(pin)) {
      showToast(MESSAGES.PIN_INVALID_FORMAT, 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithEmail({ email, pincode: Number(pin) });
      login(res.data.session);
      showToast(MESSAGES.LOGIN_SUCCESS, 'success');
      navigate('/dashboard');
    } catch {
      showToast(MESSAGES.PIN_WRONG, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    try {
      await registerWithEmail({ email, lang: 'en' });
      start();
      showToast(MESSAGES.PIN_RESENT, 'success');
    } catch {
      showToast(MESSAGES.LOGIN_FAILED, 'error');
    }
  };

  if (!email) {
    return (
      <p style={{ padding: '40px' }}>
        No email provided. Please go back and log in again.
      </p>
    );
  }

  return (
    <div className="email-auth-container">
      <div className="email-auth-box">
        <h1 className="email-auth-title">Email Verification</h1>
        <p className="email-auth-text">
          Enter the 6-digit PIN sent to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            placeholder="123456"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={6}
            disabled={loading}
            className="email-auth-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="email-auth-button verify"
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Verifying…' : 'Verify'}
          </button>
        </form>

        <button
          onClick={handleResend}
          disabled={countdown > 0 || loading}
          className={`email-auth-button ${
            countdown > 0 ? 'disabled' : 'resend'
          }`}
        >
          {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
        </button>
      </div>
    </div>
  );
};

export default EmailAuthPage;
