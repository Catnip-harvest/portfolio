Date: 2026-10-15
Status: active
Question: How should a case study let a viewer compare a real robot camera with its simulation twin?
Decision: Use `react-compare-slider` 4.0.0 for the drag-to-compare slider, with two separate muted videos as its items. Keep them on one clock with a small hook in `components/VideoCompare.tsx`, which re-seeks the right video whenever it drifts more than 0.07 s from the left. On the home page the card shows a pre-rendered wipe loop instead of an interactive slider, because the card media is already a button that opens the lightbox.
Why: It is the only maintained candidate that accepts arbitrary children such as `<video>` and ships ARIA slider semantics, keyboard control and touch handling. On phones only the handle drags, so page scroll keeps working. No small, maintained library syncs two videos, so that part is custom and kept to about 50 lines.
Applies to: Any project with a `comparison` field in `constants.ts`; currently `so101-real-to-sim`.
Tradeoff: Two videos download instead of one (0.79 MB + 0.40 MB for the twin). A single side-by-side file drawn into two canvases would sync perfectly, but needs more custom code and a poster fallback.
Risk / Blast Radius: Low. The slider only replaces the hero of projects that opt in; every other page is unchanged.
Revisit when: A maintained media-sync library appears, or the slider needs to compare more than two sources.
Related Edward Rules: Research public tools before building; record the comparison in the project docs.
Related Project Notes: None.
Source: User request on 2026-10-15 ("a slider that slides across and sees the difference"); library research on the same day.

## Options compared

Checked on 2026-10-15 against the npm registry, the npm downloads API and GitHub.

| Package | Version, date | Stars / open issues / downloads a week | Licence | Video children | Touch | Keyboard and ARIA | Size (gzip) |
|---|---|---|---|---|---|---|---|
| **react-compare-slider** (chosen) | 4.0.0, 2026-03-20 | 383 / 5 / 203k | MIT | Yes: `itemOne` and `itemTwo` are any React node | Pointer events, `touch-action: pan-y` | Arrow keys; `role="slider"` with value attributes | ~3.7 KB |
| img-comparison-slider + `@img-comparison-slider/react` | 8.0.7, 2026-01-29 (wrapper 8.0.2, 2024-05-06) | 873 / 23 / 40k | MIT | Slots take any element; video not documented | Yes | Left/Right keys; no ARIA in the build | ~3.6 KB |
| react-compare-image | 3.5.23, 2026-09-30 | 408 / 9 / 24.6k | MIT | No, image URLs only | Not verified | None found | ~2.4 KB |
| react-before-after-slider-component | 1.1.8, 2023-04-16 | 55 / 1 / 5k | MIT | No, image URLs only | Touch events | None found | ~4 KB raw |

Video sync:

| Option | Why not chosen |
|---|---|
| `media-element-syncer` 1.1.1 | Last release 2019, about 4 downloads a week |
| `timingsrc` 1.4.37 | Maintained but heavy for one hero |
| `video-comparison-slider` 0.0.5 | Not React; corrects on `timeupdate`, which MDN says fires irregularly |

Custom hook: on every presented frame of the left video (`requestVideoFrameCallback`, with an animation-frame fallback), it re-seeks the right video when the two are more than 0.07 s apart. The right video also mirrors the left video's play, pause and seek. Correction only ever seeks, never changes `playbackRate`, because iOS handles playback-rate nudges badly.

Sources:
- https://www.npmjs.com/package/react-compare-slider
- https://github.com/nerdyman/react-compare-slider
- https://github.com/sneas/img-comparison-slider
- https://github.com/tam315/react-compare-image
- https://github.com/smeleshkin/react-before-after-slider-component
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestVideoFrameCallback
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
- https://bocoup.com/blog/html5-video-synchronizing-playback-of-two-videos
- https://github.com/tjenkinson/media-element-syncer
- https://timingsrc.readthedocs.io/en/latest/sync/mediasync.html
