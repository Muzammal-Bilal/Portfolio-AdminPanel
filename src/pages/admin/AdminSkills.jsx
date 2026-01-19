import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Toggle, Modal, ConfirmModal } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminSkills = () => {
  const { skills, addSkillCategory, updateSkillCategory, deleteSkillCategory, loading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ category: '', skills: [], published: true });
  const [saving, setSaving] = useState(false);
  const [skillInput, setSkillInput] = useState({ name: '', proficiency: 80 });

  const openModal = (item = null) => {
    setSelected(item);
    setForm(item ? { category: item.category, skills: item.skills || [], published: item.published !== false } : { category: '', skills: [], published: true });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { selected ? await updateSkillCategory(selected.id, form) : await addSkillCategory(form); toast.success('Saved!'); setIsModalOpen(false); } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteSkillCategory(selected.id); toast.success('Deleted!'); setIsDeleteOpen(false); } catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Skills</h2><p className="text-[var(--text-muted)]">{skills?.length || 0} categories</p></div>
        <Button onClick={() => openModal()} icon={<Plus size={18} />}>Add Category</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills?.map(cat => (
          <div key={cat.id} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">{cat.category}</h3>
              <div className="flex gap-1">
                <button onClick={() => openModal(cat)} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"><Edit size={16} /></button>
                <button onClick={() => { setSelected(cat); setIsDeleteOpen(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="space-y-2">{cat.skills?.map((s, i) => <div key={i} className="flex justify-between text-sm"><span className="text-[var(--text-secondary)]">{s.name}</span><span className="text-[var(--text-muted)]">{s.proficiency}%</span></div>)}</div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? 'Edit' : 'Add'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Category Name" value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} required />
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Skills</label>
            {form.skills.map((s, i) => <div key={i} className="flex items-center gap-2 p-2 mb-1 rounded bg-[var(--bg-tertiary)]"><span className="flex-1 text-sm">{s.name}</span><span className="text-xs text-[var(--text-muted)]">{s.proficiency}%</span><button type="button" onClick={() => setForm(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))} className="text-red-500"><X size={14} /></button></div>)}
            <div className="flex gap-2"><Input placeholder="Skill" value={skillInput.name} onChange={(e) => setSkillInput(p => ({ ...p, name: e.target.value }))} /><Input type="number" min={0} max={100} value={skillInput.proficiency} onChange={(e) => setSkillInput(p => ({ ...p, proficiency: parseInt(e.target.value) || 0 }))} className="w-20" /><Button type="button" variant="secondary" onClick={() => { if (skillInput.name) { setForm(p => ({ ...p, skills: [...p.skills, skillInput] })); setSkillInput({ name: '', proficiency: 80 }); } }}>Add</Button></div>
          </div>
          <Toggle label="Published" checked={form.published} onChange={(v) => setForm(p => ({ ...p, published: v }))} />
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-default)]"><Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit" loading={saving}>Save</Button></div>
        </form>
      </Modal>
      <ConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} title="Delete?" message={`Delete "${selected?.category}"?`} />
    </motion.div>
  );
};

export default AdminSkills;
