'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Car, ShieldAlert, Hammer, Paintbrush, History, ArrowRight, Phone, Check, Wrench, Zap, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const iconMap: Record<string, React.ReactNode> = {
    Car: <Car size={28} />,
    ShieldAlert: <ShieldAlert size={28} />,
    Hammer: <Hammer size={28} />,
    Paintbrush: <Paintbrush size={28} />,
    History: <History size={28} />,
    Wrench: <Wrench size={28} />,
    Zap: <Zap size={28} />,
    Shield: <Shield size={28} />,
};

interface ServiceData {
    id: string;
    title: string;
    description: string;
    icon_name: string;
    hero_image: string;
    content_image: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from('services').select('*').order('sort_order');
            setServices(data || []);
            setLoaded(true);
        }
        load();
    }, []);

    return (
        <>
            {/* Hero */}
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
                    OUR SERVICES
                </motion.h1>
                <motion.p
                    className="page-hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Expert auto body solutions delivered with precision and care
                </motion.p>
            </section>

            {/* Services Overview Grid */}
            {loaded && (
                <section className="section">
                    <div className="section-inner">
                        <div className="services-grid">
                            {services.map((service, i) => (
                                <motion.a
                                    key={service.id}
                                    href={`#${service.id}`}
                                    className="service-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="service-card-icon">{iconMap[service.icon_name] || <Car size={28} />}</div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description.substring(0, 120)}...</p>
                                    <span className="service-card-link">Read Full Details <ArrowRight size={14} /></span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Individual Service Details */}
            {loaded && services.map((service, i) => (
                <section
                    key={service.id}
                    id={service.id}
                    className="section"
                    style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}
                >
                    <div className="section-inner">
                        <motion.div
                            className="about-content-section"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="about-text">
                                <span className="section-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {iconMap[service.icon_name] || <Car size={28} />} Service Detail
                                </span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <Link href="/contact" className="btn-primary">Get Free Estimate <ArrowRight size={16} /></Link>
                                    <a href="tel:+14155890231" className="btn-outline"><Phone size={16} /> Call Now</a>
                                </div>
                            </div>
                            <div>
                                {service.hero_image && (
                                    <div className="about-image-wrapper" style={{ marginBottom: '1.5rem' }}>
                                        <img src={service.hero_image} alt={`${service.title} hero`} />
                                    </div>
                                )}
                                <div style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '12px',
                                    padding: '2rem',
                                }}>
                                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.5rem', color: 'var(--racing-red)' }}>
                                        WHY CHOOSE US
                                    </h4>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {['Free Estimates', 'Insurance Assistance', 'Spanish Speaking Services', 'Expert Technicians', 'State-of-the-Art Equipment'].map((item) => (
                                            <li key={item} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}>
                                                <Check size={16} style={{ color: 'var(--racing-red)', flexShrink: 0 }} /> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* CTA */}
            <section className="section cta-section">
                <div className="section-inner" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Get a FREE Estimate Today</h2>
                    <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                        Call us or fill out our contact form for a free, no-obligation estimate.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact" className="btn-primary">Contact Us <ArrowRight size={16} /></Link>
                        <a href="tel:+14155890231" className="btn-outline"><Phone size={16} /> +1 (415) 589-0231</a>
                    </div>
                </div>
            </section>
        </>
    );
}
