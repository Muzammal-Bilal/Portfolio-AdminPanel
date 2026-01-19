import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const ExperiencePage = () => {
  const { experience, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  const publishedExperience = experience?.filter(exp => exp.published) || [];

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
            Work Experience
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            Professional Journey
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            A track record of delivering impactful AI solutions and driving innovation across organizations
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary-500)] via-[var(--color-accent-500)] to-transparent transform md:-translate-x-1/2" />

          {publishedExperience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] transform -translate-x-1/2 md:-translate-x-1/2 mt-8 md:mt-0 md:top-8 z-10 ring-4 ring-[var(--bg-primary)]" />

              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}>
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--color-primary-500)]/30 hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-[var(--color-primary-500)]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                        {exp.role}
                      </h3>
                      <p className="text-[var(--color-primary-500)] font-medium">
                        {exp.company}
                      </p>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 rounded-full bg-[var(--color-success-500)]/10 text-[var(--color-success-500)] text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      <span>{exp.startDate} — {exp.endDate || 'Present'}</span>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <p className="text-[var(--text-secondary)] mb-4">
                      {exp.description}
                    </p>
                  )}

                  {/* Bullets */}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-500)] mt-2 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Tags */}
                  {exp.techTags && exp.techTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-default)]">
                      {exp.techTags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-lg bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date on opposite side (desktop) */}
              <div className={`hidden md:flex md:w-1/2 items-start pt-8 ${
                index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
              }`}>
                <div className="text-right">
                  <span className="text-lg font-display font-bold gradient-text">
                    {exp.startDate}
                  </span>
                  <span className="text-[var(--text-muted)]"> — </span>
                  <span className="text-lg font-display font-bold text-[var(--text-primary)]">
                    {exp.endDate || 'Present'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '2+', label: 'Years Experience' },
            { value: '4+', label: 'Companies' },
            { value: '45%', label: 'Efficiency Boost' },
            { value: '500+', label: 'Students Impacted' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]"
            >
              <div className="text-3xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;
