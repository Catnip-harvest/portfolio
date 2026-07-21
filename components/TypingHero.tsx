import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, Mail } from 'lucide-react';

const TypingHero: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="hero__inner">
        <motion.div
          className="hero__copy"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero__eyebrow">Robotics engineer in Ho Chi Minh City</p>
          <h1>I build robots people can talk to, teach, and trust.</h1>
          <p className="hero__summary">
            I am Viet. I work across robot learning, voice agents, simulation, and logistics automation, then test the ideas on real hardware.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#work">
              View work <ArrowDownRight size={18} />
            </a>
            <a className="button button--secondary" href="mailto:84.viethoang@gmail.com">
              Contact <Mail size={18} />
            </a>
          </div>
        </motion.div>

        <motion.figure
          className="hero__portrait"
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__portrait-frame">
            <picture>
              <source media="(max-width: 560px)" srcSet="/profile-running-mobile.webp" />
              <img src="/profile-running-1600.webp" alt="Hoang Quoc Viet running the UEH half marathon" />
            </picture>
          </div>
          <figcaption>
            <span>Hoang Quoc Viet</span>
            <span>Builder, researcher, runner</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default TypingHero;
