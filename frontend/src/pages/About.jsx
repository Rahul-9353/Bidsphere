import { Bell, Gavel, Globe, Icon, Zap } from 'lucide-react';
import React from 'react'
import logo from '../assets/logo.png';


const FEATURES = [
    { icon: Zap, title: 'Real-Time Bidding', desc: 'Watch bids update instantly across every device - no refreshing needed.' },
    { icon: Bell, title: 'Instant Notifications', desc: 'Get notified the moment someone outbids you, so you never miss a chance to respond.' },
    { icon: Globe, title: 'Live Currency Conversion', desc: 'Set bid amounts converted to your preferred currency in real time.' },
    { icon: Gavel, title: 'Fair, Transparent Bidding', desc: 'A clear increment system keeps every auction fair for buyers and sellers alike.' },
];

export default function About() {
  return (
    <div className='max-w-4xl m-auto px-6 py-16'>
      <div className="text-center mb-16">
        <img src={logo} alt="BidSphere" className='w-16 h-16 object-contain mx-auto mb-6' />
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-4">
            About BidSphere
        </h1>
        <p className="font-sans text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            BidSphere is a real-time auction platform built to make online bidding fast, transparent, and genuinely exciting - the way live auctions feel in person.
        </p>
      </div>

      <div className="bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 mb-12">
        <h2 className="font-display text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Story
        </h2>
        <p className="font-sans text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Traditipnal online auctions often feel slow and disconnected - you place a bid, then wait, refresh, and hope you didn't miss anything. We built BidSphere to fix that.
        </p>
        <p className="font-sans text-gray-600 dark:text-gray-300 leading-relaxed">
            Every bid you place is broadcast instantly to everyone watching an auction. If someone outbids you, you find out immediately - not five minutes later. that's the whole idea: bring the energy of a live auction room to the web.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div 
                key={title}
                className="bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-6"
            >
                <div className="w-11 h-11 rounded-xl bg-primary-600/10 dark:bg-primary-400/10 flex items-center justify-center mb-4">
                    <Icon className="text-primary-600 dark:text-primary-400" size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 dark:text-white mb-1.5">
                    {title}
                </h3>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400">
                    {desc}
                </p>
            </div>
        ))}
      </div>
    </div>
  );
}
