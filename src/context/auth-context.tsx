import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  session: string | null;
  login: (sessionToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(storedSession);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('session', token);
    setSession(token);
  };

  const logout = () => {
    localStorage.removeItem('session');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
