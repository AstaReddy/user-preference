import React, { useState } from 'react';
import UserPreferences from './components/UserPreferences';
import './App.css';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');

  return (
    <main className={`app ${currentTheme}`}>
      <UserPreferences onThemeChange={setCurrentTheme} />
    </main>
  );
}

export default App;