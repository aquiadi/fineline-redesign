'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import '../admin.css';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        // Debug: show if env vars are available
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        setDebugInfo(url ? `Connected to: ${url}` : '⚠️ SUPABASE_URL is missing!');
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
            } else {
                router.push('/admin');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(
                `Network error: Could not reach Supabase. Check your internet connection. (${err instanceof Error ? err.message : 'Unknown error'})`
            );
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    <h1>FINE LINE</h1>
                    <p>Admin Portal</p>
                </div>

                {debugInfo && (
                    <div style={{
                        fontSize: '0.7rem',
                        color: debugInfo.includes('⚠️') ? '#ef4444' : 'var(--admin-text-secondary)',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        opacity: 0.6,
                    }}>
                        {debugInfo}
                    </div>
                )}

                {error && (
                    <div className="admin-login-error">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="admin-form-group">
                        <label htmlFor="admin-email">Email Address</label>
                        <input
                            id="admin-email"
                            type="email"
                            className="admin-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@finelineautobody.com"
                            required
                        />
                    </div>
                    <div className="admin-form-group">
                        <label htmlFor="admin-password">Password</label>
                        <input
                            id="admin-password"
                            type="password"
                            className="admin-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                        style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.9rem', marginTop: '0.5rem' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
