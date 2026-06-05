import React, { useEffect, useState } from 'react';
import { getPreferences, updatePreferences } from '../services/api';

function UserPreferences({ onThemeChange }) {
  const [preferences, setPreferences] = useState({
    displayName: '',
    language: 'English',
    emailNotifications: false,
    theme: 'light',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const data = await getPreferences();
        setPreferences(data);
        onThemeChange(data.theme);
      } catch (error) {
        setMessage('Unable to load preferences. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchPreferences();
  }, []);

function handleChange(event) {
  const { name, value, type, checked } = event.target;

  const updatedPreferences = {
    ...preferences,
    [name]: type === 'checkbox' ? checked : value,
  };

  setPreferences(updatedPreferences);

  if (name === 'theme') {
    onThemeChange(value);
  }
}

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updatePreferences(preferences);
      setMessage('Preferences saved successfully.');
    } catch (error) {
      setMessage('Unable to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="preferences-card">
        <p className="loading-text">Loading preferences...</p>
      </section>
    );
  }

  return (
    <section className="preferences-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Account Settings</p>
          <h2>User Preferences</h2>
          <p className="subtitle">
            Manage your profile, display, and notification settings.
          </p>
        </div>

      </div>

      {message && <p className="message">{message}</p>}

      <form className="preferences-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Display Name
            <input
              type="text"
              name="displayName"
              value={preferences.displayName}
              onChange={handleChange}
            />
          </label>

          <label>
            Language
            <select
              name="language"
              value={preferences.language}
              onChange={handleChange}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Japanese</option>
            </select>
          </label>

          <label>
            Theme
            <select
              name="theme"
              value={preferences.theme}
              onChange={handleChange}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        <div className="notification-box">
          <div>
            <h3>Email Notifications</h3>
            <p>Receive updates about account activity and preference changes.</p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserPreferences;