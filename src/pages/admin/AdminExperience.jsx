import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { usePortfolio } from '../../contexts/PortfolioContext';
import { Loading, Button, Input, Textarea, Toggle, TagInput, Modal, ConfirmModal } from '../../components/common';
import toast from 'react-hot-toast';

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex items-start gap-2">
        <button {...listeners} className="p-2 mt-4 cursor-grab text-[var(--text-muted)] hover:text-[var(--text-primary)]"><GripVertical size={20} /></button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export const AdminExperience = () => {
  const { experience, addExperience, updateExperience, deleteExperience, reorderExperience, loading } = usePortfolio();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({ company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '', bullets: [], techTags: [], published: true });
  const [isSaving, setIsSaving] = useState(false);
  const [bulletInput, setBulletInput] = useState('');

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = experience.findIndex(item => item.id === active.id);
      const newIndex = experience.findIndex(item => item.id === over.id);
      const newOrder = arrayMove(experience, oldIndex, newIndex);
      try { await reorderExperience(newOrder); toast.success('Order updated!'); } catch { toast.error('Failed'); }
    }
  };

  const openModal = (item = null) => {
    setSelectedItem(item);
    setFormData(item ? { company: item.company || '', role: item.role || '', location: item.location || '', startDate: item.startDate || '', endDate: item.endDate || '', current: item.current || false, description: item.description || '', bullets: item.bullets || [], techTags: item.techTags || [], published: item.published !== false } : { company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '', bullets: [], techTags: [], published: true });
    setIsModalOpen(true);
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const addBullet = () => { if (bulletInput.trim()) { setFormData(prev => ({ ...prev, bullets: [...prev.bullets, bulletInput.trim()] })); setBulletInput(''); } };
  const removeBullet = (index) => setFormData(prev => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSaving(true);
    try {
      selectedItem ? await updateExperience(selectedItem.id, formData) : await addExperience(formData);
      toast.success(selectedItem ? 'Updated!' : 'Added!'); setIsModalOpen(false);
    } catch { toast.error('Failed'); } finally { setIsSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteExperience(selectedItem.id); toast.success('Deleted!'); setIsDeleteModalOpen(false); } catch { toast.error('Failed'); }
  };

  if (loading) return <Loading />;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="text-xl font-display font-bold text-[var(--text-primary)]">Work Experience</h2><p className="text-[var(--text-muted)]">{experience?.length || 0} entries</p></div>
        <Button onClick={() => openModal()} icon={<Plus size={18} />}>Add Experience</Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experience?.map(e => e.id) || []} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {experience?.map((exp) => (
              <SortableItem key={exp.id} id={exp.id}>
                <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{exp.role}</h3>
                        {!exp.published && <span className="px-2 py-0.5 rounded-full bg-[var(--color-warning-500)]/10 text-[var(--color-warning-500)] text-xs">Draft</span>}
                        {exp.current && <span className="px-2 py-0.5 rounded-full bg-[var(--color-success-500)]/10 text-[var(--color-success-500)] text-xs">Current</span>}
                      </div>
                      <p className="text-[var(--color-primary-500)]">{exp.company}</p>
                      <p className="text-sm text-[var(--text-muted)]">{exp.startDate} — {exp.endDate || 'Present'}{exp.location && ` · ${exp.location}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openModal(exp)} className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-muted)]"><Edit size={18} /></button>
                      <button onClick={() => { setSelectedItem(exp); setIsDeleteModalOpen(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-[var(--text-muted)] hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  {exp.techTags?.length > 0 && <div className="flex flex-wrap gap-2 mt-4">{exp.techTags.map((tag, i) => <span key={i} className="px-2.5 py-1 rounded-lg bg-[var(--bg-tertiary)] text-xs text-[var(--text-secondary)]">{tag}</span>)}</div>}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {(!experience || experience.length === 0) && <div className="text-center py-12 text-[var(--text-muted)]">No entries yet.</div>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedItem ? 'Edit Experience' : 'Add Experience'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Company" name="company" value={formData.company} onChange={handleChange} required />
            <Input label="Role" name="role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
            <Input label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} placeholder="Jul 2024" required />
            <Input label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} />
          </div>
          <Toggle label="Currently working here" checked={formData.current} onChange={(v) => setFormData(p => ({ ...p, current: v, endDate: v ? 'Present' : '' }))} />
          <Textarea label="Description" name="description" value={formData.description} onChange={handleChange} rows={2} />
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">Achievements</label>
            {formData.bullets.map((b, i) => <div key={i} className="flex items-center gap-2 p-2 mb-2 rounded bg-[var(--bg-tertiary)]"><span className="flex-1 text-sm">{b}</span><button type="button" onClick={() => removeBullet(i)} className="text-red-500"><X size={16} /></button></div>)}
            <div className="flex gap-2"><Input value={bulletInput} onChange={(e) => setBulletInput(e.target.value)} placeholder="Add..." onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addBullet())} /><Button type="button" variant="secondary" onClick={addBullet}>Add</Button></div>
          </div>
          <TagInput label="Tech Tags" tags={formData.techTags} onChange={(t) => setFormData(p => ({ ...p, techTags: t }))} />
          <Toggle label="Published" checked={formData.published} onChange={(v) => setFormData(p => ({ ...p, published: v }))} />
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-default)]">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" loading={isSaving}>Save</Button>
          </div>
        </form>
      </Modal>
      <ConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} title="Delete Experience" message={`Delete "${selectedItem?.role}"?`} confirmText="Delete" />
    </motion.div>
  );
};

export default AdminExperience;
