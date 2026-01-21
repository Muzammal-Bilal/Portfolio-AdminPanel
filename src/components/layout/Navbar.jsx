import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download, Code2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { usePortfolio } from '../../contexts/PortfolioContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Experience' },
  { path: '/projects', label: 'Projects' },
  { path: '/skills', label: 'Skills' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/contact', label: 'Contact' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { profile } = usePortfolio();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 14);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  const navShell = isScrolled
    ? 'glass shadow-lg border-b border-[var(--border-default)]'
    : 'bg-[var(--bg-primary)]/60 backdrop-blur-md border-b border-transparent';

  return (
    <>
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navShell}`}
      >
        <div className="container-custom">
          {/* Responsive header height: 64px mobile, 80px lg+ */}
          <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center h-16 lg:h-20 gap-3">
            {/* LEFT: Brand */}
            <div className="min-w-0">
              <Link to="/" className="flex items-center gap-2 group min-w-0">
                <span
                  className="min-w-0 truncate text-[var(--text-primary)] text-xl sm:text-2xl lg:text-3xl leading-none font-display font-semibold tracking-wide"
                  style={{ fontFamily: 'cursive' }}
                  title={profile?.name || 'Portfolio'}
                >
                  {profile?.name || 'Portfolio'}
                </span>
                <span className="shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                  <Code2 size={18} />
                </span>
              </Link>
            </div>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="navUnderline"
                          className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[var(--text-primary)]"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}

              <NavLink
                to="/resume"
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Resume
                    {isActive && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[var(--text-primary)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center justify-end gap-2 lg:gap-3 justify-self-end">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-14 h-8 rounded-full border border-[var(--border-default)]
                           bg-[var(--bg-tertiary)]/70 backdrop-blur
                           hover:bg-[var(--bg-tertiary)] transition-colors"
                aria-label="Toggle theme"
                type="button"
              >
                <span
                  className={`absolute top-1 left-1 w-6 h-6 rounded-full
                              bg-[var(--bg-card)] shadow-sm transition-transform duration-300
                              ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
                />
                <span className="absolute top-1/2 -translate-y-1/2 left-2 text-[var(--text-muted)]">
                  <Moon size={14} />
                </span>
                <span className="absolute top-1/2 -translate-y-1/2 right-2 text-[var(--text-muted)]">
                  <Sun size={14} />
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)]
                           hover:bg-[var(--border-default)] transition-colors"
                aria-label="Toggle menu"
                type="button"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Spacer = FIX. Reserves the fixed header height so page content never hides behind navbar */}
      <div className="h-16 lg:h-20" aria-hidden="true" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-card)] border-l border-[var(--border-default)] z-50 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-default)]">
                  <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                    Menu
                  </span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors"
                    type="button"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                          flex items-center px-6 py-4 text-base font-medium transition-colors
                          ${
                            isActive
                              ? 'text-[var(--text-primary)] bg-[var(--bg-tertiary)] border-r-2 border-[var(--text-primary)]'
                              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                          }
                        `}
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.05 }}
                  >
                    <NavLink
                      to="/resume"
                      className={({ isActive }) => `
                        flex items-center px-6 py-4 text-base font-medium transition-colors
                        ${
                          isActive
                            ? 'text-[var(--text-primary)] bg-[var(--bg-tertiary)] border-r-2 border-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                        }
                      `}
                    >
                      Resume
                    </NavLink>
                  </motion.div>
                </div>

                <div className="p-6 border-t border-[var(--border-default)]">
                  <Link
                    to="/resume"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
                               bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white font-medium hover:shadow-lg transition-all"
                  >
                    <Download size={18} />
                    Download Resume
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
