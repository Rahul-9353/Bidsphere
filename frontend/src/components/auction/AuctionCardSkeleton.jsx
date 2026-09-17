import React from 'react'

export default function AuctionCardSkeleton() {
  return (
    <div className='bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl overflow-hidden animate-pulse'>
      <div className="aspect-[4/3] bg-gray-200 dark:bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-20 bg-gray-200 dark:bg-white/10 rounded-full" />
        <div className='h-6 w-3/4 bg-gray-200 dark:bg-white/10 rounded' />
        <div className='h-4 w-full bg-gray-200 dark:bg-white/10 rounded'/>
        <div className='h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded'/>
        <div className="flex justify-between items-end pt-2">
            <div className="space-y-1 5">
                <div className='h-3 w-16 bg-gray-200 dark:bg-white/10 rounded'/>
                <div className='h-7 w-24 bg-gray-200 dark:bg-white/10 rounded'/>
            </div>
            <div className='h-4 w-20 bg-gray-200 dark:bg-white/10 rounded'/>
        </div>
        <div className='h-3 w-32 bg-gray-200 dark:bg-white/10 rounded pt-3 mt-3 border-t border-gray-100 dark:border-white/5' />
      </div>
    </div>
  );
}
