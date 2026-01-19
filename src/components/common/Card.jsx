import { motion } from 'framer-motion';

export const Card = ({
  children,
  className = '',
  hover = true,
  padding = 'md',
  variant = 'default',
  ...props
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  
  const variants = {
    default: 'bg-[var(--bg-card)] border-[var(--border-default)]',
    elevated: 'bg-[var(--bg-elevated)] border-[var(--border-default)] shadow-lg',
    glass: 'glass',
    gradient: 'bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] border-[var(--border-default)]'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const hoverClasses = hover 
    ? 'hover:border-[var(--color-primary-500)]/30 hover:shadow-xl hover:-translate-y-1' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${variants[variant]} ${paddings[padding]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
