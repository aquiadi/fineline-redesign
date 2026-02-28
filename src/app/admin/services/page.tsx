'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Save, Trash2, GripVertical, CheckCircle } from 'lucide-react';

interface Service {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    hero_image: string;
    content_image: string;
    sort_order: number;
}

const ICON_OPTIONS = ['Car', 'ShieldAlert', 'Hammer', 'Paintbrush', 'History', 'Wrench', 'Zap', 'Shield'];

export default function ServicesAdminPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Service | null>(null);
    const [toast, setToast] = useState('');

    useEffect(() => { loadServices(); }, []);

    async function loadServices() {
        const { data } = await supabase.from('services').select('*').order('sort_order');
        setServices(data || []);
        setLoading(false);
    }

    async function saveService(service: Service) {
        const { id, ...rest } = service;
        if (id.startsWith('new-')) {
            const { data, error } = await supabase.from('services').insert({ ...rest }).select().single();
            if (!error && data) {
                setServices(prev => prev.map(s => s.id === id ? data : s));
            }
        } else {
            await supabase.from('services').update(rest).eq('id', id);
        }
        setEditing(null);
        setToast('Service saved!');
        setTimeout(() => setToast(''), 3000);
        loadServices();
    }

    async function deleteService(id: string) {
        if (!confirm('Delete this service?')) return;
        if (id.startsWith('new-')) {
            setServices(prev => prev.filter(s => s.id !== id));
        } else {
            await supabase.from('services').delete().eq('id', id);
            loadServices();
        }
        if (editing?.id === id) setEditing(null);
        setToast('Service deleted');
        setTimeout(() => setToast(''), 3000);
    }

    function addNew() {
        const newService: Service = {
            id: 'new-' + Date.now(),
            title: '',
            description: '',
            icon_name: 'Car',
            hero_image: '',
            content_image: '',
            sort_order: services.length + 1,
        };
        setServices(prev => [...prev, newService]);
        setEditing(newService);
    }

    return (
        <>
            <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Services</h1>
                    <p>Manage the services listed on your website</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={addNew}>
                    <Plus size={16} /> Add Service
                </button>
            </div>

            {loading ? (
                <div className="admin-card"><p style={{ color: 'var(--admin-text-secondary)', padding: '2rem', textAlign: 'center' }}>Loading...</p></div>
            ) : (
                <div className="admin-card">
                    {services.map(service => (
                        <div key={service.id} className="admin-sortable-item">
                            <div className="admin-sortable-handle"><GripVertical size={18} /></div>
                            <div className="admin-sortable-content">
                                <h5>{service.title || 'Untitled Service'}</h5>
                                <p>{service.description.substring(0, 100)}{service.description.length > 100 ? '...' : ''}</p>
                            </div>
                            <div className="admin-sortable-actions">
                                <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setEditing(service)}>Edit</button>
                                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteService(service.id)}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {services.length === 0 && (
                        <div className="admin-empty-state">
                            <h4>No services yet</h4>
                            <p>Click &quot;Add Service&quot; to create your first service listing.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Edit Modal */}
            {editing && (
                <ServiceEditor
                    service={editing}
                    onSave={saveService}
                    onCancel={() => { setEditing(null); if (editing.id.startsWith('new-')) setServices(prev => prev.filter(s => s.id !== editing.id)); }}
                />
            )}

            {toast && <div className="admin-toast"><CheckCircle size={16} /> {toast}</div>}
        </>
    );
}

function ServiceEditor({ service, onSave, onCancel }: { service: Service; onSave: (s: Service) => void; onCancel: () => void }) {
    const [form, setForm] = useState(service);
    const [saving, setSaving] = useState(false);

    function update(key: keyof Service, value: string | number) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    async function handleSave() {
        if (!form.title.trim()) { alert('Title is required'); return; }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    }

    return (
        <div className="admin-modal-backdrop" onClick={onCancel}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
                <h3>{service.id.startsWith('new-') ? 'Add New Service' : 'Edit Service'}</h3>

                <div className="admin-form-group">
                    <label>Service Title</label>
                    <input className="admin-input" value={form.title} onChange={e => update('title', e.target.value)} placeholder="e.g. Collision Repair" />
                </div>

                <div className="admin-form-group">
                    <label>Description</label>
                    <textarea className="admin-textarea" value={form.description} onChange={e => update('description', e.target.value)} rows={5} placeholder="Describe this service..." />
                </div>

                <div className="admin-grid-2">
                    <div className="admin-form-group">
                        <label>Icon</label>
                        <select className="admin-select" value={form.icon_name} onChange={e => update('icon_name', e.target.value)}>
                            {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                    </div>
                    <div className="admin-form-group">
                        <label>Sort Order</label>
                        <input className="admin-input" type="number" value={form.sort_order} onChange={e => update('sort_order', Number(e.target.value))} />
                    </div>
                </div>

                <div className="admin-form-group">
                    <label>Hero Image URL</label>
                    <input className="admin-input" value={form.hero_image} onChange={e => update('hero_image', e.target.value)} placeholder="https://..." />
                    {form.hero_image && <img src={form.hero_image} alt="Preview" className="admin-image-preview" />}
                </div>

                <div className="admin-form-group">
                    <label>Content Image URL</label>
                    <input className="admin-input" value={form.content_image} onChange={e => update('content_image', e.target.value)} placeholder="https://..." />
                    {form.content_image && <img src={form.content_image} alt="Preview" className="admin-image-preview" />}
                </div>

                <div className="admin-modal-actions">
                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={onCancel}>Cancel</button>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={handleSave} disabled={saving}>
                        <Save size={14} /> {saving ? 'Saving...' : 'Save Service'}
                    </button>
                </div>
            </div>
        </div>
    );
}
