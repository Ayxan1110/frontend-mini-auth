import './RegCodePage.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../constants/messages';
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
      showToast(MESSAGES.COPY_SUCCESS, 'success');
    } catch {
      showToast(MESSAGES.COPY_FAILED, 'error');
    }
  };

  if (!loginCode) return null;

  return (
    <div className="regcode-container">
      <div className="regcode-box">
        <h1 className="regcode-title">Your Anonymous Login Code</h1>
        <p className="regcode-code">{loginCode}</p>
        <button onClick={copyToClipboard} className="regcode-button">
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default RegCodePage;
