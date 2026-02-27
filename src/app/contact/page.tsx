'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, Globe, Instagram, Star, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
            }
        } catch {
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="page-hero">
                <motion.h1
                    className="page-hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    CONTACT US
                </motion.h1>
                <motion.p
                    className="page-hero-subtitle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Get in touch for a free estimate
                </motion.p>
            </section>

            {/* Contact Grid */}
            <section className="section">
                <div className="section-inner">
                    <div className="contact-grid">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="contact-form">
                                <h3>Send Us a Message</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                                    Fill out the form below and our team will be in contact with you as soon as possible!
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Describe your vehicle's needs..."
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                                        {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                                    </button>
                                    {submitted && (
                                        <div className="form-success">
                                            ✅ Thank you! Your message has been sent. We&apos;ll be in touch shortly.
                                        </div>
                                    )}
                                </form>
                            </div>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="contact-info-card">
                                <h3>PIT STOP INFO</h3>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon"><MapPin size={20} /></div>
                                    <div>
                                        <div className="contact-info-label">HQ Location</div>
                                        <div className="contact-info-value">
                                            <a href="https://maps.app.goo.gl/Ktmh7d3ZRedsWAJR6" target="_blank" rel="noopener noreferrer">
                                                1144 Montgomery Ave<br />San Bruno, CA 94066
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon"><Phone size={20} /></div>
                                    <div>
                                        <div className="contact-info-label">Direct Line</div>
                                        <div className="contact-info-value">
                                            <a href="tel:+14155890231">+1 (415) 589-0231</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon"><Mail size={20} /></div>
                                    <div>
                                        <div className="contact-info-label">Communications</div>
                                        <div className="contact-info-value">
                                            <a href="mailto:finelineautobodysb@gmail.com">finelineautobodysb@gmail.com</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon"><Clock size={20} /></div>
                                    <div>
                                        <div className="contact-info-label">Operational Window</div>
                                        <div className="contact-info-value">
                                            Monday - Friday: 8:30 AM - 6:00 PM<br />
                                            Saturday &amp; Sunday: Closed
                                        </div>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                                    <div className="contact-info-label" style={{ marginBottom: '1rem' }}>Follow Us</div>
                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                        <a href="https://maps.app.goo.gl/Ktmh7d3ZRedsWAJR6" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                                            <MapPin size={14} /> Google
                                        </a>
                                        <a href="https://www.instagram.com/finelinebodyshop" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                                            <Instagram size={14} /> Instagram
                                        </a>
                                        <a href="https://www.pinterest.com/FineLineAutoBody/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                                            <Globe size={14} /> Pinterest
                                        </a>
                                        <a href="https://www.yelp.com/biz/fineline-auto-body-shop-san-bruno-2" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                                            <Star size={14} /> Yelp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Map */}
                    <motion.div
                        className="map-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.0!2d-122.41!3d37.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f79d6c1e30bb7%3A0x4c8e9c1b1b5c1b1b!2s1144+Montgomery+Ave%2C+San+Bruno%2C+CA+94066!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Fine Line Auto Body Location"
                        />
                    </motion.div>
                </div>
            </section>
        </>
    );
}
