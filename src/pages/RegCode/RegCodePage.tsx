import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RegCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginCode = location.state?.loginCode;

  useEffect(() => {
    if (!loginCode) {
      navigate('/reg');
    }
  }, [loginCode, navigate]);

  if (!loginCode) {
    return <p style={{ padding: '1rem' }}>Redirecting...</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Anonymous Login Code</h2>
      <p
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
        }}
      >
        {loginCode}
      </p>
      <p>Save this code to log in later.</p>
    </div>
  );
};

export default RegCodePage;
