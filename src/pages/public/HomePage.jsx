import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Mail, Sparkles, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';
import { useEffect, useMemo, useState } from 'react';

export const HomePage = () => {
  const { profile, projects, skills, loading } = usePortfolio();

  // -------- Typewriter (UI-only) ----------
  const fullName = profile?.name || 'Muzammal Bilal';

  // If you ever want multiple rotating texts, add more items here.
  const typeTargets = useMemo(() => [fullName], [fullName]);

  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const current = typeTargets[loopIndex % typeTargets.length];

    // Speeds (tune as needed)
    const typingSpeed = 90;     // typing speed
    const deletingSpeed = 55;   // deleting speed
    const pauseAfterTyped = 900; // pause when fully typed
    const pauseAfterDeleted = 350; // pause when fully deleted

    let timeout;

    // When typing finished
    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterTyped);
      return () => clearTimeout(timeout);
    }

    // When deleting finished
    if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setLoopIndex((prev) => (prev + 1) % typeTargets.length);
      }, pauseAfterDeleted);
      return () => clearTimeout(timeout);
    }

    // Continue typing or deleting
    timeout = setTimeout(() => {
      const next = isDeleting
        ? current.substring(0, displayText.length - 1)
        : current.substring(0, displayText.length + 1);

      setDisplayText(next);
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, loopIndex, typeTargets]);
  // ---------------------------------------

  if (loading) {
    return <Loading fullScreen text="Loading portfolio..." />;
  }

  const featuredProjects =
    projects?.filter((p) => p.featured && p.published)?.slice(0, 3) || [];

  const allSkills =
    skills
      ?.filter((s) => s.published)
      ?.flatMap((cat) => cat.skills.map((s) => s.name))
      ?.slice(0, 8) || [];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary-500)]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-accent-500)]/20 rounded-full blur-[100px]" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary-500)]/10 border border-[var(--color-primary-500)]/20 mb-6"
              >
                <Sparkles size={16} className="text-[var(--color-primary-500)]" />
                <span className="text-sm font-medium text-[var(--color-primary-500)]">
                  Available for opportunities
                </span>
              </motion.div>

              {/* UPDATED: Typewriter Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-[var(--text-primary)] leading-tight mb-6"
              >
                Hi, I&apos;m{' '}
                <span className="gradient-text">
                  {displayText}
                  {/* Cursor */}
                  <motion.span
                    aria-hidden="true"
                    className="inline-block align-baseline ml-1 w-[2px] h-[1em] bg-[var(--text-primary)]/70"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-4"
              >
                {profile?.title || 'AI/ML Engineer & Python Developer'}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-[var(--text-muted)] text-lg max-w-xl mb-8 leading-relaxed"
              >
                {profile?.subtitle ||
                  'Building intelligent systems that transform businesses through AI, machine learning, and innovative solutions.'}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 mb-12"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white font-semibold hover:shadow-lg hover:shadow-[var(--color-primary-500)]/25 transition-all group"
                >
                  View Projects
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] font-semibold hover:border-[var(--color-primary-500)] transition-all"
                >
                  <Download size={18} />
                  Download CV
                </Link>
              </motion.div>

              {/* Stats */}
              {profile?.stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-6"
                >
                  {profile.stats.map((stat, index) => (
                    <div key={index} className="text-center sm:text-left">
                      <div className="text-3xl font-display font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Profile Image / Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Decorative rings */}
                <div
                  className="absolute inset-0 -m-8 rounded-full border-2 border-dashed border-[var(--color-primary-500)]/20 animate-spin"
                  style={{ animationDuration: '30s' }}
                />
                <div
                  className="absolute inset-0 -m-16 rounded-full border-2 border-dashed border-[var(--color-accent-500)]/20 animate-spin"
                  style={{ animationDuration: '40s', animationDirection: 'reverse' }}
                />

                {/* Image container */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[var(--bg-card)] shadow-2xl">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                      <span className="text-white text-8xl font-display font-bold">
                        {profile?.name?.charAt(0) || 'M'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 right-0 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-lg"
                >
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    🎓 Master's in AI
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 left-0 px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-lg"
                >
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    🏆 Employee of the Month
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
                Featured Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
                Recent Projects
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                A selection of my recent AI/ML projects showcasing innovative solutions and measurable impact
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] overflow-hidden hover:border-[var(--color-primary-500)]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center">
                    <span className="text-6xl">🤖</span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary-500)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack?.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack?.length > 3 && (
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-muted)]">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    {project.metrics && project.metrics.length > 0 && (
                      <div className="flex gap-4 pt-4 border-t border-[var(--border-default)]">
                        {project.metrics.slice(0, 2).map((metric, i) => (
                          <div key={i}>
                            <div className="text-lg font-bold gradient-text">{metric.value}</div>
                            <div className="text-xs text-[var(--text-muted)]">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium hover:bg-[var(--border-default)] transition-colors group"
              >
                View All Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Preview */}
      {allSkills.length > 0 && (
        <section className="py-24">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-500)]/10 text-[var(--color-accent-500)] text-sm font-medium mb-4">
                Tech Stack
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)]">
                Skills & Technologies
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
            >
              {allSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] font-medium hover:border-[var(--color-primary-500)]/30 hover:shadow-lg transition-all cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link
                to="/skills"
                className="text-[var(--color-primary-500)] font-medium hover:underline inline-flex items-center gap-1"
              >
                See all skills
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--text-primary)] mb-6">
              Let&apos;s Build Something Amazing Together
            </h2>
            <p className="text-[var(--text-muted)] text-lg mb-8">
              I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white font-semibold hover:shadow-lg hover:shadow-[var(--color-primary-500)]/25 transition-all"
              >
                <Mail size={18} />
                Get in Touch
              </Link>

              <a
                href="https://github.com/Muzammal-Bilal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] font-semibold hover:border-[var(--color-primary-500)] transition-all"
              >
                <Github size={18} />
                GitHub Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
