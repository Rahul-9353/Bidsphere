import { Clock, User } from 'lucide-react';
import React from 'react'
import { Link } from 'lucide-react';
import { Tag } from 'lucide-react';

// Formats "2026-08-10T10:00:00" into a human-readable countdown label
function getTimeLeftLabel(endTime) {
    const diffMs = new Date(endTime) - new Date();
    if (diffMs <= 0) {
        return 'Ended';
    }
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    if (days > 0) {
        return `${days}d ${hours}h left`;
    }
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m left`;
}

export default function AuctionCard({ auction }) {
    const {
        id, title, description, currentHighestBid, currency, sellerUsername, category, imageUrl, endTime
    } = auction;

  return (
    <Link 
        to={`/auctions/${id}`}
        className="group block bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-primary-900/10 transition-all duration-300"
    >
        {/* Image */}
        <div className='aspect-[4/3] bg-gray-100 dark:bg-white/5 overflow-hidden'>
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
            ) : (
                <div className='w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600 font-sans text-sm'>
                    No image
                </div>
            )}
        </div>

        <div className='p-5'>
            {/* Category badge */}
            {category && (
                <span className='inline-flex items-center gap-1 text-xs font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-400/10 px-2.5 py-1 rounded-full mb-3'>
                    <Tag size={12} />
                    {category}
                </span>
            )}

            {/* Title */}
            <h3 className='font-display text-xl font-semibold text-gray-900 dark:text-white mb-1.5 line-clamp-1'>
                {title}
            </h3>

            {/* Description snippet */}
            {description && (
                <p className='font-sans text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2'>
                    {description}
                </p>
            )}

            {/* Price + time left */}
            <div className='flex items-end justify-between mb-3'>
                <div>
                    <p className='text-xs text-gray-400 dark:text-gray-500 font-sans mb-0.5'>Current bid</p>
                    <p className='font-display text-2xl font-bold text-gray-900 dark:text-white'>
                        {currency} {Number(currentHighestBid).toFixed(2)}
                    </p>
                </div>
                <div className='flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400 font-sans'>
                    <Clock size={14} />
                    {getTimeLeftLabel(endTime)}
                </div>
            </div>

            {/* seller */}
            <div className='flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-sans pt-3 border-t border-gray-100 dark:border-white/5'>
                <User size={12} />
                Sold by <span className='font-medium text-gray-600 dark:text-gray-300'>{sellerUsername}</span>
            </div>
        </div>
    </Link>
  );
}
