import { Gavel } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className='border-t border-gray-200/50 dark:border-white/10 bg-white/60 dark:bg-surface-darkCard/60 backdrop-blur-md mt-20'>
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
            <Link to='/' className="flex items-center gap-2 mb-3">
                <img src={logo} alt="BidSphere" className='w-9 h-9 object-contain' />
                <span className="font-display text-xl font-semibold text-gray-900 dark:text-white">
                    Bid<span className='text-primary-600 dark:text-primary-400'>Sphere</span>
                </span>
            </Link>
            <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                Live auctions, real-time bidding, and instant notifications - all in one place.
            </p>
        </div>

        {/* Quick links */}
        <div>
            <h4 className="font-sans text-sm font-semibold text-gray-900 dark:text-white mb-3">Explore</h4>
            <ul className="space-y-2 font-sans text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
                <li><Link to="/auctions" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Browse Auctions</Link></li>
                <li><Link to="/create-auction" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sell an Item</Link></li>
            </ul>
        </div>

        {/* Company */}
        <div>
            <h4 className="font-sans text-sm font-semibold text-gray-900 dark:text-white mb-3">Company</h4>
            <ul className="space-y-2 font-sans text-sm text-gray-500 dark:text-gray-400">
                <li><Link to="/about" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
        </div>
      </div>

      <div className="border-t border-gray-200/50 dark:border-white/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        <p className="font-sans text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Gavel size={12} /> © {new Date().getFullYear()} BidSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
