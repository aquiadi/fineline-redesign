'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Luanna Cassula',
        text: 'I had a great experience with Fine Line after my car was involved in an accident. They provided excellent service and helped me throughout the process. Their staff was friendly and knowledgeable, and they took care of all the necessary repairs efficiently. I was impressed with the quality of their work and their attention to detail. I highly recommend Fine Line for anyone in need of a reliable and professional body shop.',
        avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523040/0_0.webp',
    },
    {
        name: 'Priscilla Junker',
        text: 'Fine Line Auto Body LLC exceeded all my expectations! From the moment I walked in, their professionalism and attention to detail were evident. The staff was incredibly knowledgeable and provided excellent customer service throughout the entire process. My vehicle was repaired quickly and flawlessly, looking even better than before the damage occurred. I highly recommend Fine Line Auto Body LLC to anyone in need of automotive repairs. They truly deserve every bit of praise they receive!',
        avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523043/0_0.webp',
    },
    {
        name: 'Amanda Elyades',
        text: 'Fine Line is so far the best customer service and body work experience I have had in the Bay Area. Diligently, they took care of my repair and all aspects of my claim worry free and my car was perfect again! Thank you so much for all your assistance and keeping up with the good work, we need more business like this in our region.',
        avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523046/0_0.webp',
    },
    {
        name: 'Karollyne Borges de Souza',
        text: 'I had an accident a couple months back and was super stressed, took my car to Fineline and they did an amazing job. They took care of everything, have great prices and amazing customer service!! Thank you 🙏🏽 I highly recommend!',
        avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523049/0_0.webp',
    },
    {
        name: 'Luana Gr Pantoja',
        text: 'The best place to fix car dents and paintwork. My car arrived dented like an old car, and left new like a new car. My car is perfect now!!! I always recommend the Fine Line team! ✨',
        avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523052/0_0.webp',
    },
    {
        name: 'Sussu Seguro',
        text: 'The best service ever, everybody care about me and my car, they know I need my car fixed faster. They also brought my car to my work. Definitely recommend.',
        avatar: null,
    },
    {
        name: 'Bernardo Vieira',
        text: 'I looked for someone to fix the Tesla headlight without success, until I found this body shop, great treatment and fast service in Tesla and the best price.',
        avatar: null,
    },
];

export default function TestimonialsPage() {
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
            <section className="section">
                <div className="section-inner">
                    <div className="testimonials-grid">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
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
                                    {t.avatar ? (
                                        <img src={t.avatar} alt={t.name} className="testimonial-avatar-img" />
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
        </>
    );
}
