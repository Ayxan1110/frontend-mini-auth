import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../../context/auth-context';
import { ToastProvider } from '../../context/toast-context';
import EmailAuthPage from './EmailAuthPage';

const renderWithProviders = (initialEmail: string) => {
  return render(
    <MemoryRouter
      initialEntries={[
        { pathname: '/auth/email', state: { email: initialEmail } },
      ]}
    >
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/auth/email" element={<EmailAuthPage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
};

describe('EmailAuthPage', () => {
  it('logs in with valid 6-digit PIN', async () => {
    renderWithProviders('test@example.com');

    const input = screen.getByPlaceholderText(/123456/i);
    fireEvent.change(input, { target: { value: '123456' } });

    fireEvent.click(screen.getByText(/verify/i));

    await waitFor(() => {
      const toasts = screen.getAllByText(/logged in successfully/i);
      expect(toasts.length).toBeGreaterThan(0);
    });
  });

  it('shows error on invalid PIN length', async () => {
    renderWithProviders('test@example.com');

    const input = screen.getByPlaceholderText(/123456/i);
    fireEvent.change(input, { target: { value: '123' } });

    fireEvent.click(screen.getByText(/verify/i));

    await waitFor(() => {
      expect(screen.getByText(/must be 6 numeric digits/i)).toBeInTheDocument();
    });
  });

  it('shows error on wrong PIN (server)', async () => {
    renderWithProviders('test@example.com');

    const input = screen.getByPlaceholderText(/123456/i);
    fireEvent.change(input, { target: { value: '999999' } });

    fireEvent.click(screen.getByText(/verify/i));

    await waitFor(() => {
      expect(screen.getByText(/invalid pin/i)).toBeInTheDocument();
    });
  });
});
