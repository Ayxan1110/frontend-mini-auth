import './RegPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAnonymous } from '../../api';
import { MESSAGES } from '../../constants/messages';
import { useToast } from '../../context/toast-context';

const RegPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAnonymousRegister = async () => {
    setLoading(true);
    try {
      const response = await registerAnonymous();
      const code = response.data.login_code;
      navigate('/reg/code', { state: { loginCode: code } });
    } catch (err) {
      showToast(MESSAGES.LOGIN_FAILED, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-box">
        <h1 className="reg-title">Register</h1>
        <button
          onClick={handleAnonymousRegister}
          disabled={loading}
          className="reg-button"
        >
          {loading ? 'Registering…' : 'Anonymous Registration'}
        </button>
      </div>
    </div>
  );
};

export default RegPage;
