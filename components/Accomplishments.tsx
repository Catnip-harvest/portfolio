import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Trophy, ZoomIn } from 'lucide-react';
import { ACCOMPLISHMENTS } from '../constants';

type AccomplishmentsProps = {
  onMediaOpen: (title: string, media: string[], index?: number) => void;
};

const Accomplishments: React.FC<AccomplishmentsProps> = ({ onMediaOpen }) => {
  const reduceMotion = useReducedMotion();
  const iNext = ACCOMPLISHMENTS.find((item) => item.id === 'a2');
  const otherRecognition = ACCOMPLISHMENTS.filter((item) => item.id !== 'a2');

  if (!iNext || !iNext.imageUrl) return null;

  const iNextMedia = [iNext.imageUrl, ...(iNext.gallery || [])];

  return (
    <section id="recognition" className="section section--recognition">
      <div className="section__inner">
        <div className="section-heading section-heading--narrow">
          <h2>Recognition earned by building under pressure.</h2>
          <p>Competitive results across embodied AI, multimodal systems, smart engineering, and applied research.</p>
        </div>

        <div className="recognition-layout">
          <motion.article
            className="recognition-feature"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <button
              type="button"
              className="recognition-feature__media"
              onClick={() => onMediaOpen(iNext.title, iNextMedia)}
              aria-label="Open iNext Leader event media"
            >
              <img src={iNext.imageUrl} alt="Hoang Quoc Viet recognized at the iNext Leader final" loading="lazy" />
              <span title="Open media"><ZoomIn size={18} /></span>
            </button>

            <div className="recognition-feature__content">
              <Trophy size={28} strokeWidth={1.6} />
              <p className="recognition-feature__date">{iNext.date}</p>
              <h3>{iNext.title}</h3>
              <p>{iNext.description}</p>
              <dl className="recognition-metrics">
                <div>
                  <dt>Final place</dt>
                  <dd>Top 12</dd>
                </div>
                <div>
                  <dt>Competition field</dt>
                  <dd>1,500</dd>
                </div>
                <div>
                  <dt>Track honor</dt>
                  <dd>Outstanding leader</dd>
                </div>
              </dl>
            </div>
          </motion.article>

          <div className="recognition-list">
            {otherRecognition.map((item, index) => (
              <motion.article
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.06 }}
              >
                <Award size={21} strokeWidth={1.6} />
                <div>
                  <span>{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="recognition-gallery" aria-label="iNext Leader event gallery">
          {iNextMedia.slice(1).map((image, index) => (
            <button
              type="button"
              key={image}
              onClick={() => onMediaOpen(iNext.title, iNextMedia, index + 1)}
              aria-label={`Open iNext Leader gallery image ${index + 2}`}
            >
              <img src={image} alt={`iNext Leader final, view ${index + 2}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accomplishments;
