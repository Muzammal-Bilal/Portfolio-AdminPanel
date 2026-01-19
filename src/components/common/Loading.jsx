import { motion } from 'framer-motion';

export const Loading = ({ fullScreen = false, text = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div 
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-[var(--border-default)]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[var(--color-primary-500)] animate-spin" />
      </motion.div>
      <motion.p 
        className="text-[var(--text-secondary)] font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      {content}
    </div>
  );
};

export const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseClasses = 'skeleton rounded';
  
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    avatar: 'h-20 w-20 rounded-full',
    card: 'h-48 w-full',
    button: 'h-10 w-24'
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
};

export const CardSkeleton = () => (
  <div className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-default)]">
    <Skeleton variant="title" className="mb-4" />
    <Skeleton className="mb-2" />
    <Skeleton className="mb-2" />
    <Skeleton className="w-2/3" />
  </div>
);

export default Loading;
