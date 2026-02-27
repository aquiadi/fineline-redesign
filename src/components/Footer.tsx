import Link from 'next/link';
import { MapPin, Instagram, Star, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h3>FINE LINE</h3>
                        <span className="footer-brand-sub">AUTO BODY SHOP</span>
                        <p>
                            Your premier destination for all your auto body needs in San Bruno, CA.
                            Delivering fast, flawless repairs with precision and care since day one.
                        </p>
                        <div className="footer-social">
                            <a href="https://maps.app.goo.gl/Ktmh7d3ZRedsWAJR6" target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
                                <MapPin size={18} />
                            </a>
                            <a href="https://www.instagram.com/finelinebodyshop" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.pinterest.com/FineLineAutoBody/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <Globe size={18} />
                            </a>
                            <a href="https://www.yelp.com/biz/fineline-auto-body-shop-san-bruno-2" target="_blank" rel="noopener noreferrer" aria-label="Yelp">
                                <Star size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Our Services</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                            <li><Link href="/testimonials">Testimonials</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-column">
                        <h4>Services</h4>
                        <ul>
                            <li><Link href="/services#auto-body">Auto Body Services</Link></li>
                            <li><Link href="/services#collision">Collision Repair</Link></li>
                            <li><Link href="/services#dent">Dent Removal</Link></li>
                            <li><Link href="/services#painting">Auto Body Painting</Link></li>
                            <li><Link href="/services#restoration">Auto Restoration</Link></li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div className="footer-column">
                        <h4>Hours</h4>
                        <ul className="footer-hours">
                            <li><span>Monday</span><span>8:30 AM - 6:00 PM</span></li>
                            <li><span>Tuesday</span><span>8:30 AM - 6:00 PM</span></li>
                            <li><span>Wednesday</span><span>8:30 AM - 6:00 PM</span></li>
                            <li><span>Thursday</span><span>8:30 AM - 6:00 PM</span></li>
                            <li><span>Friday</span><span>8:30 AM - 6:00 PM</span></li>
                            <li><span>Saturday</span><span>Closed</span></li>
                            <li><span>Sunday</span><span>Closed</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>Copyright © {new Date().getFullYear()} Fine Line Auto Body. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
