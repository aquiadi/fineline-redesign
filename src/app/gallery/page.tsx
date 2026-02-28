'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
}

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function load() {
            const { data } = await supabase.from('gallery_images').select('id, src, alt').eq('is_visible', true).order('sort_order');
            setImages(data || []);
            setLoaded(true);
        }
        load();
    }, []);

    return (
        <>
            {/* Hero */}
            <section className="page-hero" style={{
                backgroundImage: 'url(https://d2ugbn5gb88fyp.cloudfront.net/1523022/0_0.webp)',
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
                    OUR GALLERY
                </motion.h1>
                <motion.p
                    className="page-hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    See the quality of our work firsthand
                </motion.p>
            </section>

            {/* Gallery Grid */}
            {loaded && (
                <section className="section">
                    <div className="section-inner">
                        <div className="gallery-grid">
                            {images.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    className="gallery-item"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <img src={img.src} alt={img.alt} loading="lazy" />
                                    <div className="gallery-overlay">
                                        <span>{img.alt}</span>
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
