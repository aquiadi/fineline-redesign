'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Save, Trash2, Eye, EyeOff, CheckCircle } from 'lucide-react';

interface Testimonial {
    id: string;
    name: string;
    text: string;
    avatar_url: string;
    sort_order: number;
    is_visible: boolean;
}

export default function TestimonialsAdminPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [toast, setToast] = useState('');

    useEffect(() => { loadTestimonials(); }, []);

    async function loadTestimonials() {
        const { data } = await supabase.from('testimonials').select('*').order('sort_order');
        setTestimonials(data || []);
        setLoading(false);
    }

    async function saveTestimonial(testimonial: Testimonial) {
        const { id, ...rest } = testimonial;
        if (id.startsWith('new-')) {
            await supabase.from('testimonials').insert(rest);
        } else {
            await supabase.from('testimonials').update(rest).eq('id', id);
        }
        setEditing(null);
        setToast('Testimonial saved!');
        setTimeout(() => setToast(''), 3000);
        loadTestimonials();
    }

    async function deleteTestimonial(id: string) {
        if (!confirm('Delete this testimonial?')) return;
        if (id.startsWith('new-')) {
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } else {
            await supabase.from('testimonials').delete().eq('id', id);
            loadTestimonials();
        }
        if (editing?.id === id) setEditing(null);
        setToast('Testimonial deleted');
        setTimeout(() => setToast(''), 3000);
    }

    async function toggleVisibility(t: Testimonial) {
        await supabase.from('testimonials').update({ is_visible: !t.is_visible }).eq('id', t.id);
        setTestimonials(prev => prev.map(item => item.id === t.id ? { ...item, is_visible: !item.is_visible } : item));
    }

    function addNew() {
        const newT: Testimonial = {
            id: 'new-' + Date.now(),
            name: '',
            text: '',
            avatar_url: '',
            sort_order: testimonials.length + 1,
            is_visible: true,
        };
        setTestimonials(prev => [...prev, newT]);
        setEditing(newT);
    }

    return (
        <>
            <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Testimonials</h1>
                    <p>Manage customer reviews displayed on the website</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={addNew}>
                    <Plus size={16} /> Add Testimonial
                </button>
            </div>

            {loading ? (
                <div className="admin-card"><p style={{ color: 'var(--admin-text-secondary)', padding: '2rem', textAlign: 'center' }}>Loading...</p></div>
            ) : (
                <div className="admin-card">
                    {testimonials.map(t => (
                        <div key={t.id} className="admin-testimonial-card">
                            <div className="admin-testimonial-header">
                                <div className="admin-testimonial-avatar">
                                    {t.avatar_url ? <img src={t.avatar_url} alt={t.name} /> : t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h5 style={{ margin: 0, fontSize: '0.9rem' }}>{t.name || 'Unnamed'}</h5>
                                    <span className={`admin-badge ${t.is_visible ? 'admin-badge-visible' : 'admin-badge-hidden'}`} style={{ marginTop: '4px' }}>
                                        {t.is_visible ? 'Visible' : 'Hidden'}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => toggleVisibility(t)} title={t.is_visible ? 'Hide' : 'Show'}>
                                        {t.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setEditing(t)}>Edit</button>
                                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteTestimonial(t.id)}>
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="admin-testimonial-text">&ldquo;{t.text}&rdquo;</p>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="admin-empty-state">
                            <h4>No testimonials yet</h4>
                            <p>Click &quot;Add Testimonial&quot; to add customer reviews.</p>
                        </div>
                    )}
                </div>
            )}

            {editing && (
                <div className="admin-modal-backdrop" onClick={() => { setEditing(null); if (editing.id.startsWith('new-')) setTestimonials(prev => prev.filter(t => t.id !== editing.id)); }}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <h3>{editing.id.startsWith('new-') ? 'Add Testimonial' : 'Edit Testimonial'}</h3>
                        <TestimonialForm
                            initial={editing}
                            onSave={saveTestimonial}
                            onCancel={() => { setEditing(null); if (editing.id.startsWith('new-')) setTestimonials(prev => prev.filter(t => t.id !== editing.id)); }}
                        />
                    </div>
                </div>
            )}

            {toast && <div className="admin-toast"><CheckCircle size={16} /> {toast}</div>}
        </>
    );
}

function TestimonialForm({ initial, onSave, onCancel }: { initial: Testimonial; onSave: (t: Testimonial) => void; onCancel: () => void }) {
    const [form, setForm] = useState(initial);
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        if (!form.name.trim() || !form.text.trim()) { alert('Name and review text are required'); return; }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    }

    return (
        <>
            <div className="admin-form-group">
                <label>Customer Name</label>
                <input className="admin-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" />
            </div>
            <div className="admin-form-group">
                <label>Review Text</label>
                <textarea className="admin-textarea" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={4} placeholder="What did the customer say..." />
            </div>
            <div className="admin-grid-2">
                <div className="admin-form-group">
                    <label>Avatar URL (optional)</label>
                    <input className="admin-input" value={form.avatar_url} onChange={e => setForm({ ...form, avatar_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="admin-form-group">
                    <label>Sort Order</label>
                    <input className="admin-input" type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: Number(e.target.value) })} />
                </div>
            </div>
            <div className="admin-modal-actions">
                <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onCancel}>Cancel</button>
                <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave} disabled={saving}>
                    <Save size={14} /> {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </>
    );
}
