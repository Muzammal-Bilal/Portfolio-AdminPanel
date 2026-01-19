import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, 
  Info, 
  Briefcase, 
  FolderKanban, 
  Wrench, 
  Award, 
  Mail, 
  Settings,
  Eye,
  Edit,
  Database,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const { 
    profile, 
    about,
    experience, 
    projects, 
    skills, 
    certifications, 
    contact,
    loading,
    isInitialized,
    initializeDatabase
  } = usePortfolio();

  const handleInitialize = async () => {
    try {
      await initializeDatabase();
      toast.success('Database initialized successfully!');
    } catch (error) {
      toast.error('Failed to initialize database');
    }
  };

  if (loading) {
    return <Loading />;
  }

  const sections = [
    { 
      name: 'Profile/Hero', 
      icon: User, 
      path: '/admin/profile',
      status: profile?.name ? 'complete' : 'empty',
      count: profile?.name ? 1 : 0
    },
    { 
      name: 'About', 
      icon: Info, 
      path: '/admin/about',
      status: about?.longBio ? 'complete' : 'empty',
      count: about?.longBio ? 1 : 0
    },
    { 
      name: 'Experience', 
      icon: Briefcase, 
      path: '/admin/experience',
      status: experience?.length > 0 ? 'complete' : 'empty',
      count: experience?.length || 0
    },
    { 
      name: 'Projects', 
      icon: FolderKanban, 
      path: '/admin/projects',
      status: projects?.length > 0 ? 'complete' : 'empty',
      count: projects?.length || 0
    },
    { 
      name: 'Skills', 
      icon: Wrench, 
      path: '/admin/skills',
      status: skills?.length > 0 ? 'complete' : 'empty',
      count: skills?.length || 0
    },
    { 
      name: 'Certifications', 
      icon: Award, 
      path: '/admin/certifications',
      status: certifications?.length > 0 ? 'complete' : 'empty',
      count: certifications?.length || 0
    },
    { 
      name: 'Contact', 
      icon: Mail, 
      path: '/admin/contact',
      status: contact?.email ? 'complete' : 'empty',
      count: contact?.email ? 1 : 0
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/admin/settings',
      status: 'complete',
      count: null
    }
  ];

  const totalItems = experience?.length + projects?.length + skills?.length + certifications?.length || 0;
  const publishedItems = [
    ...experience?.filter(e => e.published) || [],
    ...projects?.filter(p => p.published) || [],
    ...skills?.filter(s => s.published) || [],
    ...certifications?.filter(c => c.published) || []
  ].length;

  return (
    <div className="space-y-8">
      {/* Database Status */}
      {!isInitialized && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[var(--color-warning-500)]/10 border border-[var(--color-warning-500)]/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--color-warning-500)]/20 flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-[var(--color-warning-500)]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                Database Not Initialized
              </h3>
              <p className="text-[var(--text-muted)] mb-4">
                Your portfolio is using seed data. Initialize the database to enable editing and persistence.
              </p>
              <Button onClick={handleInitialize} size="sm">
                Initialize Database
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
        >
          <div className="text-3xl font-display font-bold gradient-text mb-1">
            {totalItems}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Total Items</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
        >
          <div className="text-3xl font-display font-bold text-[var(--color-success-500)] mb-1">
            {publishedItems}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Published</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
        >
          <div className="text-3xl font-display font-bold text-[var(--color-warning-500)] mb-1">
            {totalItems - publishedItems}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Drafts</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
        >
          <div className="text-3xl font-display font-bold text-[var(--color-primary-500)] mb-1">
            {sections.filter(s => s.status === 'complete').length}
          </div>
          <div className="text-sm text-[var(--text-muted)]">Sections Complete</div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium hover:bg-[var(--border-default)] transition-colors"
        >
          <Eye size={18} />
          Preview Site
        </a>
      </div>

      {/* Sections Grid */}
      <div>
        <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">
          Manage Sections
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={section.path}
                className="block p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--color-primary-500)]/30 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center group-hover:from-[var(--color-primary-500)]/30 group-hover:to-[var(--color-accent-500)]/30 transition-colors">
                    <section.icon className="w-6 h-6 text-[var(--color-primary-500)]" />
                  </div>
                  {section.status === 'complete' ? (
                    <CheckCircle className="w-5 h-5 text-[var(--color-success-500)]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-[var(--color-warning-500)]" />
                  )}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary-500)] transition-colors">
                  {section.name}
                </h3>
                {section.count !== null && (
                  <p className="text-sm text-[var(--text-muted)]">
                    {section.count} {section.count === 1 ? 'item' : 'items'}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity - Placeholder */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
        <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-4">
          Quick Tips
        </h2>
        <ul className="space-y-3 text-[var(--text-muted)]">
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary-500)]">•</span>
            Use the sidebar to navigate between sections
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary-500)]">•</span>
            Toggle "Published" to control what appears on the public site
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary-500)]">•</span>
            Drag and drop to reorder experience and projects
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[var(--color-primary-500)]">•</span>
            Preview your changes before publishing
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
