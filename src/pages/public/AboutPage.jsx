import { motion } from 'framer-motion';
import { CheckCircle, GraduationCap, MapPin } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';
import bahriaLogo from '../../assets/education/bahria.png';

export const AboutPage = () => {
  const { about, profile, education, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  // UI-only helper: uses dates if you add them later; otherwise shows status
  const getEduMetaLine = (edu) => {
    const start = edu?.startDate || edu?.start || edu?.from;
    const end = edu?.endDate || edu?.end || edu?.to;

    if (start && end) return `${start} – ${end}`;
    if (start && !end) return `${start} – Present`;
    return edu?.status || '';
  };

  const getEduBullets = (edu) => {
    if (Array.isArray(edu?.bullets) && edu.bullets.length) return edu.bullets;
    if (Array.isArray(edu?.highlights) && edu.highlights.length) return edu.highlights;
    if (edu?.description) return [edu.description];
    return [];
  };

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            About Me
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] leading-tight tracking-tight">
            {about?.headline || 'Transforming Ideas into Intelligent Solutions'}
          </h1>
        </motion.div>

        {/* 12-col grid = less cramped than lg:grid-cols-3 */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="lg:col-span-8"
          >
            {/* Long Bio (readability pass) */}
            <section className="mb-12 sm:mb-14">
              <div
                className="
                  prose prose-lg max-w-none
                  text-[var(--text-secondary)]
                  leading-relaxed
                  prose-p:my-4
                  prose-headings:mt-8
                  prose-strong:text-[var(--text-primary)]
                "
                style={{ maxWidth: '72ch' }}
                dangerouslySetInnerHTML={{ __html: about?.longBio || '' }}
              />
            </section>

            {/* Highlights (less visually heavy, better spacing) */}
            {about?.highlights?.length > 0 && (
              <section className="mb-14">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] mb-6">
                  What I Bring to the Table
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {about.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.06 }}
                      className="
                        flex items-start gap-3
                        p-4 sm:p-5
                        rounded-2xl
                        bg-[var(--bg-card)]
                        border border-[var(--border-default)]
                      "
                    >
                      <CheckCircle className="w-5 h-5 text-[var(--color-success-500)] flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--text-primary)] leading-snug">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Education (Screenshot-style + added top/bottom spacing) */}
            {education?.length > 0 && (
              <section className="mt-14 sm:mt-16 mb-12 sm:mb-16">
                {/* Optional divider to clearly separate from above content */}
                <div className="h-px w-full bg-[var(--border-default)]/60 mb-10 sm:mb-12" />

                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl sm:text-6xl font-display font-medium text-[var(--text-primary)] tracking-tight mb-8"
                >
                  Education
                </motion.h2>

                <div className="divide-y divide-[var(--border-default)]">
                  {education
                    .filter((e) => e.published)
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((edu, index) => {
                      const metaLine = getEduMetaLine(edu);
                      const bullets = getEduBullets(edu);

                      return (
                        <motion.article
                          key={edu.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.12 + index * 0.06 }}
                          className="py-8 sm:py-10"
                        >
                          <div className="flex flex-col sm:flex-row gap-5 sm:gap-8">
                            {/* Left logo circle */}
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[var(--border-default)] bg-white flex items-center justify-center">
                                <img
                                  src={edu.logo || edu.logoUrl || edu.image || bahriaLogo}
                                  alt={edu.institution || 'Education'}
                                  className="w-full h-full object-contain p-2 block"
                                />
                              </div>
                            </div>

                            {/* Right content */}
                            <div className="min-w-0">
                              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-[var(--text-primary)] leading-tight">
                                {edu.institution}
                              </h3>

                              <p className="mt-2 text-lg sm:text-xl font-semibold text-[var(--text-primary)]/90">
                                {edu.degree}
                              </p>

                              {metaLine && (
                                <p className="mt-1 text-base sm:text-lg text-[var(--text-secondary)]">
                                  {metaLine}
                                </p>
                              )}

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
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                </div>
              </section>
            )}
          </motion.div>

          {/* Sidebar (sticky + spacing tuned) */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="lg:col-span-4 lg:sticky lg:top-28 self-start space-y-6"
          >
            {/* Profile Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden border-4 border-[var(--bg-tertiary)] mb-5">
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

              <h3 className="text-xl font-display font-bold text-[var(--text-primary)] text-center">
                {profile?.name || 'Muzammal Bilal'}
              </h3>
              <p className="text-[var(--text-muted)] text-center mt-1">
                {profile?.title || 'AI/ML Engineer'}
              </p>

              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)] mt-3">
                <MapPin size={16} />
                <span>{profile?.location || 'Pakistan'}</span>
              </div>
            </div>

            {/* Quick Stats */}
            {profile?.stats && (
              <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">
                  Quick Stats
                </h3>

                <div className="divide-y divide-[var(--border-default)]/70">
                  {profile.stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between py-3">
                      <span className="text-[var(--text-muted)] text-sm">
                        {stat.label}
                      </span>
                      <span className="font-bold gradient-text">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fun Facts */}
            <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 border border-[var(--color-primary-500)]/20">
              <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-4">
                Fun Facts
              </h3>
              <ul className="space-y-2.5 text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">🎓</span>
                  <span>Pursuing Master's in AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">🏆</span>
                  <span>Employee of the Month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">👥</span>
                  <span>Impacted 500+ students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">📊</span>
                  <span>45% efficiency improvement</span>
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
