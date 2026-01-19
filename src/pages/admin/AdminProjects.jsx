import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Star, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea, Toggle, TagInput, Modal, ConfirmModal } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject, loading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', description: '', stack: [], githubLink: '', liveLink: '', metrics: [], featured: false, published: true });
  const [saving, setSaving] = useState(false);
  const [metricInput, setMetricInput] = useState({ label: '', value: '' });

  const openModal = (item = null) => {
    setSelected(item);
    setForm(item ? { title: item.title || '', subtitle: item.subtitle || '', description: item.description || '', stack: item.stack || [], githubLink: item.githubLink || '', liveLink: item.liveLink || '', metrics: item.metrics || [], featured: item.featured || false, published: item.published !== false } : { title: '', subtitle: '', description: '', stack: [], githubLink: '', liveLink: '', metrics: [], featured: false, published: true });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      selected ? await updateProject(selected.id, form) : await addProject(form);
      toast.success(selected ? 'Updated!' : 'Added!');
      setIsModalOpen(false);
    } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteProject(selected.id); toast.success('Deleted!'); setIsDeleteOpen(false); } catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Projects</h2><p className="text-[var(--text-muted)]">{projects?.length || 0} projects</p></div>
        <Button onClick={() => openModal()} icon={<Plus size={18} />}>Add Project</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects?.map(p => (
          <div key={p.id} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-[var(--text-primary)]">{p.title}</h3>
                {p.featured && <Star size={14} className="text-yellow-500 fill-current" />}
                {!p.published && <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500">Draft</span>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => openModal(p)} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"><Edit size={16} /></button>
                <button onClick={() => { setSelected(p); setIsDeleteOpen(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-3">{p.description}</p>
            {p.stack?.length > 0 && <div className="flex flex-wrap gap-1">{p.stack.slice(0, 4).map((t, i) => <span key={i} className="px-2 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">{t}</span>)}</div>}
          </div>
        ))}
      </div>

      {(!projects || projects.length === 0) && <div className="text-center py-12 text-[var(--text-muted)]">No projects yet.</div>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? 'Edit Project' : 'Add Project'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required />
          <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="e.g., Final Year Project" />
          <Textarea label="Description" value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
          <TagInput label="Tech Stack" tags={form.stack} onChange={(t) => setForm(p => ({ ...p, stack: t }))} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="GitHub" value={form.githubLink} onChange={(e) => setForm(p => ({ ...p, githubLink: e.target.value }))} />
            <Input label="Live Demo" value={form.liveLink} onChange={(e) => setForm(p => ({ ...p, liveLink: e.target.value }))} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Metrics</label>
            {form.metrics?.map((m, i) => (
              <div key={i} className="flex items-center gap-2 p-2 mb-1 rounded bg-[var(--bg-tertiary)]">
                <span className="font-bold text-sm text-[var(--text-primary)]">{m.value}</span>
                <span className="text-sm text-[var(--text-muted)]">{m.label}</span>
                <button type="button" onClick={() => setForm(p => ({ ...p, metrics: p.metrics.filter((_, idx) => idx !== i) }))} className="ml-auto text-red-500"><X size={14} /></button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input placeholder="Label" value={metricInput.label} onChange={(e) => setMetricInput(p => ({ ...p, label: e.target.value }))} />
              <Input placeholder="Value" value={metricInput.value} onChange={(e) => setMetricInput(p => ({ ...p, value: e.target.value }))} className="w-24" />
              <Button type="button" variant="secondary" onClick={() => { if (metricInput.label && metricInput.value) { setForm(p => ({ ...p, metrics: [...(p.metrics || []), metricInput] })); setMetricInput({ label: '', value: '' }); } }}>Add</Button>
            </div>
          </div>
          <div className="flex gap-6">
            <Toggle label="Featured" checked={form.featured} onChange={(v) => setForm(p => ({ ...p, featured: v }))} />
            <Toggle label="Published" checked={form.published} onChange={(v) => setForm(p => ({ ...p, published: v }))} />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-default)]">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={saving}>Save</Button>
          </div>
        </form>
      </Modal>
      <ConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} title="Delete Project" message={`Delete "${selected?.title}"?`} confirmText="Delete" />
    </motion.div>
  );
};

export default AdminProjects;
