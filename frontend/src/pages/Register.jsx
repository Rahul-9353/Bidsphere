import { Loader2 } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import logo from '../assets/logo.png';
import { validatePassword } from '../utils/passwordValidation';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: '', role: 'BIDDER', phone: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        const pwErrors = validatePassword(formData.password);
        if (pwErrors.length > 0) {
            setError('Please fix the password requirements below.');
            return;
        }

        setLoading(true);
        try {
            const { confirmPassword, ...payload} = formData;
            await register(payload);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registeration failed. Try a different username or email.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className='min-h-[calc(100vh-88px)] flex items-center justify-center px-6 py-12'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-8'>
            <Link to='/' className='inline-flex items-center gap-3 mb-6'>
                <img src={logo} alt="BidSphere" className='w-14 h-14 object-contain' />
                <span className='font-display text-3xl font-semibold text-gray-900 dark:text-white'>
                    Bid<span className='text-primary-600 dark:text-primary-400'>Sphere</span>
                </span>
            </Link>
            <h1 className='font-display text-3xl font-semibold text-gray-900 dark:text-white'>
                Join BidSphere
            </h1>
            <p className='font-sans text-gray-500 dark:text-gray-400 mt-2'> 
                Create an account to start bidding or selling
            </p>
        </div>

        <form 
            onSubmit={handleSubmit}
            className='bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 shadow-xl shadow-primary-900/5'
        >
            {error && (
                <div className='mb-5 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-sans'>
                    {error}
                </div>
            )}

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Username
                </label>
                <input 
                    type="text" name='username' required
                    value={formData.username} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                    placeholder='yourusername' 
                />
            </div>

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Email
                </label>
                <input 
                    type="email" name='email' required
                    value={formData.email} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                    placeholder='you@example.com'  
                />
            </div>

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Password
                </label>
                <div className="relative">
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        name='password' required minLength={8} 
                        value={formData.password} 
                        onChange={(e) => {
                            handleChange(e);
                            setPasswordErrors(validatePassword(e.target.value));
                        }}
                        className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                        placeholder='At least 8 characters'
                    />
                    <button 
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {formData.password && passwordErrors.length > 0 && (
                    <ul className="mt-2 space-y-1">
                        {passwordErrors.map((err) => (
                            <li key={err} className="text-xs text-red-500 dark:text-red-400 font-sans flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-red-500 dark:bg-red-400" />
                                {err}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Confirm Password
                </label>
                <div className="relative">
                    <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        name='confirmPassword' required minLength={8} 
                        value={formData.confirmPassword} 
                        onChange={handleChange}
                        className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                        placeholder='Re-enter your password'
                    />
                    <button 
                        type='button'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 dark:text-red-400 font-sans mt-1.5">Passwords don't match</p>
                )}
            </div>

            <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Phone
                </label>
                <input 
                    type="tel" name='phone'
                    value={formData.phone} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                    placeholder='9999999999' 
                />
            </div>

            <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-sans'>
                    I want to
                </label>
                <div className='grid grid-cols-2 gap-3'>
                    {['BIDDER', 'SELLER'].map((r) => (
                        <button
                            key={r}
                            type='button'
                            onClick={() => setFormData({ ...formData, role: r})}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                                formData.role === r
                                    ? 'bg-primary-600 border-primary-600 text-white'
                                    : 'bg-white dark:bg-white/5 border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-primary-400'
                            }`}
                        >
                            {r === 'BIDDER' ? 'Bid on items' : 'Sell items'}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type='submit'
                disabled={loading}
                className='w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors'
            >
                {loading && <Loader2 size={18} className='animate-spin' />}
                {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6 font-sans'>
                Already have an account?{' '}
                <Link to='/login' className='text-primary-600 dark:text-primary-400 font-medium hover:underline'>
                    Sign in
                </Link>
            </p>
        </form>
      </div>
    </div>
  );
}
