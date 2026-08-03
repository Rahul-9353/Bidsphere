import React from 'react'
import { useTheme } from './context/ThemeContext'
import GradientBackground from './components/common/GradientBackground'
import Navbar from './components/layout/Navbar';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <GradientBackground />
      <Navbar />
      <div className='min-h-screen flex items-center justify-center text-gray-900 dark:text-white'>
        <p className='font-sans text-gray-500 dark:text-gray-400'>Page contact will go here - routing next.</p>
      </div>
    </>
  );
}

export default App;
