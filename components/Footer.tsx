import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer__inner">
        <div className="footer__cta">
          <p>Available for full-time roles across product, data, AI, and software.</p>
          <h2>Let&apos;s build a system that moves.</h2>
          <a className="button button--primary" href="mailto:84.viethoang@gmail.com">
            Contact <Mail size={18} />
          </a>
        </div>

        <div className="footer__bottom">
          <div>
            <strong>Hoang Quoc Viet</strong>
            <span>Builder across AI, data, and products</span>
          </div>
          <nav aria-label="Social links">
            <a href="https://github.com/Catnip-harvest" target="_blank" rel="noopener noreferrer">
              <Github size={18} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/vizhoang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          </nav>
          <span className="footer__copyright">{new Date().getFullYear()} Hoang Quoc Viet</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
