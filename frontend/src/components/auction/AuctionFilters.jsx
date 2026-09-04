import { Search } from 'lucide-react';
import React from 'react'

const CATEGORIES = ['All', 'Watches', 'Art', 'Electronics', 'Collectibles', 'Jewelry', 'Furniture', 'Other'];

export default function AuctionFilters({ filters, onChange }) {
    return (
        <div className='flex flex-col sm:flex-row gap-3 mb-8'>
            <div className="relative flex-1">
                <Search size={18} className='absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400' />
                <input 
                    type="text"
                    value={filters.query}
                    onChange={(e) => onChange({ ...filters, query: e.target.value })}
                    placeholder='Search auctions...'
                    className='w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                />
            </div>

            <select 
                value={filters.category}
                onChange={(e) => onChange({ ...filters, category: e.target.value })}
                className='px-4 py-2.5 rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
                value={filters.sortBy}
                onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
                className='px-4 py-2.5 rounded-full border border-gray-300 dark: border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
            >
                <option value="">Sort: Default</option>
                <option value="endingSoon">Ending Soon</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
            </select>

            <select 
                value={filters.status || 'ACTIVE'}
                onChange={(e) => onChange({ ...filters, status: e.target.value })}
                className='px-4 py-2.5 rounded-full border border-gray-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'>
                    <option value="ACTIVE">Live Auctions</option>
                    <option value="ENDED">Ended Auctions</option>
            </select>
        </div>
    );
}
