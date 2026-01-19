import { motion } from 'framer-motion';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const SkillsPage = () => {
  const { skills, loading } = usePortfolio();

  if (loading) {
    return <Loading fullScreen />;
  }

  const publishedSkills = skills?.filter(s => s.published) || [];

  const getCategoryIcon = (category) => {
    const icons = {
      'AI/ML': '🤖',
      'Data & Analytics': '📊',
      'LLM Tools': '🧠',
      'Cloud & Deployment': '☁️',
      'Web & APIs': '🌐',
      'Databases & Tools': '💾'
    };
    return icons[category] || '⚡';
  };

  const getCategoryColor = (index) => {
    const colors = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-amber-500',
      'from-indigo-500 to-violet-500',
      'from-rose-500 to-red-500'
    ];
    return colors[index % colors.length];
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
            Skills & Technologies
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            Technical Expertise
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            A comprehensive toolkit spanning AI/ML, data engineering, cloud platforms, and modern development practices
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--color-primary-500)]/30 hover:shadow-xl transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getCategoryColor(categoryIndex)} flex items-center justify-center text-2xl shadow-lg`}>
                  {getCategoryIcon(category.category)}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">
                    {category.category}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {category.skills?.length || 0} skills
                  </p>
                </div>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills?.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--text-primary)]">
                        {skill.name}
                      </span>
                      {skill.proficiency && (
                        <span className="text-xs text-[var(--text-muted)]">
                          {skill.proficiency}%
                        </span>
                      )}
                    </div>
                    {skill.proficiency && (
                      <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          className={`h-full rounded-full bg-gradient-to-r ${getCategoryColor(categoryIndex)}`}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Skills Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] text-center mb-8">
            Full Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {publishedSkills.flatMap(cat => 
              cat.skills?.map(skill => ({ ...skill, category: cat.category })) || []
            ).map((skill, index) => (
              <motion.span
                key={`${skill.category}-${skill.name}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--color-primary-500)]/30 hover:shadow-lg transition-all cursor-default"
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
