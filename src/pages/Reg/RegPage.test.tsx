import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthProvider } from '../../context/auth-context';
import { ToastProvider } from '../../context/toast-context';
import RegCodePage from '../RegCode/RegCodePage';
import RegPage from './RegPage';

const renderWithProviders = () => {
  return render(
    <MemoryRouter initialEntries={['/reg']}>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path="/reg" element={<RegPage />} />
            <Route path="/reg/code" element={<RegCodePage />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
};

describe('RegPage', () => {
  it('registers anonymously and navigates to code page', async () => {
    renderWithProviders();

    const button = screen.getByRole('button', {
      name: /anonymous registration/i,
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: /your anonymous login code/i }),
      ).toBeInTheDocument();
    });
  });
});
