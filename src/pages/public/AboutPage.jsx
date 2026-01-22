import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, MapPin } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const AboutPage = () => {
  const { about, profile, education, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  // UI-only helper (does not change data flow)
  const getEduDateRange = (edu) => {
    const start =
      edu?.startDate ||
      edu?.start ||
      edu?.from ||
      edu?.startMonthYear ||
      edu?.start_year ||
      edu?.start_year_month;

    const end =
      edu?.endDate ||
      edu?.end ||
      edu?.to ||
      edu?.endMonthYear ||
      edu?.end_year ||
      edu?.end_year_month;

    if (start && end) return `${start} – ${end}`;
    if (start && !end) return `${start} – Present`;
    return edu?.status || '';
  };

  const getEduBullets = (edu) => {
    // Supports multiple possible shapes without requiring schema changes
    if (Array.isArray(edu?.highlights) && edu.highlights.length > 0) return edu.highlights;
    if (Array.isArray(edu?.bullets) && edu.bullets.length > 0) return edu.bullets;
    if (edu?.description) return [edu.description];
    if (edu?.summary) return [edu.summary];
    return [];
  };

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            About Me
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6 leading-tight">
            {about?.headline || 'Transforming Ideas into Intelligent Solutions'}
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {/* Bio */}
            <div
              className="prose prose-lg max-w-none text-[var(--text-secondary)] mb-10 sm:mb-12"
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

            {/* Education (Updated to match screenshot layout + responsive) */}
            {education && education.length > 0 && (
              <section className="mt-6 sm:mt-8">
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl sm:text-6xl font-display font-medium text-[var(--text-primary)] tracking-tight mb-8 sm:mb-10"
                >
                  Education
                </motion.h2>

                <div className="divide-y divide-[var(--border-default)]">
                  {education
                    .filter((e) => e.published)
                    .map((edu, index) => {
                      const dateRange = getEduDateRange(edu);
                      const bullets = getEduBullets(edu);

                      return (
                        <motion.article
                          key={edu.id}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 + index * 0.08 }}
                          className="py-8 sm:py-10"
                        >
                          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                            {/* Left Logo / Avatar */}
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)] flex items-center justify-center">
                                {/* If you store a logo URL in your education doc (e.g., edu.logo / edu.image),
                                    it will render automatically. Otherwise fallback icon. */}
                                {edu?.logo || edu?.logoUrl || edu?.image ? (
                                  <img
                                    src={edu.logo || edu.logoUrl || edu.image}
                                    alt={edu.institution || 'Education'}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-[var(--text-primary)]/70" />
                                )}
                              </div>
                            </div>

                            {/* Right Content */}
                            <div className="min-w-0">
                              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[var(--text-primary)] leading-tight">
                                {edu.institution}
                              </h3>

                              <p className="mt-2 text-lg sm:text-xl font-semibold text-[var(--text-primary)]/90">
                                {edu.degree}
                              </p>

                              {dateRange ? (
                                <p className="mt-1 text-base sm:text-lg text-[var(--text-secondary)]">
                                  {dateRange}
                                </p>
                              ) : null}

                              {/* Optional bullet line(s) like screenshot */}
                              {bullets.length > 0 && (
                                <ul className="mt-4 space-y-2 text-[var(--text-secondary)]">
                                  {bullets.map((b, i) => (
                                    <li key={i} className="flex gap-3 leading-relaxed">
                                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--text-secondary)]/60 flex-shrink-0" />
                                      <span className="break-words">{b}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {/* Keep your status pill if you want; styled to be subtle and non-invasive */}
                              {edu.status && (
                                <div className="mt-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                                      edu.status === 'In Progress'
                                        ? 'bg-[var(--color-warning-500)]/10 text-[var(--color-warning-500)] border-[var(--color-warning-500)]/20'
                                        : 'bg-[var(--color-success-500)]/10 text-[var(--color-success-500)] border-[var(--color-success-500)]/20'
                                    }`}
                                  >
                                    {edu.status}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                </div>
              </section>
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
