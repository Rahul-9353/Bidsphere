import React, { useEffect } from 'react'
import { useNotifications } from '../../context/NotificationContext'
import { Gavel, X } from 'lucide-react';
import { Link } from 'lucide-react';

export default function NotificationToast() {

    const { toast, dismissToast } = useNotifications();

    useEffect(() => {
        if (!toast) {
            return;
        }
        const timer = setTimeout(dismissToast, 6000);
        return () => clearTimeout(timer);
    }, [toast]);

    if (!toast) {
        return null;
    }
  return (
    <div className='fixed to-20 right-6 z-[100] w-80 bg-white dark:bg-surface-darkCard border border-green-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/10 p-4 animate-in slide-in-from-top-4 fade-in duration-300'>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-500/10 flex items-center justify-center">
            <Gavel className='text-accent-600 dark:text-accent-400' size={18} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="font-sans text-sm font-semibold text-gray-900 dark:text-white">
                You've been outbid!
            </p>
            <p className="font-sans text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {toast.newBidderUsername} bid {toast.newBidAmount} on your item (was {toast.previousBidAmount})
            </p>
            <Link 
                to={`/auctions/${toast.auctionId}`}
                onClick={dismissToast}
                className="inline-block mt-2 text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
                View auction →
            </Link>
        </div>
        <button onClick={dismissToast} className='flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'>
            <X size={16} />
        </button>
      </div>
    </div>
  );
}
