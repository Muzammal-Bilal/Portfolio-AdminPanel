import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const AboutPage = () => {
  const { about, profile, education, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            About Me
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            {about?.headline || 'Transforming Ideas into Intelligent Solutions'}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Bio */}
            <div 
              className="prose prose-lg max-w-none text-[var(--text-secondary)] mb-12"
              dangerouslySetInnerHTML={{ __html: about?.longBio || '' }}
            />

            {/* Highlights */}
            {about?.highlights && about.highlights.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
                  What I Bring to the Table
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {about.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]"
                    >
                      <CheckCircle className="w-5 h-5 text-[var(--color-success-500)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-primary)]">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.filter(e => e.published).map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-[var(--color-primary-500)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                          {edu.degree}
                        </h3>
                        <p className="text-[var(--text-secondary)]">{edu.institution}</p>
                        {edu.status && (
                          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                            edu.status === 'In Progress' 
                              ? 'bg-[var(--color-warning-500)]/10 text-[var(--color-warning-500)]'
                              : 'bg-[var(--color-success-500)]/10 text-[var(--color-success-500)]'
                          }`}>
                            {edu.status}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[var(--bg-tertiary)] mb-6">
                {profile?.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                    <span className="text-white text-3xl font-bold">
                      {profile?.name?.charAt(0) || 'M'}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] text-center mb-1">
                {profile?.name || 'Muzammal Bilal'}
              </h3>
              <p className="text-[var(--text-muted)] text-center mb-4">
                {profile?.title || 'AI/ML Engineer'}
              </p>
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <MapPin size={16} />
                <span>Pakistan</span>
              </div>
            </div>

            {/* Quick Stats */}
            {profile?.stats && (
              <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-4">
                  {profile.stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-[var(--text-muted)]">{stat.label}</span>
                      <span className="font-bold gradient-text">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun Facts */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 border border-[var(--color-primary-500)]/20">
              <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">
                Fun Facts
              </h3>
              <ul className="space-y-3 text-[var(--text-secondary)]">
                <li className="flex items-center gap-2">
                  <span>🎓</span> Pursuing Master's in AI
                </li>
                <li className="flex items-center gap-2">
                  <span>🏆</span> Employee of the Month
                </li>
                <li className="flex items-center gap-2">
                  <span>👥</span> Impacted 500+ students
                </li>
                <li className="flex items-center gap-2">
                  <span>📊</span> 45% efficiency improvement
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
