import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getMediaPreview, isVideoMedia } from '../lib/media';

export type MediaLightboxState = {
  title: string;
  media: string[];
  index: number;
};

type MediaLightboxProps = {
  state: MediaLightboxState | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const MediaLightbox: React.FC<MediaLightboxProps> = ({ state, onClose, onIndexChange }) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!state) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && state.media.length > 1) {
        onIndexChange((state.index - 1 + state.media.length) % state.media.length);
      }
      if (event.key === 'ArrowRight' && state.media.length > 1) {
        onIndexChange((state.index + 1) % state.media.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onIndexChange, state]);

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          className="lightbox"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${state.title} media viewer`}
        >
          <div className="lightbox__bar">
            <div>
              <p className="lightbox__count">
                {state.index + 1} / {state.media.length}
              </p>
              <h2>{state.title}</h2>
            </div>
            <button type="button" className="icon-button icon-button--light" onClick={onClose} aria-label="Close media viewer">
              <X size={22} />
            </button>
          </div>

          <motion.div
            className="lightbox__stage"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            onClick={(event) => event.stopPropagation()}
          >
            {isVideoMedia(state.media[state.index]) ? (
              <video src={state.media[state.index]} controls autoPlay muted playsInline />
            ) : (
              <img src={state.media[state.index]} alt={`${state.title}, media ${state.index + 1}`} />
            )}

            {state.media.length > 1 && (
              <>
                <button
                  type="button"
                  className="lightbox__arrow lightbox__arrow--previous"
                  onClick={() => onIndexChange((state.index - 1 + state.media.length) % state.media.length)}
                  aria-label="Previous media"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  className="lightbox__arrow lightbox__arrow--next"
                  onClick={() => onIndexChange((state.index + 1) % state.media.length)}
                  aria-label="Next media"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </motion.div>

          {state.media.length > 1 && (
            <div className="lightbox__thumbs" onClick={(event) => event.stopPropagation()}>
              {state.media.map((media, index) => (
                <button
                  type="button"
                  key={`${media}-${index}`}
                  className={index === state.index ? 'is-active' : ''}
                  onClick={() => onIndexChange(index)}
                  aria-label={`Show media ${index + 1}`}
                  aria-pressed={index === state.index}
                >
                  {isVideoMedia(media) ? <video src={media} muted /> : <img src={getMediaPreview(media)} alt="" />}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MediaLightbox;
