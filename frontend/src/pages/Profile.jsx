import React, { useEffect, useState } from 'react'
import { getAuctionsBySeller } from '../api/AuctionApi';
import { getBidsByUser } from '../api/bidApi';
import { Gavel, Loader, Loader2, Package, User } from 'lucide-react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, isAuthenticated } = useAuth();
    const [tab, setTab] = useState('listings');
    const [listings, setListings] = useState([]);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.username) {
        return
    }
    Promise.all([getAuctionsBySeller(user.username), getBidsByUser(user.username)])
        .then(([listingsData, bidsData]) => {
            setListings(listingsData);
            setBids(bidsData);
        })
        .finally(() => setLoading(false));
  }, [user?.username]);

  if (!isAuthenticated) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <p className="font-sans text-gray-500 dark:text-gray-400">Please sign in to view your profile.</p>
        </div>
    );
  }
  return (
    <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className="flex items-center gap-4 mb-10">
            <div className="w-16 h-16 rounded-full bg-primary-600/10 dark:bg-primary-400/10 fex items-center justify-center">
                <User className='text-primary-600 dark:text-primary-400' size={28} />
            </div>
            <div>
                <h1 className="font-display text-3xl font-semibold text-gray-900 dark:text-white">
                    {user.username}
                </h1>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {user.role?.toLowerCase()}
                </p>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 dark:border-white/10">
            <button 
                onClick={() => setTab('listings')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium font-sans border-b-2 transition-colors 
                ${tab === 'listings'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
                <Package size={16} /> My Listigs ({listings.length})
            </button>
            <button
                onClick={() => setTab('bids')}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium font-sans border-b-2 transition-colors 
                ${tab === 'bids'
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
                <Gavel size={16} /> My Bids ({bids.length})
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className='animate-spin text-primary-600 dark:text-primary-400' size={32} />
            </div>
        ) : tab === 'listings' ? (
            listings.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 font-sans py-16">
                    You haven't listed anything yet.{' '}
                    <Link to="/create-auction" className="text-primary-600 dark:text-primary-400 hover:underline">
                        Sell an item
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}
                </div>
            )
        ) : bids.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 font-sans py-16">
                You haven't placed any bids yet.{' '}
                <Link to="/auctions" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Browse auctions    
                </Link>
            </p>
        ) : (
            <div className="space-y-3">
                {bids.map((bid) => (
                    <Link
                        key={bid.id}
                        to={`/auctions/${bid.auctionId}`}
                        className='flex items-center justify-between px-5 py-4 rounded-xl bg-white/80 dark:bg-surface-darkCard/80 border border-gray-200/50 dark:border-white/10 hover:border-primary-400 dark:hover:border-primary-500 transition-colors font-sans'
                    >
                        <span className="text-gray-700 dark:text-gray-200">Auction #{bid.auctionId}</span>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">${Number(bid.amount).toFixed(2)}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                {new Date(bid.placedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}
