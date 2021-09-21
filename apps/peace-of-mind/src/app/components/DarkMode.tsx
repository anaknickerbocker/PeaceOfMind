import React, { useState } from 'react';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'main dark-mode' : 'main light-mode'}>
      <button onClick={handleModeChange}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default DarkMode;
