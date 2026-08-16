import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getBidsForAuction, placeBid } from '../api/bidApi';
import { getAuctionById } from '../api/AuctionApi';
import { useAuctionSocket } from '../hooks/useAuctionSocket';
import { Gavel, Loader2, Clock, Tag, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function getTimeLeftLabel(endTime) {
    const diffMs = new Date(endTime) - new Date();
    if (diffMs <= 0) {
        return 'Auction ended';
    }
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    if (days > 0) {
        return `${days}d ${hours}h left`;
    }
    return `${hours}h ${minutes}m left`;
}

export default function AuctionDetail() {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();

    const [auction, setAuction] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidAmount, setBidAmount] = useState('');
    const [placing, setPlacing] = useState(false);
    const [bidError, setBidError] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        Promise.all([getAuctionById(id), getBidsForAuction(id)])
            .then(([auctionData, bidsData]) => {
                setAuction(auctionData);
                setBids(bidsData);
            })
            .catch(() => setBidError('Could not load auction'))
            .finally(() => setLoading(false));
    }, [id]);

    // Live Updates
    useAuctionSocket(id, (newBid) => {
        setBids((prev) => [newBid, ...prev]);
        setAuction((prev) => prev ? { ...prev, currentHighestBid: newBid.amount } : prev);
    });

    const handlePlacedBid = async (e) => {
        e.preventDefault();
        setBidError('');
        setPlacing(true);
        try {
            await placeBid(Number(id), parseFloat(bidAmount));
            setBidAmount('');
            // No need to manually refresh - the Websocket subscription above will push the update to everyone watching, including us
        } catch (err) {
            setBidError(err.response?.data?.message || 'Failed to place bid');
        } finally {
            setPlacing(false);
        }
    };
    
    if (loading) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <Loader2 className="animate-spin text-primary-600 dark:text-primary-400" size={32} />
            </div>
        );
    }

    if (!auction) {
        return (
            <div className='min-h-[60vh] flex items-center justify-center'>
                <p className='font-sans text-gray-500 dark:text-gray-400'>Auction not found.</p>
            </div>
        );
    }

    const isEnded = new Date(auction.endTime) <= new Date();
    const isOwnAuction = user?.username === auction.sellerUsername;

    return (
        <div className='max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10'>
            
            {/* Left: image */}
            <div className='aspect-[4/3] bg-gray-100 dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10'>
                {auction.imageUrl && !imageError ? (
                    <img 
                        src={auction.imageUrl} 
                        alt={auction.title}
                        onError={() => setImageError(true)}
                        className='w-full h-full object-cover' 
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 font-sans'>
                        No image
                    </div>
                )}
            </div>

            {/* Right: details + bid form */}
            <div>
                {auction.category && (
                    <span className='inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-400/10 px-2.5 py-1 rounded-full mb-4'>
                        <Tag size={12} />
                        {auction.category}
                    </span>
                )}

                <h1 className='font-display text-4xl font-semibold text-gray-900 dark:text-white mb-3'>
                    {auction.title}
                </h1>

                <p className='font-sans text-gray-500 dark:text-gray-400 mb-6'>
                    {auction.description}
                </p>

                <div className='flex items-center gap-4 mb-6 text-sm font-sans'>
                    <span className='flex items-center gap-1.5 text-gray-500 dark:text-gray-400'>
                        <User size={14} /> Sold by <span className='font-medium text-gray-700 dark:text-gray-200'>{auction.sellerUsername}</span>
                    </span>
                    <span className='flex items-center gap-1.5 text-accent-600 dark:text-accent-400 font-medium'>
                            <Clock size={14} /> {getTimeLeftLabel(auction.endTime)}
                    </span>
                </div>

                {/* Current bid + bid form card */}
                <div className='bg-white/80 dark:bg-surface-darkCard/80 backderop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-6'>
                    <p className='text-sm text-gray-400 dark:text-gray-500 font-sans mb-1'>Current highest bid</p>
                    <p className='font-display text-4xl font-bold text-gray-900 dark:text-white mb-6'>
                        {auction.currency} {Number(auction.currentHighestBid).toFixed(2)}
                    </p>

                    {bidError && (
                        <div className='mb-4 px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-sans'>
                            {bidError}
                        </div>
                    )}

                    {isEnded ? (
                        <p className='text-center py-3 text-gray-500 dark:text-gray-400 font-sans'>This auction has ended.</p>
                    ) : isOwnAuction ? (
                        <p className='text-center py-3 text-gray-500 dark:text-gray-400 font-sans'>You can't bid on your own auction.</p>
                    ) : !isAuthenticated ? (
                        <p className='text-center py-3 text-gray-500 dark:text-gray-400 font-sans'>Sign in to place a bid.</p>
                    ) : (
                        <form onSubmit={handlePlacedBid} className='flex gap-3'>
                            <input 
                                type="number"
                                step="0.01"
                                required
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                placeholder={`More than ${Number(auction.currentHighestBid).toFixed(2)}`}
                                className='flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                            />
                            <button 
                                type='submit'
                                disabled={placing}
                                className='flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium transition-colors'
                            >
                                {placing ? <Loader2 size={18} className='animate-spin' /> : <Gavel size={18} />}
                                Bid
                            </button>
                        </form>
                    )}
                </div>

                {/* Bid history */}
                <div className='mt-8'>
                    <h3 className='font-display text-lg font-semibold text-gray-900 dark:text-white mb-3'>
                        Bid History ({bids.length})
                    </h3>
                    <div className='space-y-2 max-h-64 overflow-y-auto'>
                        {bids.length === 0 && (
                            <p className='text-sm text-gray-400 dark:text-gray-500 font-sans'>No bids yet - be the first!</p>
                        )}
                        {bids.map((bid) => (
                            <div 
                                key={bid.id}
                                className='flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/60 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-sm font-sans'
                            >
                                <span className='font-medium text-gray-700 dark:text-gray-200'>{bid.bidderUsername}</span>
                                <span className='font-semibold text-gray-900 dark:text-white'>
                                    {auction.currency} {Number(bid.amount).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
