'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Mail, Check } from 'lucide-react';

interface Submission {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    is_read: boolean;
    submitted_at: string;
}

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
    const [selected, setSelected] = useState<Submission | null>(null);

    useEffect(() => { loadSubmissions(); }, []);

    async function loadSubmissions() {
        const { data } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('submitted_at', { ascending: false });
        setSubmissions(data || []);
        setLoading(false);
    }

    async function toggleRead(sub: Submission) {
        const { error } = await supabase
            .from('contact_submissions')
            .update({ is_read: !sub.is_read })
            .eq('id', sub.id);
        if (!error) {
            setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, is_read: !s.is_read } : s));
            if (selected?.id === sub.id) setSelected({ ...sub, is_read: !sub.is_read });
        }
    }

    async function deleteSubmission(id: string) {
        if (!confirm('Are you sure you want to delete this submission?')) return;
        const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
        if (!error) {
            setSubmissions(prev => prev.filter(s => s.id !== id));
            if (selected?.id === id) setSelected(null);
        }
    }

    const filtered = submissions.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.message.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || (filter === 'unread' ? !s.is_read : s.is_read);
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <div className="admin-page-header">
                <h1>Contact Submissions</h1>
                <p>{submissions.length} total · {submissions.filter(s => !s.is_read).length} unread</p>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or message..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="admin-select"
                    style={{ width: 'auto', minWidth: '140px' }}
                    value={filter}
                    onChange={e => setFilter(e.target.value as 'all' | 'unread' | 'read')}
                >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </div>

            {loading ? (
                <div className="admin-card"><p style={{ color: 'var(--admin-text-secondary)', padding: '2rem', textAlign: 'center' }}>Loading submissions...</p></div>
            ) : (
                <>
                    <div className="admin-card" style={{ padding: 0 }}>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map(sub => (
                                        <tr key={sub.id} style={{ cursor: 'pointer' }} onClick={() => { setSelected(sub); if (!sub.is_read) toggleRead(sub); }}>
                                            <td style={{ fontWeight: sub.is_read ? 400 : 600 }}>{sub.name}</td>
                                            <td style={{ color: 'var(--admin-text-secondary)' }}>{sub.email}</td>
                                            <td style={{ color: 'var(--admin-text-secondary)' }}>{sub.phone || '—'}</td>
                                            <td style={{ color: 'var(--admin-text-secondary)', whiteSpace: 'nowrap' }}>
                                                {new Date(sub.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td>
                                                <span className={`admin-badge ${sub.is_read ? 'admin-badge-read' : 'admin-badge-unread'}`}>
                                                    {sub.is_read ? 'Read' : 'New'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }} onClick={e => e.stopPropagation()}>
                                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" onClick={() => toggleRead(sub)} title={sub.is_read ? 'Mark as Unread' : 'Mark as Read'}>
                                                        {sub.is_read ? <Mail size={14} /> : <Check size={14} />}
                                                    </button>
                                                    <button className="admin-btn admin-btn-ghost admin-btn-sm" style={{ color: '#ef4444' }} onClick={() => deleteSubmission(sub.id)} title="Delete">
                                                        ✕
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filtered.length === 0 && (
                                        <tr>
                                            <td colSpan={6} style={{ textAlign: 'center', color: 'var(--admin-text-secondary)', padding: '3rem' }}>
                                                {search || filter !== 'all' ? 'No matching submissions found' : 'No submissions yet'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detail Modal */}
                    {selected && (
                        <div className="admin-modal-backdrop" onClick={() => setSelected(null)}>
                            <div className="admin-modal" onClick={e => e.stopPropagation()}>
                                <h3>Submission from {selected.name}</h3>
                                <div className="admin-submission-detail">
                                    <div className="admin-detail-item">
                                        <label>Name</label>
                                        <p>{selected.name}</p>
                                    </div>
                                    <div className="admin-detail-item">
                                        <label>Email</label>
                                        <p><a href={`mailto:${selected.email}`} style={{ color: 'var(--admin-accent)' }}>{selected.email}</a></p>
                                    </div>
                                    <div className="admin-detail-item">
                                        <label>Phone</label>
                                        <p>{selected.phone || 'Not provided'}</p>
                                    </div>
                                    <div className="admin-detail-item">
                                        <label>Submitted</label>
                                        <p>{new Date(selected.submitted_at).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                                    </div>
                                </div>
                                <div className="admin-message-box">
                                    <label>Message</label>
                                    <p>{selected.message}</p>
                                </div>
                                <div className="admin-modal-actions">
                                    <a href={`mailto:${selected.email}`} className="admin-btn admin-btn-primary admin-btn-sm">
                                        <Mail size={14} /> Reply via Email
                                    </a>
                                    <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => setSelected(null)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
