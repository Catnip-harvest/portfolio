import React from 'react';
import { ExternalLink } from 'lucide-react';
import { CERTIFICATIONS } from '../constants';

const FEATURED_IDS = new Set(['c1', 'c2', 'c6', 'c9']);

const Certifications: React.FC = () => {
  const featured = CERTIFICATIONS.filter((certification) => FEATURED_IDS.has(certification.id));

  return (
    <section id="certifications" className="section section--credentials">
      <div className="section__inner credentials-layout">
        <div className="section-heading section-heading--narrow">
          <h2>Selected credentials.</h2>
          <p>Language, analytics, robotics, and software foundations that support the engineering work.</p>
          <a
            className="text-link"
            href="https://www.linkedin.com/in/vizhoang/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
          >
            All credentials <ExternalLink size={16} />
          </a>
        </div>

        <div className="credential-list">
          {featured.map((certification) => (
            <a
              key={certification.id}
              href={certification.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="credential-row"
            >
              <span className="credential-row__logo">
                <img src={certification.badgeUrl} alt={`${certification.issuer} logo`} loading="lazy" />
              </span>
              <span className="credential-row__copy">
                <strong>{certification.title}</strong>
                <span>{certification.issuer}, {certification.date}</span>
              </span>
              <ExternalLink size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
