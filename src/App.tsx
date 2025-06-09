import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import EmailAuthPage from './pages/EmailAuth/EmailAuthPage';
import RegPage from './pages/Reg/RegPage';
import RegCodePage from './pages/RegCode/RegCodePage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/reg" element={<RegPage />} />
      <Route path="/auth/email" element={<EmailAuthPage />} />
      <Route path="/reg/code" element={<RegCodePage />} />
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default App;
