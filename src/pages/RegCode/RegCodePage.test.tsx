import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider } from '../../context/toast-context';
import RegCodePage from './RegCodePage';

beforeEach(() => {
  vi.restoreAllMocks();
});

const renderWithCode = (loginCode: string | undefined) => {
  const initialEntries = loginCode
    ? [{ pathname: '/reg/code', state: { loginCode } }]
    : ['/reg/code'];

  return render(
    <ToastProvider>
      <MemoryRouter initialEntries={initialEntries as string[]}>
        <Routes>
          <Route path="/reg/code" element={<RegCodePage />} />
          <Route path="/reg" element={<div>RegCode Page Reached</div>} />
        </Routes>
      </MemoryRouter>
    </ToastProvider>,
  );
};

describe('RegCodePage', () => {
  it('displays code and copies it', async () => {
    const mockClipboard = vi.fn();
    Object.assign(navigator, {
      clipboard: { writeText: mockClipboard },
    });

    renderWithCode('1234567890123456');

    expect(screen.getByText('1234567890123456')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /your anonymous login code/i }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(/copy to clipboard/i));
    expect(mockClipboard).toHaveBeenCalledWith('1234567890123456');

    await waitFor(() => {
      expect(screen.getByText(/copied!/i)).toBeInTheDocument();
    });
  });

  it('redirects to /reg if no code', async () => {
    renderWithCode(undefined);

    await waitFor(() => {
      expect(screen.getByText(/regcode page reached/i)).toBeInTheDocument();
    });
  });
});
