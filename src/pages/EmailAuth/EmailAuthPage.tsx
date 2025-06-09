import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isPinCode } from '../../utils/validators';
import { loginWithEmail } from '../../api';
import type { LoginEmailRequest } from '../../types/api';

const EmailAuthPage = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPinCode(pin)) {
      setError('PIN must be 6 numeric digits');
      return;
    }

    setLoading(true);
    try {
      const payload: LoginEmailRequest = {
        email,
        pincode: Number(pin),
      };
      const res = await loginWithEmail(payload);
      alert(`Logged in! Session: ${res.data.session}`);
      navigate('/dashboard');
    } catch (err) {
      console.error('PIN verification failed:', err);
      setError('Invalid PIN or server error.');
    } finally {
      setLoading(false);
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

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EmailAuthPage;
