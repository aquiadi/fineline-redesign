'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Car, ShieldAlert, Hammer, Paintbrush, History, ArrowRight, Phone, Check } from 'lucide-react';

const services = [
    {
        id: 'auto-body',
        title: 'Auto Body Services',
        icon: <Car size={28} />,
        heroImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523042/0_0.png',
        contentImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523041/0_0.png',
        description: `Fine Line Auto Body prides itself on delivering top-notch auto body services tailored to your needs. Our extensive experience and dedication to excellence make us your go-to destination for all your auto repair and auto restoration needs. Our team of skilled technicians specializes in auto body repair, ensuring your vehicle is restored to its pre-accident condition with precision and care. Whether it's minor dents or significant collision damage, we have the expertise to handle any job with finesse. Our auto body painting services will breathe new life into your car, truck, or SUV. From custom color matching to flawless finishes, we use high-quality paint and state-of-the-art techniques to achieve stunning results.`,
    },
    {
        id: 'collision',
        title: 'Collision Repair',
        icon: <ShieldAlert size={28} />,
        heroImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523045/0_0.png',
        contentImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523044/0_0.png',
        description: `Fine Line Auto Body is your trusted expert in collision repair, dedicated to auto body repair, car repainting, and auto restoration. With years of experience and a commitment to excellence, you can count on us to handle your collision repair needs professionally. When you bring your vehicle to Fine Line Auto Body for collision repair, you can expect top-quality service from start to finish. We begin by offering free estimates, ensuring you have all the information you need before we start any work on your vehicle. Our team will assess the damage and provide you with a detailed estimate of the repairs needed.`,
    },
    {
        id: 'dent',
        title: 'Auto Dent Removal Service',
        icon: <Hammer size={28} />,
        heroImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523048/0_0.png',
        contentImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523047/0_0.png',
        description: `Fine Line Auto Body specializes in providing expert auto dent removal services to restore your vehicle's appearance with precision and care. With our extensive experience in auto body repair and auto restoration, you can trust us to eliminate dents and dings, leaving your vehicle looking as good as new. Our skilled technicians utilize advanced techniques and state-of-the-art equipment to tackle dents of all sizes, from minor door dings to more significant cuts caused by accidents. We understand the importance of maintaining your vehicle's aesthetics, so we ensure a seamless repair process.`,
    },
    {
        id: 'painting',
        title: 'Auto Body Painting',
        icon: <Paintbrush size={28} />,
        heroImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523054/0_0.jpg',
        contentImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523050/0_0.jpg',
        description: `Revitalize your vehicle with the exceptional auto body painting services from Fine Line Auto Body in San Bruno, CA. Our skilled technicians utilize advanced techniques and high-quality materials to deliver a flawless finish that makes your car look brand new. Whether you're dealing with minor scratches or extensive damage or want a new color, our team ensures precision and attention to detail in every job. Professional auto body painting not only enhances the appearance of your vehicle but also protects it from rust and environmental damage, extending its lifespan.`,
    },
    {
        id: 'restoration',
        title: 'Auto Restoration',
        icon: <History size={28} />,
        heroImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523051/0_0.jpg',
        contentImage: 'https://d2ugbn5gb88fyp.cloudfront.net/1523053/0_0.jpg',
        description: `Restore your vehicle to its former glory with expert auto restoration services from Fine Line Auto Body in San Bruno, CA. Our team of skilled technicians uses advanced techniques and high-quality materials to restore your car to its original condition meticulously. Whether you own a classic car requiring detailed restoration or a modern vehicle needing a makeover, our professionals ensure precision and attention to every detail. Professional auto restoration enhances your vehicle's aesthetic appeal and its value and longevity.`,
    },
];

export default function ServicesPage() {
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
                                <div className="service-card-icon">{service.icon}</div>
                                <h3>{service.title}</h3>
                                <p>{service.description.substring(0, 120)}...</p>
                                <span className="service-card-link">Read Full Details <ArrowRight size={14} /></span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Individual Service Details */}
            {services.map((service, i) => (
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
                                    {service.icon} Service Detail
                                </span>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <Link href="/contact" className="btn-primary">Get Free Estimate <ArrowRight size={16} /></Link>
                                    <a href="tel:+14155890231" className="btn-outline"><Phone size={16} /> Call Now</a>
                                </div>
                            </div>
                            <div>
                                <div className="about-image-wrapper" style={{ marginBottom: '1.5rem' }}>
                                    <img src={service.heroImage} alt={`${service.title} hero`} />
                                </div>
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
