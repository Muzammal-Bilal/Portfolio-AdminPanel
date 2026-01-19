import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Filter, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading } from '../../components/common';

export const ProjectsPage = () => {
  const { projects, loading } = usePortfolio();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return <Loading fullScreen />;
  }

  const publishedProjects = projects?.filter(p => p.published) || [];
  const allTags = [...new Set(publishedProjects.flatMap(p => p.stack || []))];
  
  const filteredProjects = filter === 'all' 
    ? publishedProjects 
    : filter === 'featured'
    ? publishedProjects.filter(p => p.featured)
    : publishedProjects.filter(p => p.stack?.includes(filter));

  return (
    <div className="py-16 sm:py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-primary-500)]/10 text-[var(--color-primary-500)] text-sm font-medium mb-4">
            Projects
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-[var(--text-primary)] mb-6">
            Featured Work
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            A collection of AI/ML projects showcasing innovative solutions with measurable impact
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === 'featured'
                ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
            }`}
          >
            Featured
          </button>
          {allTags.slice(0, 6).map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === tag
                  ? 'bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-[var(--bg-card)] rounded-2xl border border-[var(--border-default)] overflow-hidden hover:border-[var(--color-primary-500)]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white text-xs font-medium">
                    Featured
                  </div>
                )}
                
                <div className="h-48 bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center relative overflow-hidden">
                  {project.images?.[0] ? (
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {project.title.includes('Lung') ? '🫁' : 
                       project.title.includes('Face') ? '👤' :
                       project.title.includes('Plant') ? '🌿' :
                       project.title.includes('Wildlife') ? '🦁' :
                       project.title.includes('Traffic') ? '🚦' : '🤖'}
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--color-primary-500)] transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-sm text-[var(--color-primary-500)] mb-2">{project.subtitle}</p>
                  )}
                  <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack?.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--bg-tertiary)] text-xs font-medium text-[var(--text-secondary)]">
                        {tech}
                      </span>
                    ))}
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
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)]">No projects found for this filter.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-10 lg:inset-20 bg-[var(--bg-card)] rounded-2xl z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[var(--border-default)]">
                <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)]/20 to-[var(--color-accent-500)]/20 flex items-center justify-center mb-8">
                    <span className="text-8xl">
                      {selectedProject.title.includes('Lung') ? '🫁' : 
                       selectedProject.title.includes('Face') ? '👤' :
                       selectedProject.title.includes('Plant') ? '🌿' :
                       selectedProject.title.includes('Wildlife') ? '🦁' :
                       selectedProject.title.includes('Traffic') ? '🚦' : '🤖'}
                    </span>
                  </div>

                  {selectedProject.subtitle && (
                    <p className="text-[var(--color-primary-500)] font-medium mb-4">{selectedProject.subtitle}</p>
                  )}
                  
                  <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {selectedProject.metrics.map((metric, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[var(--bg-tertiary)] text-center">
                          <div className="text-2xl font-bold gradient-text">{metric.value}</div>
                          <div className="text-sm text-[var(--text-muted)]">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack?.map((tech, i) => (
                        <span key={i} className="px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-sm font-medium text-[var(--text-secondary)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium hover:bg-[var(--border-default)] transition-colors"
                      >
                        <Github size={20} />
                        View Code
                      </a>
                    )}
                    {selectedProject.liveLink && (
                      <a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-accent-500)] text-white font-medium hover:shadow-lg transition-all"
                      >
                        <ExternalLink size={20} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsPage;
