import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Loader, Loader2 } from 'lucide-react';
import Register from './Register';
import { Link } from 'react-router';
import logo from '../assets/logo.png';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='min-h-[calc(100vh-88px)] flex items-center justify-center px-6'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
            {/* Logo and wordmark */}
            <Link to='/' className='inline-flex items-center gap-3 mb-6'>
                <img src={logo} alt="BidSphere" className='w-14 h-14 object-contain' />
                <span className='font-display text-3xl font-semibold text-gray-900 dark:text-white'>
                    Bid<span className='text-primary-600 dark:text-primary-400'>Sphere</span>
                </span>
            </Link>
            <h1 className='font-display text-3xl font-semibold text-gray-900 dark:text-white'>
                Welcome back
            </h1>
            <p className='font-sans text-gray-500 dark:text-gray-400 mt-2'>
                Sign in to place your bids
            </p>
        </div>

        <form 
            onSubmit={handleSubmit}
            className='bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 shadow-xl shadow-primary-900/50'
        >
            {error && (
                <div className='mb-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-sans'>
                    {error}
                </div>
            )}

            <div className='mb-5'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Username
                </label>
                <input 
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                    placeholder='yourusername' 
                />
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Password
                </label>
                <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                    placeholder='••••••••' 
                />
            </div>

            <button 
                type='submit'
                disabled={loading}
                className='w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors'
            >
                {loading && <Loader2 size={18} className='animate-spin' />}
                {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6 font-sans'>
                Don't have an account?{' '}
                <Link to='/register' className='text-primary-600 dark:text-primary-400 font-medium hover:underline'>
                    Sign Up
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}
