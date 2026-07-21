import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type AutoplayVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

const AutoplayVideo: React.FC<AutoplayVideoProps> = ({ src, poster, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    if (reduceMotion) {
      video.pause();
      video.currentTime = 0;
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.3, 0.75] },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion, src]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden="true"
    />
  );
};

export default AutoplayVideo;
