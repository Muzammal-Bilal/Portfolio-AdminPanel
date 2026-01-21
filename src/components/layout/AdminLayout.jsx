import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  User,
  Info,
  Briefcase,
  FolderKanban,
  Wrench,
  Award,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { usePortfolio } from '../../contexts/PortfolioContext';
import toast from 'react-hot-toast';

const sidebarItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/profile', icon: User, label: 'Profile/Hero' },
  { path: '/admin/about', icon: Info, label: 'About' },
  { path: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/admin/skills', icon: Wrench, label: 'Skills' },
  { path: '/admin/certifications', icon: Award, label: 'Certifications' },
  { path: '/admin/contact', icon: Mail, label: 'Contact' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' }
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { profile } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  // Lock background scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileSidebarOpen]);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const getCurrentPageTitle = () => {
    const currentItem = sidebarItems.find((item) => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed top-0 left-0 h-screen bg-[var(--bg-card)] border-r border-[var(--border-default)] z-40 hidden lg:block"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-[var(--border-default)]">
            <AnimatePresence mode="wait">
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                    Admin Panel
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors"
              type="button"
              aria-label="Toggle sidebar"
            >
              <ChevronRight
                size={20}
                className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 text-[var(--color-primary-500)] border border-[var(--color-primary-500)]/20'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    <AnimatePresence mode="wait">
                      {sidebarOpen && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="font-medium whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-[var(--border-default)] space-y-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all"
            >
              <Home size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">View Site</span>}
            </a>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
              type="button"
            >
              <LogOut size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--bg-card)] border-b border-[var(--border-default)] z-30 lg:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            type="button"
            aria-label="Open sidebar"
          >
            <Menu size={24} />
          </button>

          <span className="font-display font-bold text-lg text-[var(--text-primary)] truncate max-w-[60vw]">
            {getCurrentPageTitle()}
          </span>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            type="button"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-card)] border-r border-[var(--border-default)] z-50 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                      Admin
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                    type="button"
                    aria-label="Close sidebar"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3">
                  <ul className="space-y-1">
                    {sidebarItems.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                            ${
                              isActive
                                ? 'bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 text-[var(--color-primary-500)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                            }
                          `}
                        >
                          <item.icon size={20} />
                          <span className="font-medium">{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="p-4 border-t border-[var(--border-default)] space-y-2">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]"
                  >
                    <Home size={20} />
                    <span className="font-medium">View Site</span>
                  </a>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10"
                    type="button"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`
          min-h-screen transition-all duration-300
          pt-16 lg:pt-0
          ${sidebarOpen ? 'lg:pl-[280px]' : 'lg:pl-20'}
        `}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Page Header (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="min-w-0">
              <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] truncate">
                {getCurrentPageTitle()}
              </h1>
              <p className="text-[var(--text-muted)] mt-1">Manage your portfolio content</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                type="button"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-[var(--border-default)]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                  <span className="text-white font-bold">{profile?.name?.charAt(0) || 'A'}</span>
                </div>
                <div className="hidden xl:block">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {profile?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
