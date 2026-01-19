import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Toggle, Modal, ConfirmModal } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminCertifications = () => {
  const { certifications, addCertification, updateCertification, deleteCertification, loading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ title: '', issuer: '', date: '', credentialLink: '', published: true });
  const [saving, setSaving] = useState(false);

  const openModal = (item = null) => {
    setSelected(item);
    setForm(item ? { title: item.title, issuer: item.issuer, date: item.date, credentialLink: item.credentialLink || '', published: item.published !== false } : { title: '', issuer: '', date: '', credentialLink: '', published: true });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { selected ? await updateCertification(selected.id, form) : await addCertification(form); toast.success('Saved!'); setIsModalOpen(false); } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteCertification(selected.id); toast.success('Deleted!'); setIsDeleteOpen(false); } catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <div><h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Certifications</h2><p className="text-[var(--text-muted)]">{certifications?.length || 0} certifications</p></div>
        <Button onClick={() => openModal()} icon={<Plus size={18} />}>Add Certification</Button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications?.map(c => (
          <div key={c.id} className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                <p className="text-sm text-[var(--color-primary-500)]">{c.issuer}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{c.date}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openModal(c)} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"><Edit size={16} /></button>
                <button onClick={() => { setSelected(c); setIsDeleteOpen(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selected ? 'Edit' : 'Add'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} required />
          <Input label="Issuer" value={form.issuer} onChange={(e) => setForm(p => ({ ...p, issuer: e.target.value }))} placeholder="e.g., IBM, Google" required />
          <Input label="Date" value={form.date} onChange={(e) => setForm(p => ({ ...p, date: e.target.value }))} placeholder="Jan 2025" />
          <Input label="Credential Link" value={form.credentialLink} onChange={(e) => setForm(p => ({ ...p, credentialLink: e.target.value }))} placeholder="https://..." />
          <Toggle label="Published" checked={form.published} onChange={(v) => setForm(p => ({ ...p, published: v }))} />
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border-default)]"><Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button><Button type="submit" loading={saving}>Save</Button></div>
        </form>
      </Modal>
      <ConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDelete} title="Delete?" message={`Delete "${selected?.title}"?`} />
    </motion.div>
  );
};

export default AdminCertifications;
