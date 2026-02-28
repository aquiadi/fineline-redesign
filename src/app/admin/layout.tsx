'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import {
    LayoutDashboard,
    Inbox,
    FileText,
    Wrench,
    MessageSquare,
    Image,
    LogOut,
} from 'lucide-react';
import './admin.css';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/submissions', label: 'Submissions', icon: Inbox },
    { href: '/admin/content', label: 'Content', icon: FileText },
    { href: '/admin/services', label: 'Services', icon: Wrench },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/gallery', label: 'Gallery', icon: Image },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            } else {
                setAuthenticated(!!session);
            }
            setLoading(false);
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session && pathname !== '/admin/login') {
                router.push('/admin/login');
            }
            setAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    // Login page — no sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="admin-login-page">
                <div style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>Loading...</div>
            </div>
        );
    }

    if (!authenticated) {
        return null;
    }

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-logo">
                    <h2>FINE LINE</h2>
                    <span>Content Manager</span>
                </div>
                <nav className="admin-sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`admin-nav-link${isActive ? ' active' : ''}`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="admin-sidebar-footer">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        <LogOut size={16} />
                        Sign Out
                    </button>
                </div>
            </aside>
            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
