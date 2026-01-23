import { useState, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { Save, Upload, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { Loading, Button, Input, Textarea, Toggle } from "../../components/common";
import toast from "react-hot-toast";

const makeId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const getExt = (filename) => {
  const parts = String(filename || "").split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  return (ext || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
};

const buildStoragePath = (folder, file) => {
  // Always generate a unique, URL-safe key; avoid file.name due to spaces/collisions
  const ext = getExt(file?.name);
  return `${folder}/${makeId()}.${ext}`;
};

const validateImage = (file) => {
  if (!file) return "No file selected";
  if (!file.type?.startsWith("image/")) return "Please upload a valid image file";
  const maxMb = 5;
  if (file.size > maxMb * 1024 * 1024) return `Image must be <= ${maxMb}MB`;
  return null;
};

const validatePdf = (file) => {
  if (!file) return "No file selected";
  const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name || "");
  if (!isPdf) return "Please upload a PDF file";
  const maxMb = 10;
  if (file.size > maxMb * 1024 * 1024) return `PDF must be <= ${maxMb}MB`;
  return null;
};

const StatRow = memo(function StatRow({ stat, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="Label (e.g., Years Experience)"
        value={stat.label}
        onChange={(e) => onChange(stat.id, "label", e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="Value (e.g., 2+)"
        value={stat.value}
        onChange={(e) => onChange(stat.id, "value", e.target.value)}
        className="w-32"
      />
      <button
        type="button"
        onClick={() => onRemove(stat.id)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
});

const CtaRow = memo(function CtaRow({ btn, onChange, onRemove }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]">
      <Input
        placeholder="Button Text"
        value={btn.text}
        onChange={(e) => onChange(btn.id, "text", e.target.value)}
        className="flex-1"
      />
      <Input
        placeholder="Link (e.g., /projects)"
        value={btn.link}
        onChange={(e) => onChange(btn.id, "link", e.target.value)}
        className="flex-1"
      />
      <Toggle label="Primary" checked={btn.primary} onChange={(val) => onChange(btn.id, "primary", val)} />
      <button
        type="button"
        onClick={() => onRemove(btn.id)}
        className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
});

export const AdminProfile = () => {
  const { profile, updateProfile, uploadFile, loading } = usePortfolio();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    subtitle: "",
    summary: "",
    profileImage: "",
    resumeUrl: "",
    ctaButtons: [],
    stats: [],
    published: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  useEffect(() => {
    if (!profile) return;

    const normalizedStats = (profile.stats || []).map((s) => ({
      id: s.id || makeId(),
      label: s.label || "",
      value: s.value || "",
    }));

    const normalizedButtons = (profile.ctaButtons || []).map((b) => ({
      id: b.id || makeId(),
      text: b.text || "",
      link: b.link || "",
      primary: !!b.primary,
    }));

    setFormData({
      name: profile.name || "",
      title: profile.title || "",
      subtitle: profile.subtitle || "",
      summary: profile.summary || "",
      profileImage: profile.profileImage || "",
      resumeUrl: profile.resumeUrl || "",
      ctaButtons: normalizedButtons,
      stats: normalizedStats,
      published: profile.published !== false,
    });
  }, [profile]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      e.target.value = ""; // reset early to allow reselecting same file

      const err = validateImage(file);
      if (err) return toast.error(err);

      setIsUploadingImage(true);
      try {
        const key = buildStoragePath("profile", file); // e.g. profile/uuid.png
        await uploadFile(file, key);

        if (!url || !/^https?:\/\//i.test(url)) {
          // This is the #1 real-world cause: uploadFile returns a key/path, not a public URL
          throw new Error("Upload completed but did not return a public URL.");
        }

        setFormData((prev) => ({ ...prev, profileImage: url }));
        toast.success("Image uploaded. Click Save Changes to persist.");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error(error?.message || "Failed to upload image");
      } finally {
        setIsUploadingImage(false);
      }
    },
    [uploadFile]
  );

  const handleResumeUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";

      const err = validatePdf(file);
      if (err) return toast.error(err);

      setIsUploadingResume(true);
      try {
        const key = buildStoragePath("resume", file);
        const url = await uploadFile(file, key);

        if (!url || !/^https?:\/\//i.test(url)) {
          throw new Error("Upload completed but did not return a public URL.");
        }

        setFormData((prev) => ({ ...prev, resumeUrl: url }));
        toast.success("Resume uploaded. Click Save Changes to persist.");
      } catch (error) {
        console.error("Resume upload failed:", error);
        toast.error(error?.message || "Failed to upload resume");
      } finally {
        setIsUploadingResume(false);
      }
    },
    [uploadFile]
  );

  const handleStatChange = useCallback((id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  }, []);

  const addStat = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { id: makeId(), label: "", value: "" }],
    }));
  }, []);

  const removeStat = useCallback((id) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((s) => s.id !== id),
    }));
  }, []);

  const handleCtaChange = useCallback((id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      ctaButtons: prev.ctaButtons.map((b) => (b.id === id ? { ...b, [field]: value } : b)),
    }));
  }, []);

  const addCtaButton = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      ctaButtons: [...prev.ctaButtons, { id: makeId(), text: "", link: "", primary: false }],
    }));
  }, []);

  const removeCtaButton = useCallback((id) => {
    setFormData((prev) => ({
      ...prev,
      ctaButtons: prev.ctaButtons.filter((b) => b.id !== id),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSaving(true);

      try {
        await updateProfile(formData);
        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Profile update failed:", error);
        toast.error(error?.message || "Failed to update profile");
      } finally {
        setIsSaving(false);
      }
    },
    [formData, updateProfile]
  );

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">Basic Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="Muzammal Bilal" required />
            <Input label="Title/Role" name="title" value={formData.title} onChange={handleChange} placeholder="AI/ML Engineer" required />
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
            <Textarea label="Summary" name="summary" value={formData.summary} onChange={handleChange} rows={4} placeholder="Brief summary about yourself..." />
          </div>
        </div>

        {/* Profile Image */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">Profile Image</h2>

          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-12 h-12 text-[var(--text-muted)]" />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm text-[var(--text-muted)] mb-4">Upload a professional photo. Recommended size: 400x400px.</p>

              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium cursor-pointer hover:bg-[var(--border-default)] transition-colors">
                <Upload size={18} />
                {isUploadingImage ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploadingImage} />
              </label>

              <Input className="mt-4" label="Or paste image URL" name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>
        </div>

        {/* Resume */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <h2 className="text-xl font-display font-bold text-[var(--text-primary)] mb-6">Resume/CV</h2>

          <div className="space-y-4">
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-medium cursor-pointer hover:bg-[var(--border-default)] transition-colors">
              <Upload size={18} />
              {isUploadingResume ? "Uploading..." : "Upload Resume (PDF)"}
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleResumeUpload}
                className="hidden"
                disabled={isUploadingResume}
              />
            </label>

            <Input label="Or paste resume URL" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="https://..." />

            {formData.resumeUrl && (
              <div className="text-sm">
                <p className="text-[var(--color-success-500)]">✓ Resume ready</p>
                <a className="underline text-[var(--text-primary)]" href={formData.resumeUrl} target="_blank" rel="noreferrer">
                  Open resume
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Stats/Highlights</h2>
            <Button type="button" variant="secondary" size="sm" onClick={addStat} icon={<Plus size={16} />}>
              Add Stat
            </Button>
          </div>

          <div className="space-y-4">
            {formData.stats.map((stat) => (
              <StatRow key={stat.id} stat={stat} onChange={handleStatChange} onRemove={removeStat} />
            ))}
            {formData.stats.length === 0 && <p className="text-[var(--text-muted)] text-center py-4">No stats added yet. Click "Add Stat" to add highlights.</p>}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Call-to-Action Buttons</h2>
            <Button type="button" variant="secondary" size="sm" onClick={addCtaButton} icon={<Plus size={16} />}>
              Add Button
            </Button>
          </div>

          <div className="space-y-4">
            {formData.ctaButtons.map((btn) => (
              <CtaRow key={btn.id} btn={btn} onChange={handleCtaChange} onRemove={removeCtaButton} />
            ))}
          </div>
        </div>

        {/* Publishing */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Publish Status</h2>
              <p className="text-sm text-[var(--text-muted)]">Control visibility on the public site</p>
            </div>
            <Toggle label="Published" checked={formData.published} onChange={(val) => setFormData((prev) => ({ ...prev, published: val }))} />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" loading={isSaving} icon={<Save size={18} />} disabled={isUploadingImage || isUploadingResume}>
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AdminProfile;
