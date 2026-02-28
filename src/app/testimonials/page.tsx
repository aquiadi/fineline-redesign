'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface TestimonialData {
    id: string;
    name: string;
    text: string;
    avatar_url: string;
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from('testimonials').select('*').eq('is_visible', true).order('sort_order');
            setTestimonials(data || []);
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
                    TESTIMONIALS
                </motion.h1>
                <motion.p
                    className="page-hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Real reviews from real customers
                </motion.p>
            </section>

            {/* Testimonials Grid */}
            {loaded && (
                <section className="section">
                    <div className="section-inner">
                        <div className="testimonials-grid">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={t.id}
                                    className="testimonial-card"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="testimonial-stars">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <span key={s}><Star size={16} fill="#FFD700" color="#FFD700" /></span>
                                        ))}
                                    </div>
                                    <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                                    <div className="testimonial-author">
                                        {t.avatar_url ? (
                                            <img src={t.avatar_url} alt={t.name} className="testimonial-avatar-img" />
                                        ) : (
                                            <div className="testimonial-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                                        )}
                                        <span className="testimonial-name">{t.name}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
