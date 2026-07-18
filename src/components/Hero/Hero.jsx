import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa6';
import './Hero.css';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-copy">
                <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
                    Together with their families
                </motion.p>
                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>
                    Saifudin <span>&</span> Rea Mae
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }} className="date">
                    Saturday, the twenty-second of August &middot; 2026 &middot; 10:00 AM
                </motion.p>
                <div className="hero-actions">
                    <a className="button" href="#rsvp">Kindly RSVP</a>
                    <a className="button ghost" href="#wedding">View details</a>
                </div>
                <motion.a
                    className="gift-notice"
                    href="#gifts"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: .65 }}
                >
                    <FaGift aria-hidden="true" />
                    <span>
                        <small>A little gift note</small>
                        Your presence means the world to us. For those who wish, view our gift registry.
                    </span>
                </motion.a>
            </div>
            <img className="hero-photo" src="/images/HeroBanner.png" alt="Saifudin and Rea Mae in a rose garden" />
        </section>
    );
}
