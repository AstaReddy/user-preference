import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPreferences from './UserPreferences';
import * as api from '../services/api';

vi.mock('../services/api');

describe('UserPreferences', () => {
  const mockPreferences = {
    id: 1,
    displayName: 'Guru',
    language: 'English',
    emailNotifications: true,
    theme: 'dark',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('loads and displays user preferences', async () => {
    api.getPreferences.mockResolvedValue(mockPreferences);

    render(<UserPreferences />);

    expect(screen.getByText('Loading preferences...')).toBeInTheDocument();

    expect(await screen.findByDisplayValue('Guru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('English')).toBeInTheDocument();
    expect(screen.getByLabelText('Theme')).toHaveValue('dark');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('allows user to edit display name', async () => {
    api.getPreferences.mockResolvedValue(mockPreferences);

    render(<UserPreferences />);

    const nameInput = await screen.findByDisplayValue('Guru');

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Guru Kiran');

    expect(nameInput).toHaveValue('Guru Kiran');
  });

  test('saves updated preferences', async () => {
    api.getPreferences.mockResolvedValue(mockPreferences);
    api.updatePreferences.mockResolvedValue({
      ...mockPreferences,
      displayName: 'Guru Kiran',
    });

    render(<UserPreferences />);

    const nameInput = await screen.findByDisplayValue('Guru');

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Guru Kiran');

    const saveButton = screen.getByRole('button', {
      name: /save preferences/i,
    });

    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(api.updatePreferences).toHaveBeenCalledWith({
        ...mockPreferences,
        displayName: 'Guru Kiran',
      });
    });

    expect(
      screen.getByText('Preferences saved successfully.')
    ).toBeInTheDocument();
  });
});