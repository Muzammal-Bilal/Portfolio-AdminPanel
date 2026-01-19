import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea, Select } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminSettings = () => {
  const { settings, updateSettings, loading } = usePortfolio();
  const [form, setForm] = useState({ siteTitle: '', siteDescription: '', themeDefault: 'dark', seoKeywords: '', socialLinks: { github: '', linkedin: '', twitter: '', email: '' } });
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (settings) setForm({ ...settings, socialLinks: settings.socialLinks || {} }); }, [settings]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await updateSettings(form); toast.success('Updated!'); } catch { toast.error('Failed'); } finally { setSaving(false); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] space-y-4">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Site Settings</h2>
          <Input label="Site Title" value={form.siteTitle || ''} onChange={(e) => setForm(p => ({ ...p, siteTitle: e.target.value }))} placeholder="Muzammal Bilal - AI/ML Engineer" />
          <Textarea label="Site Description" value={form.siteDescription || ''} onChange={(e) => setForm(p => ({ ...p, siteDescription: e.target.value }))} rows={2} placeholder="AI/ML engineer with expertise in..." />
          <Input label="SEO Keywords" value={form.seoKeywords || ''} onChange={(e) => setForm(p => ({ ...p, seoKeywords: e.target.value }))} placeholder="AI, ML, Python, Computer Vision" />
          <Select label="Default Theme" value={form.themeDefault || 'dark'} onChange={(e) => setForm(p => ({ ...p, themeDefault: e.target.value }))} options={[{ value: 'dark', label: 'Dark Mode' }, { value: 'light', label: 'Light Mode' }]} />
        </div>
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] space-y-4">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Social Links (Global)</h2>
          <Input label="GitHub URL" value={form.socialLinks?.github || ''} onChange={(e) => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, github: e.target.value } }))} />
          <Input label="LinkedIn URL" value={form.socialLinks?.linkedin || ''} onChange={(e) => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, linkedin: e.target.value } }))} />
          <Input label="Contact Email" value={form.socialLinks?.email || ''} onChange={(e) => setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, email: e.target.value } }))} />
        </div>
        <div className="flex justify-end"><Button type="submit" loading={saving} icon={<Save size={18} />}>Save Settings</Button></div>
      </form>
    </motion.div>
  );
};

export default AdminSettings;
