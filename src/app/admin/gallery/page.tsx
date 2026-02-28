'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Eye, EyeOff, CheckCircle, Save } from 'lucide-react';

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    sort_order: number;
    is_visible: boolean;
}

export default function GalleryAdminPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<GalleryImage | null>(null);
    const [toast, setToast] = useState('');

    useEffect(() => { loadImages(); }, []);

    async function loadImages() {
        const { data } = await supabase.from('gallery_images').select('*').order('sort_order');
        setImages(data || []);
        setLoading(false);
    }

    async function toggleVisibility(img: GalleryImage) {
        await supabase.from('gallery_images').update({ is_visible: !img.is_visible }).eq('id', img.id);
        setImages(prev => prev.map(i => i.id === img.id ? { ...i, is_visible: !i.is_visible } : i));
    }

    async function deleteImage(id: string) {
        if (!confirm('Remove this image from the gallery?')) return;
        if (id.startsWith('new-')) {
            setImages(prev => prev.filter(i => i.id !== id));
        } else {
            await supabase.from('gallery_images').delete().eq('id', id);
            loadImages();
        }
        if (editing?.id === id) setEditing(null);
        setToast('Image removed');
        setTimeout(() => setToast(''), 3000);
    }

    async function saveImage(img: GalleryImage) {
        const { id, ...rest } = img;
        if (id.startsWith('new-')) {
            await supabase.from('gallery_images').insert(rest);
        } else {
            await supabase.from('gallery_images').update(rest).eq('id', id);
        }
        setEditing(null);
        setToast('Image saved!');
        setTimeout(() => setToast(''), 3000);
        loadImages();
    }

    function addNew() {
        const newImg: GalleryImage = {
            id: 'new-' + Date.now(),
            src: '',
            alt: '',
            sort_order: images.length + 1,
            is_visible: true,
        };
        setEditing(newImg);
    }

    return (
        <>
            <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Gallery</h1>
                    <p>{images.length} images · {images.filter(i => i.is_visible).length} visible</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={addNew}>
                    <Plus size={16} /> Add Image
                </button>
            </div>

            {loading ? (
                <div className="admin-card"><p style={{ color: 'var(--admin-text-secondary)', padding: '2rem', textAlign: 'center' }}>Loading...</p></div>
            ) : (
                <div className="admin-gallery-grid">
                    {images.map(img => (
                        <div key={img.id} className="admin-gallery-item" style={{ opacity: img.is_visible ? 1 : 0.4 }}>
                            <img src={img.src} alt={img.alt} loading="lazy" />
                            <div className="admin-gallery-item-overlay">
                                <div className="admin-gallery-item-actions">
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ color: 'white' }} onClick={() => toggleVisibility(img)} title={img.is_visible ? 'Hide' : 'Show'}>
                                        {img.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ color: 'white' }} onClick={() => setEditing(img)} title="Edit">
                                        ✏️
                                    </button>
                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ color: '#ef4444' }} onClick={() => deleteImage(img.id)} title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {images.length === 0 && (
                        <div className="admin-empty-state" style={{ gridColumn: '1 / -1' }}>
                            <h4>No gallery images</h4>
                            <p>Click &quot;Add Image&quot; to start building your gallery.</p>
                        </div>
                    )}
                </div>
            )}

            {editing && (
                <div className="admin-modal-backdrop" onClick={() => setEditing(null)}>
                    <div className="admin-modal" onClick={e => e.stopPropagation()}>
                        <h3>{editing.id.startsWith('new-') ? 'Add Gallery Image' : 'Edit Gallery Image'}</h3>
                        <ImageForm image={editing} onSave={saveImage} onCancel={() => setEditing(null)} />
                    </div>
                </div>
            )}

            {toast && <div className="admin-toast"><CheckCircle size={16} /> {toast}</div>}
        </>
    );
}

function ImageForm({ image, onSave, onCancel }: { image: GalleryImage; onSave: (img: GalleryImage) => void; onCancel: () => void }) {
    const [form, setForm] = useState(image);
    const [saving, setSaving] = useState(false);

    async function handleSave() {
        if (!form.src.trim()) { alert('Image URL is required'); return; }
        setSaving(true);
        await onSave(form);
        setSaving(false);
    }

    return (
        <>
            <div className="admin-form-group">
                <label>Image URL</label>
                <input className="admin-input" value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} placeholder="https://..." />
                {form.src && <img src={form.src} alt="Preview" className="admin-image-preview" style={{ maxWidth: '100%', marginTop: '12px' }} />}
            </div>
            <div className="admin-grid-2">
                <div className="admin-form-group">
                    <label>Alt Text</label>
                    <input className="admin-input" value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} placeholder="Describe the image..." />
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
