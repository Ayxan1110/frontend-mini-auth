import type React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginWithEmail, registerWithEmail } from '../../api';
import { useAuth } from '../../context/auth-context';
import { useToast } from '../../context/toast-context';
import { useCountdown } from '../../hooks/useCountdown';
import { isPinCode } from '../../utils/validators';

const EmailAuthPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
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
    setError('');

    if (!isPinCode(pin)) {
      setError('PIN must be 6 numeric digits');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithEmail({ email, pincode: Number(pin) });
      login(res.data.session);
      showToast('Login successful!', 'success');
      navigate('/dashboard');
    } catch {
      setError('Invalid PIN or server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    try {
      await registerWithEmail({ email, lang: 'en' });
      start();
      showToast('Verification code resent', 'success');
    } catch {
      showToast('Failed to resend PIN', 'error');
    }
  };

  if (!email) {
    return <p>No email provided. Please go back and log in again.</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Email Verification</h2>
      <p>
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
          style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying…' : 'Verify'}
        </button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        {countdown > 0 ? (
          <p>Resend available in {countdown}s</p>
        ) : (
          <button onClick={handleResend}>Resend Code</button>
        )}
      </div>

      {error && (
        <output
          id="feedback"
          aria-live="polite"
          style={{ color: 'red', marginTop: '0.5rem', display: 'block' }}
        >
          {error}
        </output>
      )}
    </div>
  );
};

export default EmailAuthPage;
