'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Heart, Zap, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ContentMap { [key: string]: string; }

export default function AboutPage() {
    const [about, setAbout] = useState<ContentMap>({});
    const [mission, setMission] = useState<ContentMap>({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from('site_content').select('section, key, value').in('section', ['about', 'mission']);
            const bySection: Record<string, ContentMap> = {};
            (data || []).forEach((c: { section: string; key: string; value: string }) => {
                if (!bySection[c.section]) bySection[c.section] = {};
                bySection[c.section][c.key] = c.value;
            });
            setAbout(bySection['about'] || {});
            setMission(bySection['mission'] || {});
            setLoaded(true);
        }
        load();
    }, []);

    return (
        <>
            {/* Hero Banner */}
            <section className="page-hero" style={{
                backgroundImage: 'url(https://d2ugbn5gb88fyp.cloudfront.net/1523021/0_0.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="page-hero-overlay" />
                <motion.h1
                    className="page-hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    ABOUT US
                </motion.h1>
                <motion.p
                    className="page-hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Your Premier Auto Body Destination in San Bruno, CA
                </motion.p>
            </section>

            {/* About Content */}
            {loaded && (
                <section className="section">
                    <div className="section-inner">
                        <div className="about-content-section">
                            <motion.div
                                className="about-text"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <span className="section-tag">Our Story</span>
                                <h3>{about.title || 'About Fine Line Auto Body'}</h3>
                                <p>{about.paragraph_1 || ''}</p>
                                <p>{about.paragraph_2 || ''}</p>
                                <p>{about.paragraph_3 || ''}</p>
                                <p>{about.paragraph_4 || ''}</p>
                                <p>{about.paragraph_5 || ''}</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="about-image-wrapper" style={{ marginBottom: '2rem' }}>
                                    <img
                                        src={about.image_1 || 'https://d2ugbn5gb88fyp.cloudfront.net/1523026/0_0.png'}
                                        alt="Professional auto body paint spraying at Fine Line"
                                    />
                                </div>
                                <div className="about-image-wrapper">
                                    <img
                                        src={about.image_2 || 'https://d2ugbn5gb88fyp.cloudfront.net/1523028/0_0.png'}
                                        alt="Completed vehicle repair at Fine Line Auto Body"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Values */}
            <section className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="section-inner">
                    <div className="section-header">
                        <span className="section-tag">Our Values</span>
                        <h2 className="section-title">What Drives Us</h2>
                        <div className="section-line" />
                    </div>
                    <div className="values-grid">
                        {[
                            { icon: <Wrench size={32} />, title: 'Expert Craftsmanship', text: 'Skilled technicians with years of experience delivering flawless results every time.' },
                            { icon: <Heart size={32} />, title: 'Customer First', text: 'Your satisfaction is our top priority. We go above and beyond on every repair.' },
                            { icon: <Zap size={32} />, title: 'Fast Turnaround', text: 'We minimize downtime and get you back on the road as quickly as possible.' },
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                className="value-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="value-card-icon">{value.icon}</div>
                                <h4>{value.title}</h4>
                                <p>{value.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="section mission-section">
                <div className="section-inner">
                    <div className="section-header">
                        <span className="section-tag">Our Mission</span>
                        <h2 className="section-title">{mission.title || 'Driven By Excellence'}</h2>
                    </div>
                    <motion.div
                        className="mission-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <blockquote>
                            {mission.quote || 'Our mission is to deliver fast, flawless repairs that get you back on the road quickly.'}
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section cta-section">
                <div className="section-inner" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Ready to Restore Your Vehicle?</h2>
                    <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                        Contact us today for a free estimate.
                    </p>
                    <Link href="/contact" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
                </div>
            </section>
        </>
    );
}
