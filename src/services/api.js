const API_URL = 'http://localhost:3001/preferences';

export async function getPreferences() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }

  return response.json();
}

export async function updatePreferences(preferences) {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    throw new Error('Failed to update preferences');
  }

  return response.json();
}