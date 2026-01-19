import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Heart, ArrowUp } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';

export const Footer = () => {
  const { profile, settings, contact } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/experience', label: 'Experience' },
    { path: '/contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      icon: Github, 
      href: settings?.socialLinks?.github || contact?.github,
      label: 'GitHub'
    },
    { 
      icon: Linkedin, 
      href: settings?.socialLinks?.linkedin || contact?.linkedin,
      label: 'LinkedIn'
    },
    { 
      icon: Twitter, 
      href: settings?.socialLinks?.twitter || contact?.twitter,
      label: 'Twitter'
    },
    { 
      icon: Mail, 
      href: `mailto:${settings?.socialLinks?.email || contact?.email}`,
      label: 'Email'
    }
  ].filter(link => link.href);

  return (
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-default)]">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="relative container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-accent-500)] flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {profile?.name?.charAt(0) || 'M'}
                </span>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                  {profile?.name || 'Muzammal Bilal'}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {profile?.title || 'AI/ML Engineer'}
                </p>
              </div>
            </Link>
            <p className="text-[var(--text-secondary)] max-w-md mb-6 leading-relaxed">
              {profile?.summary?.substring(0, 150) || 'Building intelligent systems that transform businesses. Passionate about AI, machine learning, and creating impactful solutions.'}...
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)]/10 transition-all"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-[var(--text-primary)] mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-[var(--text-primary)] mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[var(--text-secondary)] hover:text-[var(--color-primary-500)] transition-colors"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.location && (
                <li className="text-[var(--text-secondary)]">
                  {contact.location}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 mt-12 border-t border-[var(--border-default)]">
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1">
            © {currentYear} {profile?.name || 'Muzammal Bilal'}. Built with 
            <Heart size={14} className="text-red-500 fill-red-500" /> 
            using React
          </p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-[var(--color-primary-500)] hover:bg-[var(--color-primary-500)]/10 transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
