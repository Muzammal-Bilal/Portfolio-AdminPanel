import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
          error ? 'border-[var(--color-error-500)]' : 'border-[var(--border-default)]'
        } text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] transition-all duration-200`}
        {...props}
      />
      {error && (
        <p className="text-sm text-[var(--color-error-500)]">{error}</p>
      )}
    </div>
  );
};

export const PasswordInput = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={`w-full px-4 py-3 pr-12 rounded-xl bg-[var(--bg-secondary)] border ${
            error ? 'border-[var(--color-error-500)]' : 'border-[var(--border-default)]'
          } text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] transition-all duration-200`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      {error && (
        <p className="text-sm text-[var(--color-error-500)]">{error}</p>
      )}
    </div>
  );
};

export const Textarea = ({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
          error ? 'border-[var(--color-error-500)]' : 'border-[var(--border-default)]'
        } text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] transition-all duration-200 resize-none`}
        {...props}
      />
      {error && (
        <p className="text-sm text-[var(--color-error-500)]">{error}</p>
      )}
    </div>
  );
};

export const Select = ({
  label,
  error,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border ${
          error ? 'border-[var(--color-error-500)]' : 'border-[var(--border-default)]'
        } text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]/20 focus:border-[var(--color-primary-500)] transition-all duration-200`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-[var(--color-error-500)]">{error}</p>
      )}
    </div>
  );
};

export const Toggle = ({
  label,
  checked,
  onChange,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          checked 
            ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)]' 
            : 'bg-[var(--bg-tertiary)]'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
            checked ? 'left-7' : 'left-1'
          }`}
        />
      </button>
      {label && (
        <span className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </span>
      )}
    </div>
  );
};

export const TagInput = ({
  label,
  tags = [],
  onChange,
  placeholder = 'Add tag...',
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--text-primary)]">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] focus-within:ring-2 focus-within:ring-[var(--color-primary-500)]/20 focus-within:border-[var(--color-primary-500)]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-[var(--color-error-500)] transition-colors"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-muted)]"
        />
      </div>
    </div>
  );
};
