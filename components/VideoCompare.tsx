import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { ReactCompareSlider, styleFitContainer } from 'react-compare-slider';
import { ComparisonVideo, VideoComparison } from '../types';

// The slider itself is react-compare-slider (see decisions/2026-10-15-video-compare-slider.md).
// Keeping the two videos on one clock is the part no maintained library covers, so it is done here:
// the left video leads, and the right one is re-seeked whenever it drifts more than this far behind or
// ahead. At 30 fps that is about two frames, which is not visible at the divider.
const MAX_DRIFT_SECONDS = 0.07;

type FrameCallbackVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (callback: (now: number, metadata: { mediaTime: number }) => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

/** Makes `follower` play, pause, seek and loop with `leader`. Checks drift on every presented frame
 *  (requestVideoFrameCallback, per MDN), falling back to animation frames where that is missing.
 *  Correction is seek-only: nudging playbackRate is smoother, but iOS handles it badly. */
const useFollowerVideo = (
  leaderRef: RefObject<HTMLVideoElement | null>,
  followerRef: RefObject<HTMLVideoElement | null>,
) => {
  useEffect(() => {
    const leader = leaderRef.current as FrameCallbackVideo | null;
    const follower = followerRef.current;
    if (!leader || !follower) return undefined;

    let stopped = false;
    let frameHandle = 0;
    const usesFrameCallback = typeof leader.requestVideoFrameCallback === 'function';

    const alignFollowerTo = (leaderTime: number) => {
      if (follower.seeking) return;
      if (Math.abs(follower.currentTime - leaderTime) > MAX_DRIFT_SECONDS) {
        follower.currentTime = leaderTime;
      }
    };

    const watchNextFrame = () => {
      if (stopped) return;
      if (usesFrameCallback) {
        frameHandle = leader.requestVideoFrameCallback!((_now, metadata) => {
          alignFollowerTo(metadata.mediaTime);
          watchNextFrame();
        });
      } else {
        frameHandle = requestAnimationFrame(() => {
          alignFollowerTo(leader.currentTime);
          watchNextFrame();
        });
      }
    };

    const playFollower = () => {
      alignFollowerTo(leader.currentTime);
      void follower.play().catch(() => undefined);
    };
    const pauseFollower = () => {
      follower.pause();
      follower.currentTime = leader.currentTime;
    };
    const seekFollower = () => {
      follower.currentTime = leader.currentTime;
    };

    leader.addEventListener('play', playFollower);
    leader.addEventListener('pause', pauseFollower);
    leader.addEventListener('seeked', seekFollower);
    watchNextFrame();

    return () => {
      stopped = true;
      if (usesFrameCallback) leader.cancelVideoFrameCallback?.(frameHandle);
      else cancelAnimationFrame(frameHandle);
      leader.removeEventListener('play', playFollower);
      leader.removeEventListener('pause', pauseFollower);
      leader.removeEventListener('seeked', seekFollower);
    };
  }, [leaderRef, followerRef]);
};

const ComparisonItem = React.forwardRef<HTMLVideoElement, { video: ComparisonVideo; side: 'left' | 'right' }>(
  ({ video, side }, ref) => (
    <div className="video-compare__item">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={video.label}
        style={styleFitContainer()}
      />
      <span className={`video-compare__label video-compare__label--${side}`}>{video.label}</span>
    </div>
  ),
);
ComparisonItem.displayName = 'ComparisonItem';

interface VideoCompareProps {
  comparison: VideoComparison;
}

/** Two aligned videos behind a draggable divider. Plays while on screen, never under reduced motion
 *  unless the viewer presses play, and can be paused to compare a single frame. */
const VideoCompare: React.FC<VideoCompareProps> = ({ comparison }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLVideoElement>(null);
  const rightRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const pausedByViewer = useRef(false);
  const [playing, setPlaying] = useState(false);

  useFollowerVideo(leftRef, rightRef);

  useEffect(() => {
    const container = containerRef.current;
    const leader = leftRef.current;
    if (!container || !leader) return undefined;

    if (reduceMotion) pausedByViewer.current = true;

    const showPlaying = () => setPlaying(true);
    const showPaused = () => setPlaying(false);
    leader.addEventListener('play', showPlaying);
    leader.addEventListener('pause', showPaused);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !pausedByViewer.current) {
          void leader.play().catch(() => undefined);
        } else {
          leader.pause();
        }
      },
      { threshold: [0, 0.3, 0.75] },
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      leader.pause();
      leader.removeEventListener('play', showPlaying);
      leader.removeEventListener('pause', showPaused);
    };
  }, [reduceMotion]);

  const togglePlayback = useCallback(() => {
    const leader = leftRef.current;
    if (!leader) return;
    if (leader.paused) {
      pausedByViewer.current = false;
      void leader.play().catch(() => undefined);
    } else {
      pausedByViewer.current = true;
      leader.pause();
    }
  }, []);

  return (
    <div ref={containerRef} className="video-compare" style={{ aspectRatio: comparison.aspectRatio }}>
      <ReactCompareSlider
        className="video-compare__slider"
        itemOne={<ComparisonItem ref={leftRef} video={comparison.left} side="left" />}
        itemTwo={<ComparisonItem ref={rightRef} video={comparison.right} side="right" />}
      />
      <button
        type="button"
        className="video-compare__toggle"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause both videos' : 'Play both videos'}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause size={17} /> : <Play size={17} />}
      </button>
    </div>
  );
};

export default VideoCompare;
