import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAnonymous } from '../../api';

const RegPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAnonymousRegister = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await registerAnonymous();
      const code = response.data.login_code;
      navigate('/reg/code', { state: { loginCode: code } });
    } catch (err) {
      console.error('Anonymous registration failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Register</h2>
      <button onClick={handleAnonymousRegister} disabled={loading}>
        {loading ? 'Registering…' : 'Anonymous Registration'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default RegPage;
