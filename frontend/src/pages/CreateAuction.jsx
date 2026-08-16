import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { createAuction } from '../api/AuctionApi';
import { Loader2, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = ['Watches', 'Art', 'Electronics', 'Collectibles', 'Jewelry', 'Furniture', 'Other'];

export default function CreateAuction() {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        imageUrl: '',
        category: 'Other',
        tags: '',
        currency: 'USD',
    });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                startingPrice: parseFloat(formData.startingPrice),
                tags: formData.tags 
                 ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
                 : [],
            };
            const created = await createAuction(payload);
            navigate(`/auctions/${created.id}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create auction. Check your inputs.');
        } finally {
            setSubmitting(false);
        }
    };

    if (isAuthenticated) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6">
                <p className="font-sans text-gray-500 dark:text-gray-400 text-center">
                    You need to sign in to create an auction.
                </p>
            </div>
        );
    }

  return (
    <div className='max-w-2xl mx-auto px-6 py-12'>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-600/10 dark:bg-primary-400/10 mb-4">
            <PlusCircle className='text-primary-600 dark:to-primary-400' size={28} />
        </div>
        <h1 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">
            List an Item
        </h1>
        <p className="font-sans text-gray-500 dark:text-gray-400 mt-2">
            Set up your auction and start receiving bids
        </p>
      </div>

      <form 
        onSubmit={handleChange}
        className="bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 shadow-xl shadow-purple-900/5 space-y-5"
    >
        {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-sans">
                {error}
            </div>
        )}

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                Title
            </label>
            <input 
                type="text" name='title' required
                value={formData.title} onChange={handleChange}
                placeholder='Vintage Rolex Watch'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
            />
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                Description
            </label>
            <textarea 
                name="description" rows={3}
                value={formData.description} onChange={handleChange}
                placeholder='Excellent condition, 1970s model...'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none'
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                    Starting Price
                </label>
                <input 
                    type="number" step="0.01" min="0.01" name='startingPrice' required
                    value={formData.startingPrice} onChange={handleChange}
                    placeholder='500.00'
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                    Currency
                </label>
                <select 
                    name="currency" value={formData.currency} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    Start Time
                </label>
                <input 
                    type="datetime-local" name="startTime" required
                    value={formData.startTime} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans'>
                    End Time
                </label>
                <input 
                    type="datetime-local" name="endTime" required
                    value={formData.endTime} onChange={handleChange}
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                Category
            </label>
            <select 
                name="category" value={formData.category} onChange={handleChange}
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                Image URL
            </label>
            <input 
                type="url" name="imageUrl"
                value={formData.imageUrl} onChange={handleChange}
                placeholder='https://images.unsplash.com/photo-...'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                Tags <span className='text-gray-400'>(comma-separated)</span>
            </label>
            <input 
                type="text" name='tags'
                value={formData.tags} onChange={handleChange}
                placeholder='vintage, luxury, rolex'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
            />
        </div>

        <button 
            type="submit"
            disabled={submitting}
            className='w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium transition-colors'
        >
            {submitting && <Loader2 size={18} className='animate-spin' />}
            {submitting ? 'Creating...' : 'Create Auction'}
        </button>
    </form>
</div>
  );
}
