import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const ResumePage = () => {
  const { profile, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            Resume
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            My Resume
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto">
            Download or view my complete resume with detailed work history, skills, and achievements
          </p>
        </motion.div>

        {/* Resume Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] overflow-hidden"
        >
          {/* Resume Preview */}
          <div className="aspect-[8.5/11] bg-white relative">
            {profile?.resumeUrl ? (
              <iframe
                src={profile.resumeUrl}
                className="w-full h-full"
                title="Resume Preview"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-tertiary)]">
                <FileText className="w-24 h-24 text-[var(--text-muted)] mb-6" />
                <p className="text-[var(--text-muted)] text-lg mb-2">Resume Preview</p>
                <p className="text-sm text-[var(--text-muted)]">
                  Upload a PDF in the admin panel to enable preview
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {profile?.resumeUrl ? (
                <>
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium hover:bg-[var(--border-default)] transition-colors"
                  >
                    <Eye size={20} />
                    View Full Screen
                  </a>
                  <a
                    href={profile.resumeUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white font-medium hover:shadow-lg hover:shadow-[var(--color-primary-500)]/25 transition-all"
                  >
                    <Download size={20} />
                    Download PDF
                  </a>
                </>
              ) : (
                <p className="text-[var(--text-muted)]">
                  Resume not available yet. Please check back later.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">2+</div>
            <div className="text-[var(--text-muted)]">Years Experience</div>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">5</div>
            <div className="text-[var(--text-muted)]">Certifications</div>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] text-center">
            <div className="text-3xl font-display font-bold gradient-text mb-2">15+</div>
            <div className="text-[var(--text-muted)]">Projects Completed</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePage;
