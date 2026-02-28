'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, CheckCircle } from 'lucide-react';

interface ContentItem {
    id: string;
    section: string;
    key: string;
    value: string;
}

export default function ContentPage() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    useEffect(() => { loadContent(); }, []);

    async function loadContent() {
        const { data } = await supabase.from('site_content').select('*').order('section').order('key');
        setContent(data || []);
        setLoading(false);
    }

    function updateField(id: string, value: string) {
        setContent(prev => prev.map(c => c.id === id ? { ...c, value } : c));
    }

    async function handleSave() {
        setSaving(true);
        for (const item of content) {
            await supabase.from('site_content').update({ value: item.value, updated_at: new Date().toISOString() }).eq('id', item.id);
        }
        setSaving(false);
        setToast('Content saved successfully!');
        setTimeout(() => setToast(''), 3000);
    }

    const sections = ['hero', 'about', 'mission'];
    const sectionLabels: Record<string, string> = { hero: '🏠 Hero Section', about: '📄 About Page', mission: '🎯 Mission Statement' };

    const fieldLabels: Record<string, string> = {
        tag: 'Tag Line', title: 'Title', subtitle: 'Subtitle',
        stat_1_number: 'Stat 1 Number', stat_1_label: 'Stat 1 Label',
        stat_2_number: 'Stat 2 Number', stat_2_label: 'Stat 2 Label',
        stat_3_number: 'Stat 3 Number', stat_3_label: 'Stat 3 Label',
        stat_4_number: 'Stat 4 Number', stat_4_label: 'Stat 4 Label',
        bg_image: 'Background Image URL',
        paragraph_1: 'Paragraph 1', paragraph_2: 'Paragraph 2', paragraph_3: 'Paragraph 3',
        paragraph_4: 'Paragraph 4', paragraph_5: 'Paragraph 5',
        image_1: 'Image 1 URL', image_2: 'Image 2 URL',
        quote: 'Mission Quote',
    };

    if (loading) {
        return (
            <div className="admin-page-header">
                <h1>Website Content</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1>Website Content</h1>
                    <p>Edit text and images displayed on the website</p>
                </div>
                <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
                    <Save size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>

            {sections.map(section => {
                const items = content.filter(c => c.section === section);
                if (items.length === 0) return null;
                return (
                    <div key={section} className="admin-card">
                        <div className="admin-card-header">
                            <h3>{sectionLabels[section] || section}</h3>
                        </div>
                        <div className="admin-content-section">
                            {items.map(item => {
                                const isLongText = item.key.startsWith('paragraph') || item.key === 'subtitle' || item.key === 'quote' || item.key === 'description';
                                const isImage = item.key.includes('image') || item.key.includes('bg_image');
                                return (
                                    <div key={item.id} className="admin-form-group">
                                        <label>{fieldLabels[item.key] || item.key}</label>
                                        {isLongText ? (
                                            <textarea
                                                className="admin-textarea"
                                                value={item.value}
                                                onChange={e => updateField(item.id, e.target.value)}
                                                rows={4}
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                className="admin-input"
                                                value={item.value}
                                                onChange={e => updateField(item.id, e.target.value)}
                                            />
                                        )}
                                        {isImage && item.value && (
                                            <img src={item.value} alt="Preview" className="admin-image-preview" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {toast && (
                <div className="admin-toast">
                    <CheckCircle size={16} /> {toast}
                </div>
            )}
        </>
    );
}
