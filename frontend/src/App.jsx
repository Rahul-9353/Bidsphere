import React from 'react'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className='min-h-screen flex items-center justify-center text-gray-900 dark:text-white transition-colors duration-300'>
        <div className='text-center'>
          <h1 className='font-display text-5xl font-semibold mb-4'>
            Bid<span className='text-primary-600 dark:text-primary-400'>Sphere</span>
          </h1>
          <p className='font-sans text-gray-500 dark:text-gray-400 mb-6'>Current theme: {theme}</p>
          <button 
            onClick={toggleTheme} 
            className='px-6 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors'
          >
            Toggle theme
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
