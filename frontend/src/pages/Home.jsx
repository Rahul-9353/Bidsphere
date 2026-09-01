import React, { useEffect, useState } from 'react'
import { getAllAuctions, searchAuctions } from '../api/AuctionApi';
import { ArrowRight, Gavel } from 'lucide-react';
import AuctionCard from '../components/auction/AuctionCard';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router';
import { Loader2 } from 'lucide-react';
import AuctionFilters from '../components/auction/AuctionFilters';

export default function Home() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const isBrowsePage = location.pathname === '/auctions';
    const [filters, setFilters] = useState({ query: '', category: 'All', sortBy: ''});
    const featured = auctions.slice(0, 3);

    useEffect(() => {
        const fetchFn = isBrowsePage
            ? () => searchAuctions(filters)
            : getAllAuctions;

        fetchFn()
            .then(setAuctions)
            .catch(() => setError('Could not load auctions. Is the backend running?'))
            .finally(() => setLoading(false));
    }, [isBrowsePage, filters.query, filters.category, filters.sortBy]);


  return (
    <div>
        {/* Hero */}
        <section className='max-w-5xl mx-auto px-6 pt-20 pb-16 text-center'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-400/10 text-primary-700 dark:text-primary-400 text-sm font-medium font-sans mb-6'>
                <Gavel size={14} />
                Live auctions, real-time bidding
            </div>
            <h1 className='font-display text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white leading-tight mb-6'> 
                Bid on what<br />
                <span className='text-primary-600 dark:text-primary-400'>moves you</span>
            </h1>
            <p className='font-sans text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8'>
                Join live auctions from sellers around the world. Real-time bids, instant notifications, zero waiting.
            </p>
            <div className='flex items-center justify-center gap-4'>
                <Link 
                    to="/auctions"
                    className="px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium font-sans transition-colors flex items-center gap-2"
                >
                    Browse Auctions <ArrowRight size={16} />
                </Link>
                {!isAuthenticated && (
                    <Link 
                        to="/register"
                        className="px-6 py-3 rounded-full bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 font-medium font-sans hover:bg-white dark:hover:bg-white/20 transition-colors"
                    >
                        Get Started
                    </Link>
                )}
            </div>
        </section>

        {/* Featured / full grid */}
        <section className='max-w-7xl mx-auto px-6 pb-20'>
            <div className='flex items-center justify-between mb-8'>
                <h2 className='font-display text-2xl font-semibold text-gray-900 dark:text-white'>
                    {featured.length > 0 ? 'Live Auctions' : 'No Live Auctions Yet'}
                </h2>
                {auctions.length > 3 && (
                    <Link to="/auctions" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline font-sans">
                        View all →
                    </Link>
                )}
            </div>

            {loading && (
                <div className='flex justify-center py-20'>
                    <Loader2 className="animate-spin text-primary-600 dark:text-primary-400" size={32} />
                </div>
            )}

            {error && (
                <p className='text-center text-red-500 font-sans py-10'>{error}</p>
            )}

            {!loading && ! error && auctions.length === 0 && (
                <p className='text-center text-gray-500 dark:text-gray-400 font-sans py-10'>
                    Be the first to create an auction!
                </p>
            )}

            {isBrowsePage && <AuctionFilters filters={filters} onChange={setFilters} />}

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {(featured.length > 0 ? auctions : []).map((auction) => (
                    <AuctionCard key={auction.id} auction={auction} />
                ))}
            </div>
        </section>
    </div>
  );
}
