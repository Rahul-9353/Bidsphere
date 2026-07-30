export default function GradientBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-surface-dark transition-colors duration-300">
           
            {/* Top left */}
            <div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 dark:opacity-50" 
                style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
            />

            {/* Bottom right */}
            <div 
                className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl opacity-30 dark:opacity-40" 
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
            />

            {/* Center */}
            <div 
                className="absolute top-0.5 left-0.5 -translate-x-0.5 -translate-y-0.5 w-[500px] h-[500px] rounded-full blur-3xl opacity-60 dark:opacity-30"
                style={{ background: 'radial-gradient(circle, #ffffff, transparent 70%)' }}
            />
        </div>
    );
}