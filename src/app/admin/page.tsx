'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Inbox, Eye, Wrench, MessageSquare, Image, ArrowRight } from 'lucide-react';

interface Stats {
    totalSubmissions: number;
    unreadSubmissions: number;
    activeServices: number;
    totalTestimonials: number;
    galleryImages: number;
}

interface Submission {
    id: string;
    name: string;
    email: string;
    is_read: boolean;
    submitted_at: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({ totalSubmissions: 0, unreadSubmissions: 0, activeServices: 0, totalTestimonials: 0, galleryImages: 0 });
    const [recentSubmissions, setRecentSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        const [subsResult, unreadResult, servicesResult, testimonialsResult, galleryResult] = await Promise.all([
            supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
            supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
            supabase.from('services').select('*', { count: 'exact', head: true }),
            supabase.from('testimonials').select('*', { count: 'exact', head: true }).eq('is_visible', true),
            supabase.from('gallery_images').select('*', { count: 'exact', head: true }).eq('is_visible', true),
        ]);

        setStats({
            totalSubmissions: subsResult.count || 0,
            unreadSubmissions: unreadResult.count || 0,
            activeServices: servicesResult.count || 0,
            totalTestimonials: testimonialsResult.count || 0,
            galleryImages: galleryResult.count || 0,
        });

        const { data } = await supabase
            .from('contact_submissions')
            .select('id, name, email, is_read, submitted_at')
            .order('submitted_at', { ascending: false })
            .limit(5);

        setRecentSubmissions(data || []);
        setLoading(false);
    }

    if (loading) {
        return (
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="admin-page-header">
                <h1>Dashboard</h1>
                <p>Welcome back — {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Stats */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon"><Inbox size={20} /></div>
                    <div className="admin-stat-value">{stats.totalSubmissions}</div>
                    <div className="admin-stat-label">Total Submissions</div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon"><Eye size={20} /></div>
                    <div className="admin-stat-value">{stats.unreadSubmissions}</div>
                    <div className="admin-stat-label">Unread Messages</div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon"><Wrench size={20} /></div>
                    <div className="admin-stat-value">{stats.activeServices}</div>
                    <div className="admin-stat-label">Active Services</div>
                </div>
                <div className="admin-stat-card">
                    <div className="admin-stat-icon"><MessageSquare size={20} /></div>
                    <div className="admin-stat-value">{stats.totalTestimonials}</div>
                    <div className="admin-stat-label">Testimonials</div>
                </div>
            </div>

            {/* Recent Submissions */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3>Recent Submissions</h3>
                    <Link href="/admin/submissions" className="admin-btn admin-btn-ghost admin-btn-sm">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentSubmissions.map((sub) => (
                                <tr key={sub.id}>
                                    <td style={{ fontWeight: sub.is_read ? 400 : 600 }}>{sub.name}</td>
                                    <td style={{ color: 'var(--admin-text-secondary)' }}>{sub.email}</td>
                                    <td style={{ color: 'var(--admin-text-secondary)', whiteSpace: 'nowrap' }}>
                                        {new Date(sub.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${sub.is_read ? 'admin-badge-read' : 'admin-badge-unread'}`}>
                                            {sub.is_read ? 'Read' : 'New'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {recentSubmissions.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--admin-text-secondary)', padding: '2rem' }}>
                                        No submissions yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3>Quick Actions</h3>
                </div>
                <div className="admin-quick-actions">
                    <Link href="/admin/content" className="admin-btn admin-btn-outline">Edit Website Content</Link>
                    <Link href="/admin/services" className="admin-btn admin-btn-outline">Manage Services</Link>
                    <Link href="/admin/testimonials" className="admin-btn admin-btn-outline">Manage Testimonials</Link>
                    <Link href="/admin/gallery" className="admin-btn admin-btn-outline">Update Gallery</Link>
                </div>
            </div>
        </>
    );
}
