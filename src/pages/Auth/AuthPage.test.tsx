import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '../../context/auth-context';
import { ToastProvider } from '../../context/toast-context';
import AuthPage from './AuthPage';

const navigateMock = vi.fn();
const loginMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.mock('../../context/auth-context', async () => {
  const actual = await vi.importActual('../../context/auth-context');
  return {
    ...actual,
    useAuth: () => ({ login: loginMock }),
  };
});

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>{ui}</ToastProvider>
      </AuthProvider>
    </BrowserRouter>,
  );
};

describe('AuthPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs in with 16-digit anonymous code', async () => {
    renderWithProviders(<AuthPage />);
    const input = screen.getByTestId('auth-input');
    fireEvent.change(input, { target: { value: '1234567890123456' } });

    const [continueBtn] = screen.getAllByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);

    await waitFor(() => {
      expect(screen.getByText(/logged in successfully/i)).toBeInTheDocument();
    });

    expect(loginMock).toHaveBeenCalled();
  });

  it('logs in with Google and navigates to dashboard', async () => {
    renderWithProviders(<AuthPage />);

    const googleButton = screen.getByRole('button', {
      name: /continue with google/i,
    });
    fireEvent.click(googleButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('mock-session');
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('sends email and navigates to email auth page', async () => {
    renderWithProviders(<AuthPage />);
    const input = screen.getByTestId('auth-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    const [continueBtn] = screen.getAllByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/auth/email', {
        state: { email: 'test@example.com' },
      });
    });
  });

  it('shows error for invalid input format', async () => {
    renderWithProviders(<AuthPage />);
    const input = screen.getByTestId('auth-input');
    fireEvent.change(input, { target: { value: 'abcd' } });

    const [continueBtn] = screen.getAllByRole('button', { name: /continue/i });
    fireEvent.click(continueBtn);

    await waitFor(() => {
      const matches = screen.getAllByText(
        /enter a valid email or 16-digit code/i,
      );
      expect(matches.length).toBeGreaterThan(0);
    });
  });
});
