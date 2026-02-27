'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Heart, Zap, ArrowRight } from 'lucide-react';

export default function AboutPage() {
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
                            <h3>About Fine Line Auto Body</h3>
                            <p>
                                Fine Line Auto Body, located in San Bruno, CA, is your premier destination for all your
                                auto body needs. With a commitment to excellence and customer satisfaction, we provide a
                                comprehensive range of auto body services to keep your vehicle looking its best.
                            </p>
                            <p>
                                Our team specializes in collision repair, auto dent removal service, and auto body repair.
                                Whether your vehicle has been involved in a major accident or has suffered minor dings and
                                dents, we have the expertise to restore it to its former glory. We utilize advanced
                                techniques to ensure precise and efficient repairs every time.
                            </p>
                            <p>
                                In addition to collision repair and dent removal, we offer various other auto body services
                                to meet your needs. From auto body painting to car repainting and car accident repair, we
                                have everything you need to enhance the appearance of your vehicle.
                            </p>
                            <p>
                                We understand the importance of clear communication. That&apos;s why we proudly offer services
                                in Spanish, ensuring that language is never a barrier to getting the auto repairs you need.
                                We also provide free estimates so you can have all the necessary information before deciding
                                about your vehicle&apos;s repair.
                            </p>
                            <p>
                                Furthermore, we offer insurance company assistance to help streamline the claims process and
                                alleviate some of the stress associated with auto repairs. Our team will work directly with
                                your insurance provider to ensure your claim is handled efficiently and effectively.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="about-image-wrapper" style={{ marginBottom: '2rem' }}>
                                <img
                                    src="https://d2ugbn5gb88fyp.cloudfront.net/1523026/0_0.png"
                                    alt="Professional auto body paint spraying at Fine Line"
                                />
                            </div>
                            <div className="about-image-wrapper">
                                <img
                                    src="https://d2ugbn5gb88fyp.cloudfront.net/1523028/0_0.png"
                                    alt="Completed vehicle repair at Fine Line Auto Body"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
                        <h2 className="section-title">Driven By Excellence</h2>
                    </div>
                    <motion.div
                        className="mission-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <blockquote>
                            Our mission is to deliver fast, flawless repairs that get you back on the road quickly.
                            Our goal is to minimize downtime and maximize satisfaction, ensuring your car leaves our
                            shop looking and driving like new.
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
