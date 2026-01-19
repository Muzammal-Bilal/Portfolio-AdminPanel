import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const CertificationsPage = () => {
  const { certifications, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  const publishedCertifications = certifications?.filter(c => c.published) || [];

  const getIssuerLogo = (issuer) => {
    const logos = {
      'IBM': '🔵',
      'Google': '🔴',
      'Stanford University': '🎓',
      'Stanford': '🎓',
      'Amazon Web Services': '🟠',
      'AWS': '🟠',
      'Microsoft': '🟦',
      'Coursera': '📚',
      'Udemy': '🟣'
    };
    return logos[issuer] || '📜';
  };

  const getIssuerColor = (issuer) => {
    const colors = {
      'IBM': 'from-blue-600 to-blue-800',
      'Google': 'from-red-500 to-yellow-500',
      'Stanford University': 'from-red-700 to-red-900',
      'Stanford': 'from-red-700 to-red-900',
      'Amazon Web Services': 'from-orange-500 to-orange-700',
      'AWS': 'from-orange-500 to-orange-700',
      'Microsoft': 'from-blue-500 to-blue-700',
      'Coursera': 'from-blue-500 to-indigo-600',
      'Udemy': 'from-purple-500 to-purple-700'
    };
    return colors[issuer] || 'from-gray-500 to-gray-700';
  };

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
            Certifications
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            Professional Credentials
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            Industry-recognized certifications from leading technology companies and academic institutions
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] overflow-hidden hover:border-[var(--color-primary-500)]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Header with gradient */}
              <div className={`h-32 bg-gradient-to-br ${getIssuerColor(cert.issuer)} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-50">{getIssuerLogo(cert.issuer)}</span>
                </div>
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Issuer */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{getIssuerLogo(cert.issuer)}</span>
                  <span className="text-sm font-medium text-[var(--color-primary-500)]">
                    {cert.issuer}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--color-primary-500)] transition-colors">
                  {cert.title}
                </h3>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
                  <Calendar size={14} />
                  <span>Issued {cert.date}</span>
                </div>

                {/* Action */}
                {cert.credentialLink && cert.credentialLink !== '#' && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary-500)] hover:text-[var(--color-accent-500)] transition-colors"
                  >
                    View Credential
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/10 to-[var(--color-accent-500)]/10 border border-[var(--color-primary-500)]/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                {publishedCertifications.length}
              </div>
              <div className="text-[var(--text-muted)]">Total Certifications</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                {[...new Set(publishedCertifications.map(c => c.issuer))].length}
              </div>
              <div className="text-[var(--text-muted)]">Issuing Organizations</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                2024-25
              </div>
              <div className="text-[var(--text-muted)]">Most Recent Year</div>
            </div>
            <div>
              <div className="text-4xl font-display font-bold gradient-text mb-2">
                100%
              </div>
              <div className="text-[var(--text-muted)]">Verified</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CertificationsPage;
