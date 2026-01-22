import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Facebook,
  ArrowUp,
  Phone,
} from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

const FloatingMailArt = () => {
  return (
    <motion.div
      aria-hidden="true"
      className="relative w-full max-w-[360px] mx-auto"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Art canvas (no huge glass panel) */}
      <div className="relative aspect-[16/10] overflow-visible">
        {/* Decorative particles (kept INSIDE bounds so they won't disappear) */}
        <div className="absolute top-[12%] left-[44%] h-2 w-7 rounded-full bg-[var(--text-primary)]/15" />
        <div className="absolute top-[18%] right-[18%] h-3 w-3 rounded-full border-4 border-[var(--text-primary)]/20" />
        <div className="absolute top-[44%] right-[10%] text-3xl leading-none text-[var(--text-primary)]/25 select-none">
          +
        </div>
        <div className="absolute top-[58%] left-[10%] h-2 w-2 rounded-full bg-[var(--text-primary)]/20" />
        <div className="absolute top-[52%] left-[26%] h-3 w-3 rounded-full border-4 border-[var(--text-primary)]/20" />

        {/* Envelope (stroke follows your theme primary color) */}
        <svg
          viewBox="0 0 640 400"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Outer */}
          <path
            d="M140 120h360c28 0 50 22 50 50v120c0 28-22 50-50 50H140c-28 0-50-22-50-50V170c0-28 22-50 50-50Z"
            stroke="var(--color-primary-500)"
            strokeWidth="14"
            strokeLinejoin="round"
            opacity="0.95"
          />
          {/* Flap */}
          <path
            d="M108 160l212 150L532 160"
            stroke="var(--color-primary-500)"
            strokeWidth="14"
            strokeLinejoin="round"
            opacity="0.95"
          />
          {/* Inner diagonals (lighter like sample) */}
          <path
            d="M230 255l-122 86"
            stroke="var(--color-primary-500)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M410 255l122 86"
            stroke="var(--color-primary-500)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Small corner highlight */}
          <path
            d="M470 230c0 0 70-15 70 55 0 70-70 55-70 55"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>

        {/* Shadow oval (like sample) */}
        <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 h-4 w-40 rounded-full bg-white/70 opacity-25 blur-[0.5px]" />
      </div>
    </motion.div>
  );
};


export const Footer = () => {
  const { profile, settings, contact } = usePortfolio();

  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Github,
      href: settings?.socialLinks?.github || contact?.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: settings?.socialLinks?.linkedin || contact?.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: `mailto:${settings?.socialLinks?.email || contact?.email || ''}`,
      label: 'Email',
      isMail: true,
    },
    {
      icon: Facebook,
      href: settings?.socialLinks?.facebook || contact?.facebook,
      label: 'Facebook',
    },
    {
      icon: Twitter,
      href: settings?.socialLinks?.twitter || contact?.twitter,
      label: 'Twitter',
    },
  ].filter((l) => l.href && l.href !== 'mailto:');

  const email = settings?.socialLinks?.email || contact?.email;
  const phone = contact?.phone;

  return (
      <footer className="relative overflow-hidden bg-[#0A0F1A] border-t border-[var(--border-default)]">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/25" />
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[var(--color-primary-500)]/10 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full bg-[var(--color-accent-500)]/10 blur-3xl" />

      <div className="relative container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Contact content */}
          <div>
            <div className="flex items-start gap-4">
              <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[var(--text-primary)]">
                Contact Me
              </h2>

              {/* Small icon chip */}
              <div className="mt-2 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[var(--bg-tertiary)]/70 border border-[var(--border-default)]">
                <Phone className="text-[var(--color-primary-500)]" size={22} />
              </div>
            </div>

            <p className="mt-6 text-[var(--text-secondary)] max-w-2xl text-base sm:text-lg leading-relaxed uppercase tracking-wide">
              {contact?.tagline ||
                'Discuss a project or just want to say hi? My inbox is open for all.'}
            </p>

            <div className="mt-8 space-y-4">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="block text-[var(--text-primary)] font-display font-semibold text-3xl sm:text-4xl tracking-tight hover:text-[var(--color-primary-500)] transition-colors"
                >
                  {phone}
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="block text-[var(--text-primary)]/90 text-2xl sm:text-3xl tracking-tight hover:text-[var(--color-primary-500)] transition-colors"
                >
                  {email}
                </a>
              )}
            </div>

            {/* Social row (icons in circles like sample) */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-12 w-12 rounded-full bg-[var(--bg-tertiary)]/80 border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--color-primary-500)] hover:border-[var(--color-primary-500)]/40 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>

            {/* Optional: keep a subtle brand link (doesn't exist in sample, but harmless) */}
            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--color-primary-500)]/70" />
                {profile?.name || 'Portfolio'}
              </Link>
            </div>
          </div>

          {/* Right: Illustration (hidden on small screens to match sample behavior) */}
          <div className="hidden lg:flex items-center justify-center">
            <FloatingMailArt />
          </div>

        </div>

        {/* Bottom bar (centered like sample) */}
        <div className="mt-16 pt-10 border-t border-[var(--border-default)]/80">
          <p className="text-center text-sm sm:text-base text-[var(--text-muted)]">
            © {currentYear} {profile?.name || 'Muzammal Bilal'}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating scroll-to-top button (bottom-right like sample) */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-2xl bg-[var(--color-primary-500)]/80 backdrop-blur border border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)] flex items-center justify-center text-white hover:bg-[var(--color-primary-500)] transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp size={22} />
      </motion.button>
    </footer>
  );
};

export default Footer;
