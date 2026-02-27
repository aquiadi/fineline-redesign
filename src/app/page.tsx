'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Trophy, Car, ShieldAlert, Hammer, Paintbrush, History, Star, ArrowRight, Phone } from 'lucide-react';

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false });

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const testimonials = [
  {
    name: 'Phuong Ngo',
    text: 'I had deep scratches on my car, and every other body shop told me I\'d need to repaint the whole panel for a really high price. Fine Line Auto Body gave me the most affordable estimate for repaint the whole panel, and they still delivered high quality work. My car looks brand new!',
    avatar: null,
  },
  {
    name: 'Albert Tam',
    text: 'Fine Line helped us with repainting our 14 year old Mazda. The end result was amazing! The color is a perfect match with the original shade and the finish has a high quality shine. Very professional team.',
    avatar: null,
  },
  {
    name: 'OJ Domingues',
    text: 'Fineline Auto Body in San Bruno is an absolute gem! From start to finish, their service was impeccable. The staff was friendly, knowledgeable, and went above and beyond to ensure my satisfaction. Their attention to detail is unmatched, and I couldn\'t be happier with the results.',
    avatar: null,
  },
  {
    name: 'Luanna Cassula',
    text: 'I had a great experience with Fine Line after my car was involved in an accident. They provided excellent service and helped me throughout the process. Their staff was friendly and knowledgeable, and they took care of all the necessary repairs efficiently.',
    avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523040/0_0.webp',
  },
  {
    name: 'Priscilla Junker',
    text: 'Fine Line Auto Body LLC exceeded all my expectations! From the moment I walked in, their professionalism and attention to detail were evident. My vehicle was repaired quickly and flawlessly, looking even better than before the damage occurred.',
    avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523043/0_0.webp',
  },
  {
    name: 'Amanda Elyades',
    text: 'Fine Line is so far the best customer service and body work experience I have had in the Bay Area. Diligently, they took care of my repair and all aspects of my claim worry free and my car was perfect again!',
    avatar: 'https://d2ugbn5gb88fyp.cloudfront.net/1523046/0_0.webp',
  },
];

const services = [
  {
    title: 'Auto Body Services',
    desc: 'Comprehensive auto body services tailored to your needs. From minor dents to significant collision damage.',
    icon: <Car size={28} />,
    id: 'auto-body',
  },
  {
    title: 'Collision Repair',
    desc: 'Expert collision repair with free estimates. Handling minor dents to significant structural damage.',
    icon: <ShieldAlert size={28} />,
    id: 'collision',
  },
  {
    title: 'Auto Dent Removal',
    desc: 'Advanced techniques and state-of-the-art equipment to tackle dents of all sizes.',
    icon: <Hammer size={28} />,
    id: 'dent',
  },
  {
    title: 'Auto Body Painting',
    desc: 'Custom color matching to flawless finishes using high-quality paint and state-of-the-art techniques.',
    icon: <Paintbrush size={28} />,
    id: 'painting',
  },
  {
    title: 'Auto Restoration',
    desc: 'Meticulous restoration of classic and modern vehicles to their original condition.',
    icon: <History size={28} />,
    id: 'restoration',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-canvas">
          <ParticleField />
        </div>
        <div className="hero-overlay" />
        <div className="hero-bg-image" style={{
          backgroundImage: 'url(https://d2ugbn5gb88fyp.cloudfront.net/1523021/0_0.webp)',
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
              Fast Turnaround Time
            </motion.span>
            <motion.h1 className="hero-title" variants={fadeInUp} custom={1}>
              Efficiency Meets Quality: Quick Repairs, Lasting Results
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp} custom={2}>
              Minimizing downtime with swift and efficient repair processes.
              Delivering flawless results through skilled craftsmanship and attention to detail.
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
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Vehicles Repaired</div>
              </div>
              <div>
                <div className="hero-stat-number">100%</div>
                <div className="hero-stat-label">Satisfaction Guarantee</div>
              </div>
              <div>
                <div className="hero-stat-number">5★</div>
                <div className="hero-stat-label">Customer Rating</div>
              </div>
              <div>
                <div className="hero-stat-number">Free</div>
                <div className="hero-stat-label">Estimates Available</div>
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
              <h3>About Fine Line Auto Body</h3>
              <p>
                Fine Line Auto Body, located in San Bruno, CA, is your premier destination for all
                your auto body needs. With a commitment to excellence and customer satisfaction, we
                provide a comprehensive range of auto body services to keep your vehicle looking its best.
              </p>
              <p>
                Our team specializes in collision repair, auto dent removal, and auto body repair.
                Whether your vehicle has been involved in a major accident or has suffered minor
                dings and dents, we have the expertise to restore it to its former glory.
              </p>
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
                src="https://d2ugbn5gb88fyp.cloudfront.net/1523026/0_0.png"
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
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link href={`/services#${service.id}`} className="service-card">
                  <div className="service-card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <span className="service-card-link">Learn More <ArrowRight size={14} /></span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="section mission-section" style={{
        backgroundImage: 'url(https://d2ugbn5gb88fyp.cloudfront.net/1523022/0_0.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="mission-overlay" />
        <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
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
              Our mission is to deliver fast, flawless repairs that get you back on the road
              quickly. Our goal is to minimize downtime and maximize satisfaction, ensuring your
              car leaves our shop looking and driving like new.
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
