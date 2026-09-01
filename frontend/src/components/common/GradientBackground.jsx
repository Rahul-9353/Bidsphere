import background from '../../assets/background.png';

export default function GradientBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-surface-dark transition-colors duration-300">
            
            <div 
                className="absolute inset-0 text-gray-400 dark:text-white opacity-[0.15] dark:opacity-[0.08]"
                style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'repeat' }} 
            />

            {/* Top left */}
            <div
                className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-55 dark:opacity-40" 
                style={{ background: 'radial-gradient(circle, #7c3aed, transparent 65%)' }}
            />

            {/* top right */}
            <div 
                className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-55 dark:opacity-40"
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent 65%)' }}
            />

            {/* Bottom left */}
            <div 
                className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-55 dark:opacity-40"
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent 65%)' }}/>

            {/* Bottom right */}
            <div 
                className="absolute -bottom-40 -right-40 w-[550px] h-[550px] rounded-full blur-3xl opacity-55 dark:opacity-40" 
                style={{ background: 'radial-gradient(circle, #7c3aed, transparent 65%)' }}
            />

            {/* Center */}
            <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-60 dark:opacity-45"
                style={{ background: 'radial-gradient(circle, #ec4899, transparent 60%)' }}
            />
        </div>
    );
}