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
          <p className="hero__eyebrow">Robotics software engineer and AI systems builder</p>
          <h1>I build robots that learn and act.</h1>
          <p className="hero__summary">
            Hoang Quoc Viet builds embodied AI, robot-learning systems and automation for real operations.
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
            <img src="/profile-picture-optimized.webp" alt="Hoang Quoc Viet" />
          </div>
          <figcaption>
            <span>Hoang Quoc Viet</span>
            <span>Available for full-time robotics roles</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default TypingHero;
