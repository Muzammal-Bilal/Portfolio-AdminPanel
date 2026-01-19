import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, X } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea, Toggle } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminAbout = () => {
  const { about, updateAbout, loading } = usePortfolio();
  const [formData, setFormData] = useState({ headline: '', longBio: '', highlights: [], published: true });
  const [isSaving, setIsSaving] = useState(false);
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    if (about) setFormData({ headline: about.headline || '', longBio: about.longBio || '', highlights: about.highlights || [], published: about.published !== false });
  }, [about]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try { await updateAbout(formData); toast.success('About section updated!'); } 
    catch { toast.error('Failed to update'); } 
    finally { setIsSaving(false); }
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
      setHighlightInput('');
    }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">About Section</h2>
          <Input label="Headline" value={formData.headline} onChange={(e) => setFormData(p => ({ ...p, headline: e.target.value }))} placeholder="Transforming Ideas into Intelligent Solutions" />
          <div className="mt-4">
            <Textarea label="Long Bio (HTML supported)" value={formData.longBio} onChange={(e) => setFormData(p => ({ ...p, longBio: e.target.value }))} rows={10} placeholder="<p>Your detailed bio...</p>" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">Highlights</h2>
          <div className="space-y-2 mb-4">
            {formData.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)]">
                <span className="flex-1 text-sm text-[var(--text-primary)]">{h}</span>
                <button type="button" onClick={() => setFormData(p => ({ ...p, highlights: p.highlights.filter((_, idx) => idx !== i) }))} className="text-red-500 hover:text-red-600">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} placeholder="Add a highlight..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())} />
            <Button type="button" variant="secondary" onClick={addHighlight} icon={<Plus size={16} />}>Add</Button>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <Toggle label="Published" checked={formData.published} onChange={(v) => setFormData(p => ({ ...p, published: v }))} />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={isSaving} icon={<Save size={18} />}>Save Changes</Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminAbout;
