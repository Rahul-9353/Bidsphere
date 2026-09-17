import { ChevronDown, Search } from 'lucide-react';
import React, { act } from 'react'
import { useIsDarkMode } from '../../hooks/useIsDarkMode';
import { Label, Listbox } from '@headlessui/react';

const CATEGORIES = ['All', 'Watches', 'Art', 'Electronics', 'Collectibles', 'Jewelry', 'Furniture', 'Other'];
const CATEGORY_OPTIONS = CATEGORIES.map((c) => ({ value: c, label: c }));

const SORT_OPTIONS = [
    { value: '', label: 'Sort:Default' },
    { value: 'endingSoon', label: 'Ending Soon' },
    { value: 'priceLowHigh', label: 'Price: Low to High' },
    { value: 'priceHighLow', label: 'Price: High to Low' },
];

const STATUS_OPTIONS = [
    { value: 'ACTIVE', label: 'Live Auctions' },
    { value: 'ENDED', label: 'Ended Auctions' },
];

export default function AuctionFilters({ filters, onChange }) {
    const isDark = useIsDarkMode();
    console.log('isDark:', isDark);
    const colorScheme = { colorScheme: isDark ? 'dark' : 'light' };

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

            <Listbox value={filters.category} onChange={(value) => onChange({ ...filters, category: value })}>
                <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-green-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                        <span>{CATEGORY_OPTIONS.find(o => o.value === filters.category)?.label ?? 'All'}</span>
                        <ChevronDown size={16} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-2 min-w-full w-max rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                        {CATEGORY_OPTIONS.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active }) => `px-4 py-2 cursor-pointer whitespace-nowrap text-gray-900 dark:text-white ${
                                    active ? 'bg-primary-100 dark:bg-white/10' : ''
                                    }`
                                }
                            >
                                {option.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>

            <Listbox value={filters.sortBy} onChange={(value) => onChange({ ...filters, sortBy: value })}>
                <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-green-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                        <span>{SORT_OPTIONS.find(o => o.value === filters.sortBy)?.label ?? 'Sort: Default'}</span>
                        <ChevronDown size={16} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                        {SORT_OPTIONS.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active }) => `px-4 py-2 cursor-pointer text-gray-900 dark:text-white ${
                                    active ? 'bg-primary-100 dark:bg-white/10' : ''
                                    }`
                                }
                            >
                                {option.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>

            <Listbox value={filters.status || 'ACTIVE'} onChange={(value) => onChange({ ...filters, status: value })}>
                <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-full border border-green-300 dark:border-white/10 bg-white/80 dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all">
                        <span>{STATUS_OPTIONS.find(o => o.value === (filters.status || 'ACTIVE'))?.label ?? 'Live Auctions'}</span>
                        <ChevronDown size={16} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-2 w-full rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                        {STATUS_OPTIONS.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active }) => `px-4 py-2 cursor-pointer text-gray-900 dark:text-white ${
                                    active ? 'bg-primary-100 dark:bg-white/10' : ''
                                    }`
                                }
                            >
                                {option.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
