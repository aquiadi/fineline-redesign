'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/services', label: 'Services' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/testimonials', label: 'Testimonials' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <>
            {/* Top Bar */}
            <div className="top-bar">
                <div className="top-bar-inner">
                    <div className="top-bar-contact">
                        <span><MapPin size={14} /> 1144 Montgomery Ave, San Bruno, CA 94066</span>
                        <span><Phone size={14} /> <a href="tel:+14155890231">+1 (415) 589-0231</a></span>
                        <span><Mail size={14} /> <a href="mailto:finelineautobodysb@gmail.com">finelineautobodysb@gmail.com</a></span>
                    </div>
                    <div className="top-bar-contact">
                        <span><Clock size={14} /> Mon-Fri: 8:30 AM - 6:00 PM</span>
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-inner">
                    <Link href="/" className="navbar-logo">
                        <img
                            src="https://d2ugbn5gb88fyp.cloudfront.net/1523025/0_0.png"
                            alt="Fine Line Auto Body Logo"
                            style={{ height: '40px', marginRight: '0.5rem' }}
                        />
                        <div>
                            <span className="navbar-logo-text">FINE LINE</span>
                            <span className="navbar-logo-sub">AUTO BODY SHOP</span>
                        </div>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <ThemeToggle />
                        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={pathname === link.href ? 'active' : ''}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/contact" className="btn-primary" onClick={() => setIsOpen(false)}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
