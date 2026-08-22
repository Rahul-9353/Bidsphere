import React, { useState } from 'react'
import { sendContactMessage } from '../api/contactApi';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSending(true);
        try {
            await sendContactMessage(formData);
            setSent(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

  return (
    <div className='max-w-2xl mx-auto px-6 py-16'>
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-600/10 dark:bg-primary-400/10 mb-4">
            <Mail className="text-primary-600 dark:text-primary-400" size={28} />
        </div>
        <h1 className="font-display text-4xl font-semibold text-gray-900 dark:text-white mb-3">
            Get in Touch
        </h1>
        <p className="font-sans text-gray-500 dark:text-gray-400">
            Questions, feedback, or issues - we'd love to hear from you.
        </p>
      </div>

      {sent ? (
        <div className="bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-10 text-center">
            <CheckCircle2 className='text-green-500 mx-auto mb-4' size={40} />
            <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Message sent!
            </h2>
            <p className="font-sans text-gray-500 dark:text-gray-400 mb-6">
                Thanks for reaching out - we'll get back to you soon.
            </p>
            <button
                onClick={() => setSent(false)}
                className='text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline'
            >
                Send another message
            </button>
        </div>
      ) : (
        <form 
            onSubmit={handleSubmit}
            className='bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-md border border-gray-200/50 dark:border-white/10 rounded-2xl p-8 space-y-5'
        >
            {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-sans">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                        Name
                    </label>
                    <input 
                        type="text" name='name' required
                        value={formData.name} onChange={handleChange}
                        className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                        Email
                    </label>
                    <input 
                        type="email" name="email" required
                        value={formData.email} onChange={handleChange}
                        className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all' 
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                    Subject
                </label>
                <input 
                    type="text" name='subject' required
                    value={formData.subject} onChange={handleChange}
                    placeholder="What's this about?"
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 font-sans">
                    Message
                </label>
                <textarea 
                    name="message" rows={5} required
                    value={formData.message} onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none' 
                />
            </div>

            <button
                type='submit'
                disabled={sending}
                className='w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium transition-colors'
            >
                {sending && <Loader2 size={18} className='animate-spin' />}
                {sending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
      )}
    </div>
  );
}
