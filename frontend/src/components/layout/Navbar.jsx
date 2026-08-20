import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import { Sun, Moon, LogOut, Gavel, PlusCircle } from 'lucide-react';
import logo from '../../assets/logo.png';
import { useNotifications } from '../../context/NotificationContext';
import { Bell } from 'lucide-react';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const { notifications, unreadCount, markAllRead } = useNotifications();
    const [showDropdown, setShowDropdown] = useState(false);

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
                {isAuthenticated && (
                    <div className="relative">
                        <button 
                            onClick={() => { setShowDropdown(!showDropdown); markAllRead(); }}
                            aria-label='Notifications'
                            className='relative p-2.5 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors'
                        >
                            <Bell size={22} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 ring-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-accent-500 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showDropdown && (
                            <div className="absolute ring-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-surface-darkCard border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl p-2 font-sans">
                                {notifications.length === 0 ? (
                                    <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-6">No notifications yet</p>
                                ) : (
                                    notifications.map((n) => (
                                        <Link 
                                            key={n.id}
                                            to={`/auctions/${n.auctionId}`}
                                            onClick={() => setShowDropdown(false)}
                                            className='block px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'
                                        >
                                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                                Outbid by <span className="font-semibold">{n.newBidderUsername}</span> - {n.newBidAmount}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                {new Date(n.receivedAt).toLocaleDateString()}
                                            </p>
                                        </Link>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                )}
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
