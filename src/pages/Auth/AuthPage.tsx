import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail, isLoginCode } from '../../utils/validators';
import { registerWithEmail, loginWithCode } from '../../api';

const AuthPage = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailLogin = async (email: string) => {
        try {
            await registerWithEmail({ email, lang: 'en' });
            navigate('/auth/email', { state: { email } });
        } catch (err) {
            alert('Invalid email or failed to send code');
        }
    };

    const handleCodeLogin = async (code: string) => {
        try {
            const data = await loginWithCode({ login_code: code });
            alert(`Logged in! Session: ${data.data.session}`);
        } catch (err) {
            alert('Invalid or expired login code');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!input.trim()) {
            alert('Input required');
            return;
        }

        setLoading(true);

        try {
            if (isEmail(input)) {
                await handleEmailLogin(input);
            } else if (isLoginCode(input)) {
                await handleCodeLogin(input);
            } else {
                alert('Enter a valid email or 16-digit code');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter email or 16-digit code"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Please wait…' : 'Continue'}
                </button>
            </form>
        </div>
    );
};

export default AuthPage;
