import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { Sun, Moon, LogOut, Gavel, PlusCircle } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-surface-dark/70 border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300'>
        <div className='max-w-7xl mx-auto px-6 py-3 flex items-center justify-between'>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="BidSphere" className='w-20 h-20 object-contain' />
                <span className='font-display text-3xl font-semibold text-gray-900 dark:text-white'>
                    Bid<span className='text-primary-600 dark:text-primary-400'>Sphere</span>
                </span>
            </Link>

            {/* Nav links */}
            <div className='hidden md:flex items-center gap-8 font-sans text-base font-medium text-gray-600 dark:text-gray-300'>
                <Link to="/auctions" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    Browse Auctions
                </Link>
                {isAuthenticated && (
                    <Link to="/create-auction" className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <PlusCircle size={20} />
                        Sell an Item
                    </Link>
                )}
            </div>

            {/* Right side: theme toggle + auth */}
            <div className='flex items-center gap-5'>
                <button 
                    onClick={toggleTheme}
                    aria-label='Toggle theme'
                    className='p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors'
                >
                    {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
                </button>

                {isAuthenticated ? (
                    <div className='flex items-center gap-4'>
                        <span className='hidden sm:block text-base font-sans text-gray-600 dark:text-gray-300'>
                            Hi, <span className='font-semibold'>{user.username}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className='flex items-center gap-1.5 px-4 py-2 rounded-full text-base font-medium bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors'
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center gap-2'>
                        <Link
                            to="/login"
                            className="px-5 py-2 rounded-full text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-5 py-2 rounded-full text-base font-medium bg-primary-600  hover:bg-primary-700 text-white transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </div>
    </nav>
  );
}
