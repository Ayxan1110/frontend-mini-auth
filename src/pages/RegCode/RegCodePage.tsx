import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/toast-context';

const RegCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const loginCode = location.state?.loginCode;

  useEffect(() => {
    if (!loginCode) {
      navigate('/reg');
    }
  }, [loginCode, navigate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(loginCode);
      showToast('Copied!', 'success');
    } catch (err) {
      showToast('Copy failed. Try again.', 'error');
    }
  };

  if (!loginCode) return null;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Anonymous Login Code</h2>
      <p>
        <strong>{loginCode}</strong>
      </p>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>
    </div>
  );
};

export default RegCodePage;
