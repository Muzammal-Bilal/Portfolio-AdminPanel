import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Plus, Trash2, Image } from 'lucide-react';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea, Toggle } from '../../components/common';
import toast from 'react-hot-toast';

export const AdminProfile = () => {
  const { profile, updateProfile, uploadFile, loading } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    summary: '',
    profileImage: '',
    resumeUrl: '',
    ctaButtons: [],
    stats: [],
    published: true
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        title: profile.title || '',
        subtitle: profile.subtitle || '',
        summary: profile.summary || '',
        profileImage: profile.profileImage || '',
        resumeUrl: profile.resumeUrl || '',
        ctaButtons: profile.ctaButtons || [],
        stats: profile.stats || [],
        published: profile.published !== false
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadFile(file, `profile/${file.name}`);
      setFormData(prev => ({ ...prev, profileImage: url }));
      toast.success('Image uploaded!');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadFile(file, `resume/${file.name}`);
      setFormData(prev => ({ ...prev, resumeUrl: url }));
      toast.success('Resume uploaded!');
    } catch (error) {
      toast.error('Failed to upload resume');
    }
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { label: '', value: '' }]
    }));
  };

  const removeStat = (index) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleCtaChange = (index, field, value) => {
    const newButtons = [...formData.ctaButtons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setFormData(prev => ({ ...prev, ctaButtons: newButtons }));
  };

  const addCtaButton = () => {
    setFormData(prev => ({
      ...prev,
      ctaButtons: [...prev.ctaButtons, { text: '', link: '', primary: false }]
    }));
  };

  const removeCtaButton = (index) => {
    setFormData(prev => ({
      ...prev,
      ctaButtons: prev.ctaButtons.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">
            Basic Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Muzammal Bilal"
              required
            />
            <Input
              label="Title/Role"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="AI/ML Engineer"
              required
            />
          </div>

          <div className="mt-6">
            <Input
              label="Subtitle/Tagline"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="Building intelligent systems that transform businesses"
            />
          </div>

          <div className="mt-6">
            <Textarea
              label="Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              placeholder="Brief summary about yourself..."
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">
            Profile Image
          </h2>
          
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image className="w-12 h-12 text-[var(--text-muted)]" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-[var(--text-muted)] mb-4">
                Upload a professional photo. Recommended size: 400x400px.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium cursor-pointer hover:bg-[var(--border-default)] transition-colors">
                <Upload size={18} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {formData.profileImage && (
                <Input
                  className="mt-4"
                  label="Or paste image URL"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              )}
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">
            Resume/CV
          </h2>
          
          <div className="space-y-4">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium cursor-pointer hover:bg-[var(--border-default)] transition-colors">
              <Upload size={18} />
              Upload Resume (PDF)
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </label>
            
            <Input
              label="Or paste resume URL"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
            
            {formData.resumeUrl && (
              <p className="text-sm text-[var(--color-success-500)]">
                ✓ Resume uploaded
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
              Stats/Highlights
            </h2>
            <Button type="button" variant="secondary" size="sm" onClick={addStat} icon={<Plus size={16} />}>
              Add Stat
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <Input
                  placeholder="Label (e.g., Years Experience)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Value (e.g., 2+)"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  className="w-32"
                />
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {formData.stats.length === 0 && (
              <p className="text-[var(--text-muted)] text-center py-4">
                No stats added yet. Click "Add Stat" to add highlights.
              </p>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
              Call-to-Action Buttons
            </h2>
            <Button type="button" variant="secondary" size="sm" onClick={addCtaButton} icon={<Plus size={16} />}>
              Add Button
            </Button>
          </div>
          
          <div className="space-y-4">
            {formData.ctaButtons.map((btn, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]">
                <Input
                  placeholder="Button Text"
                  value={btn.text}
                  onChange={(e) => handleCtaChange(index, 'text', e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Link (e.g., /projects)"
                  value={btn.link}
                  onChange={(e) => handleCtaChange(index, 'link', e.target.value)}
                  className="flex-1"
                />
                <Toggle
                  label="Primary"
                  checked={btn.primary}
                  onChange={(val) => handleCtaChange(index, 'primary', val)}
                />
                <button
                  type="button"
                  onClick={() => removeCtaButton(index)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publishing */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">
                Publish Status
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                Control visibility on the public site
              </p>
            </div>
            <Toggle
              label="Published"
              checked={formData.published}
              onChange={(val) => setFormData(prev => ({ ...prev, published: val }))}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" loading={isSaving} icon={<Save size={18} />}>
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminProfile;
