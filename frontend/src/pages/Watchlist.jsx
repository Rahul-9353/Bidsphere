import React, { useEffect, useState } from 'react'
import { getMyWatchlist } from '../api/watchlistApi';
import { Heart, Loader2 } from 'lucide-react';
import AuctionCard from '../components/auction/AuctionCard';

export default function Watchlist() {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyWatchlist().then(setAuctions).finally(() => setLoading(false));
    }, []);

  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className="flex items-center gap-3 mb-8">
            <Heart className='text-red-500' size={24} />
            <h1 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">
                My Watchlist
            </h1>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className='animate-spin text-primary-600 dark:text-primary-400' size={32} />
            </div>
        ) : auctions.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 font-sans py-16">
                You're not watching any auctions yet - tap the heart icon on any listing to save it here.
            </p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {auctions.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
            </div>
        )}
    </div>
  );
}
