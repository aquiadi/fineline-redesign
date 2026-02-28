'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Trophy, Car, ShieldAlert, Hammer, Paintbrush, History, Star, ArrowRight, Phone, Wrench, Zap, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false });

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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

interface TestimonialData {
  id: string;
  name: string;
  text: string;
  avatar_url: string;
}

interface ContentMap {
  [key: string]: string;
}

export default function HomePage() {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [hero, setHero] = useState<ContentMap>({});
  const [about, setAbout] = useState<ContentMap>({});
  const [mission, setMission] = useState<ContentMap>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const [sRes, tRes, cRes] = await Promise.all([
        supabase.from('services').select('id, title, description, icon_name').order('sort_order').limit(5),
        supabase.from('testimonials').select('id, name, text, avatar_url').eq('is_visible', true).order('sort_order').limit(6),
        supabase.from('site_content').select('section, key, value'),
      ]);

      setServices(sRes.data || []);
      setTestimonials(tRes.data || []);

      const contentBySection: Record<string, ContentMap> = {};
      (cRes.data || []).forEach((c: { section: string; key: string; value: string }) => {
        if (!contentBySection[c.section]) contentBySection[c.section] = {};
        contentBySection[c.section][c.key] = c.value;
      });
      setHero(contentBySection['hero'] || {});
      setAbout(contentBySection['about'] || {});
      setMission(contentBySection['mission'] || {});
      setLoaded(true);
    }
    load();
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-canvas">
          <ParticleField />
        </div>
        <div className="hero-overlay" />
        <div className="hero-bg-image" style={{
          backgroundImage: `url(${hero.bg_image || 'https://d2ugbn5gb88fyp.cloudfront.net/1523021/0_0.webp'})`,
          position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15, zIndex: 0,
        }} />
        <div className="hero-speed-lines">
          <div className="speed-line" />
          <div className="speed-line" />
          <div className="speed-line" />
          <div className="speed-line" />
          <div className="speed-line" />
        </div>
        <div className="hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.span className="hero-tag" variants={fadeInUp} custom={0}>
              {hero.tag || 'Fast Turnaround Time'}
            </motion.span>
            <motion.h1 className="hero-title" variants={fadeInUp} custom={1}>
              {hero.title || 'Efficiency Meets Quality: Quick Repairs, Lasting Results'}
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp} custom={2}>
              {hero.subtitle || 'Minimizing downtime with swift and efficient repair processes. Delivering flawless results through skilled craftsmanship and attention to detail.'}
            </motion.p>
            <motion.div className="hero-buttons" variants={fadeInUp} custom={3}>
              <Link href="/contact" className="btn-primary">
                Get Free Estimate <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-outline">
                Our Services
              </Link>
            </motion.div>
            <motion.div className="hero-stats" variants={fadeInUp} custom={4}>
              <div>
                <div className="hero-stat-number">{hero.stat_1_number || '500+'}</div>
                <div className="hero-stat-label">{hero.stat_1_label || 'Vehicles Repaired'}</div>
              </div>
              <div>
                <div className="hero-stat-number">{hero.stat_2_number || '100%'}</div>
                <div className="hero-stat-label">{hero.stat_2_label || 'Satisfaction Guarantee'}</div>
              </div>
              <div>
                <div className="hero-stat-number">{hero.stat_3_number || '5★'}</div>
                <div className="hero-stat-label">{hero.stat_3_label || 'Customer Rating'}</div>
              </div>
              <div>
                <div className="hero-stat-number">{hero.stat_4_number || 'Free'}</div>
                <div className="hero-stat-label">{hero.stat_4_label || 'Estimates Available'}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="features-strip">
        <div className="features-grid">
          {[
            { icon: <ShieldCheck size={28} />, title: 'Clarity From Start to Finish', text: 'Providing upfront and transparent pricing for peace of mind. No hidden costs.' },
            { icon: <Users size={28} />, title: 'Your Friendly Neighborhood Auto Experts', text: 'Offering expert advice and assistance with a smile. Services in Spanish available.' },
            { icon: <Trophy size={28} />, title: 'Exceeding Expectations', text: 'Consistently delivering exceptional service and earning glowing reviews.' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="feature-card-icon">{feature.icon}</div>
              <div className="feature-card-title">{feature.title}</div>
              <div className="feature-card-text">{feature.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="about-preview">
            <motion.div
              className="about-text-section"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">About Us</span>
              <h3>{about.title || 'About Fine Line Auto Body'}</h3>
              <p>{about.paragraph_1 || 'Fine Line Auto Body, located in San Bruno, CA, is your premier destination for all your auto body needs.'}</p>
              <p>{about.paragraph_2 || 'Our team specializes in collision repair, auto dent removal, and auto body repair.'}</p>
              <Link href="/about" className="btn-outline" style={{ marginTop: '0.5rem' }}>
                Learn More <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.div
              className="about-image-wrapper"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={about.image_1 || 'https://d2ugbn5gb88fyp.cloudfront.net/1523026/0_0.png'}
                alt="Professional auto body paint work at Fine Line Auto Body Shop"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Expert auto body solutions delivered with precision and care
            </p>
            <div className="section-line" />
          </div>
          <div className="services-grid">
            {(loaded ? services : []).map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={`/services#${service.id}`} className="service-card">
                  <div className="service-card-icon">{iconMap[service.icon_name] || <Car size={28} />}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description.substring(0, 120)}...</p>
                  <span className="service-card-link">Learn More <ArrowRight size={14} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="section mission-section" style={{
        backgroundImage: `url(${mission.bg_image || 'https://d2ugbn5gb88fyp.cloudfront.net/1523022/0_0.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="mission-overlay" />
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="section-inner">
          <div className="section-header">
            <span className="section-tag">Reviews</span>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">
              Real reviews from satisfied customers
            </p>
            <div className="section-line" />
          </div>
          <div className="testimonials-grid">
            {(loaded ? testimonials : []).map((t, i) => (
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

      {/* ===== CTA ===== */}
      <section className="section cta-section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <span className="section-tag">Get Started</span>
          <h2 className="section-title">Ready to Restore Your Vehicle?</h2>
          <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
            Contact us today for a free estimate. We work with all major insurance companies.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">
              Get Free Estimate <ArrowRight size={16} />
            </Link>
            <a href="tel:+14155890231" className="btn-outline">
              <Phone size={16} /> Call (415) 589-0231
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
