import React from 'react'
import { useTheme } from './context/ThemeContext'
import GradientBackground from './components/common/GradientBackground'
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <GradientBackground />
      <Navbar />
      <Routes>
        <Route path='/' element={
          <div className='min-h-screen flex items-center justify-center text-gray-900 dark:text-white'>
            <p className='font-sans text-gray-500 dark:text-gray-400'>Page contact will go here - routing next.</p>
        </div>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
