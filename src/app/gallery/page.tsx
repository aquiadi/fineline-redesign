'use client';

import { motion } from 'framer-motion';

const galleryImages = [
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523026/0_0.png', alt: 'Auto body repair work' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523027/0_0.png', alt: 'Vehicle restoration project' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523028/0_0.png', alt: 'Collision repair before and after' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523029/0_0.png', alt: 'Professional paint job result' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523030/0_0.png', alt: 'Dent removal process' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523031/0_0.png', alt: 'Auto body shop workspace' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523032/0_0.png', alt: 'Vehicle repair in progress' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523033/0_0.png', alt: 'Completed auto restoration' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523034/0_0.png', alt: 'Paint booth work' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523035/0_0.jpg', alt: 'Detailed paint matching' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523036/0_0.jpg', alt: 'Body panel repair' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523037/0_0.jpg', alt: 'Frame straightening work' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523038/0_0.jpg', alt: 'Finished vehicle side view' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523039/0_0.jpg', alt: 'Premium finish result' },
    { src: 'https://d2ugbn5gb88fyp.cloudfront.net/1523019/0_0.png', alt: 'Fine Line Auto Body shop exterior' },
];

export default function GalleryPage() {
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
            <section className="section">
                <div className="section-inner">
                    <div className="gallery-grid">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
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
        </>
    );
}
