import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white hover:shadow-lg hover:shadow-[var(--color-primary-500)]/25 focus:ring-[var(--color-primary-500)]',
    secondary: 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary-500)] hover:bg-[var(--bg-tertiary)] focus:ring-[var(--color-primary-500)]',
    ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] focus:ring-[var(--color-primary-500)]',
    danger: 'bg-[var(--color-error-500)] text-white hover:bg-red-600 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-base gap-2',
    lg: 'px-7 py-3.5 text-lg gap-2.5'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
