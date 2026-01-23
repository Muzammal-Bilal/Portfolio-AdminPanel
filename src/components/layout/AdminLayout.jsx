import { useEffect, useMemo, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, User, Info, Briefcase, FolderKanban, Wrench, Award, Mail, Settings,
  LogOut, Menu, X, Sun, Moon, ChevronRight, Home
} from 'lucide-react';
import toast from 'react-hot-toast';

import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { usePortfolio } from '../../contexts/PortfolioContext';

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

const SIDEBAR_OPEN = 280;
const SIDEBAR_COLLAPSED = 84;

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { profile } = usePortfolio();

  const navigate = useNavigate();
  const location = useLocation();

  const currentPageTitle = useMemo(() => {
    const currentItem = sidebarItems.find((item) => item.path === location.pathname);
    return currentItem?.label || 'Dashboard';
  }, [location.pathname]);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileSidebarOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin');
    } catch {
      toast.error('Failed to logout');
    }
  };

  // SINGLE SOURCE OF TRUTH FOR DESKTOP OFFSET
  const sidebarWidth = sidebarOpen ? SIDEBAR_OPEN : SIDEBAR_COLLAPSED;

  return (
    <div
      className="min-h-dvh bg-[var(--bg-primary)]"
      style={{
        // used by main + any fixed admin toolbars
        ['--admin-sidebar-w']: `${sidebarWidth}px`
      }}
    >
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
        className="fixed top-0 left-0 h-dvh bg-[var(--bg-card)] border-r border-[var(--border-default)] z-40 hidden lg:block"
      >
        {/* ... your sidebar content unchanged ... */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-[var(--border-default)]">
          {/* brand */}
          <div className="min-w-0">
            {sidebarOpen && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-lg text-[var(--text-primary)] truncate">
                    Admin Panel
                  </div>
                  <div className="text-xs text-[var(--text-muted)] truncate">Content Operations</div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors shrink-0"
            type="button"
          >
            <ChevronRight size={20} className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

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
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon size={20} className="shrink-0" />
                  {sidebarOpen && <span className="font-medium truncate">{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-[var(--border-default)] space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all"
            type="button"
            title={!sidebarOpen ? 'Toggle theme' : undefined}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span className="font-medium">Toggle Theme</span>}
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all"
            title={!sidebarOpen ? 'View site' : undefined}
          >
            <Home size={20} />
            {sidebarOpen && <span className="font-medium">View Site</span>}
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            type="button"
            title={!sidebarOpen ? 'Logout' : undefined}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Mobile Header (unchanged) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--bg-card)] border-b border-[var(--border-default)] z-30 lg:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            type="button"
          >
            <Menu size={24} />
          </button>

          <span className="font-display font-bold text-lg text-[var(--text-primary)] truncate max-w-[60vw]">
            {currentPageTitle}
          </span>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
            type="button"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg-card)] border-r border-[var(--border-default)] z-[70] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Admin navigation"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-[var(--border-default)]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center shrink-0">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <span className="font-display font-bold text-lg text-[var(--text-primary)] truncate">
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

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3">
                  <ul className="space-y-1">
                    {sidebarItems.map((item) => (
                      <li key={item.path}>
                        <NavLink
                          to={item.path}
                          onClick={() => setMobileSidebarOpen(false)}
                          className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                            ${
                              isActive
                                ? 'bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 text-[var(--color-primary-500)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                            }
                          `}
                        >
                          <item.icon size={20} className="shrink-0" />
                          <span className="font-medium">{item.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-[var(--border-default)] space-y-2">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all"
                    type="button"
                  >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    <span className="font-medium">Toggle Theme</span>
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all"
                  >
                    <Home size={20} />
                    <span className="font-medium">View Site</span>
                  </a>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
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


      {/* Main Content - USE THE CSS VAR (guaranteed alignment) */}
      <main
        className="min-h-dvh pt-16 lg:pt-0 transition-[padding] duration-300"
        style={{
          paddingLeft: 'var(--admin-sidebar-w)'
        }}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Your desktop header (optional) */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div className="min-w-0">
              <h1 className="text-2xl font-display font-bold text-[var(--text-primary)] truncate">
                {currentPageTitle}
              </h1>
              <p className="text-[var(--text-muted)] mt-1">Manage your portfolio content</p>
            </div>

            <div className="flex items-center gap-4">
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
