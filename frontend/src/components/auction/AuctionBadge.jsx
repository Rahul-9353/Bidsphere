import React from 'react'

export default function AuctionBadge({ auction, bidCount = 0}) {
    const badges = [];

    const hoursLeft = (new Date(auction.endTime) - new Date()) / (1000 * 60 * 60);
    const hoursSinceCreated = (new Date() - new Date(auction.createdAt)) / (1000 * 60 * 60);

    if (hoursLeft > 0 && hoursLeft  < 1) {
        badges.push({ text: 'Ending Soon', className: 'bg-red-500 text-white' });
    }
    if (hoursSinceCreated < 24) {
        badges.push({ text: 'New', className: 'bg-green-500 text-white' });
    }
    if (bidCount >= 10) {
        badges.push({ text: '🔥 Hot', className: 'bg-accent-500 text-white' });
    }

    if (badges.length === 0) {
        return null;
    }
    return (
        <div className='absolute top-3 left-3 flex flex-col gap-1.5 z-10'>
            {badges.map((b) => (
                <span key={b.text} className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${b.className}`}>
                    {b.text}
                </span>
            ))}
        </div>
    );
}
