import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Toggle } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminContact = () => {
  const { contact, updateContact, loading } = usePortfolio();
  const [form, setForm] = useState({ email: '', phone: '', location: '', linkedin: '', github: '', twitter: '', contactFormEnabled: true, published: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (contact) setForm({ ...contact }); }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await updateContact(form); toast.success('Updated!'); } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] space-y-4">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Contact Information</h2>
          <Input label="Email" type="email" value={form.email || ''} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          <Input label="Phone" value={form.phone || ''} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} />
          <Input label="Location" value={form.location || ''} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} />
        </div>
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] space-y-4">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Social Links</h2>
          <Input label="LinkedIn URL" value={form.linkedin || ''} onChange={(e) => setForm(p => ({ ...p, linkedin: e.target.value }))} />
          <Input label="GitHub URL" value={form.github || ''} onChange={(e) => setForm(p => ({ ...p, github: e.target.value }))} />
          <Input label="Twitter URL" value={form.twitter || ''} onChange={(e) => setForm(p => ({ ...p, twitter: e.target.value }))} />
        </div>
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] space-y-4">
          <Toggle label="Enable Contact Form" checked={form.contactFormEnabled} onChange={(v) => setForm(p => ({ ...p, contactFormEnabled: v }))} />
          <Toggle label="Published" checked={form.published} onChange={(v) => setForm(p => ({ ...p, published: v }))} />
        </div>
        <div className="flex justify-end"><Button type="submit" loading={saving} icon={<Save size={18} />}>Save Changes</Button></div>
      </form>
    </motion.div>
  );
};

export default AdminContact;
