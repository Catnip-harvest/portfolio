export interface ComparisonVideo {
  src: string;
  poster: string;
  label: string;
}

/** Two videos of the same scene, shown as a drag-to-compare slider in the case-study hero.
 *  Both must share frame size, length and frame rate, so they stay aligned while they play. */
export interface VideoComparison {
  left: ComparisonVideo;
  right: ComparisonVideo;
  /** The videos' own frame shape as a CSS aspect-ratio, e.g. '640 / 448'. */
  aspectRatio: string;
  caption: string;
}

export interface Project {
  id: string;
  type?: 'project' | 'certificate';
  title: string;
  shortDescription: string;
  fullDescription: string;
  impact?: string;
  tags: string[];
  imageUrl?: string;
  imageFit?: 'cover' | 'contain';
  previewVideoUrl?: string;
  /** How the card and case-study header fit previewVideoUrl. Defaults to 'cover' (crop to fill). */
  videoFit?: 'cover' | 'contain';
  posterUrl?: string;
  videoUrl?: string;
  secondaryImageUrl?: string;
  additionalMedia?: string[];
  /** Replaces the case-study hero with a drag-to-compare slider. The card still uses previewVideoUrl. */
  comparison?: VideoComparison;
  features: string[];
  date?: string;
  role?: string;
  collaborators?: string[];
  credentialUrl?: string;
  repoUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeUrl: string;
  verifyUrl?: string;
}

export interface Accomplishment {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'Award' | 'Competition' | 'Hackathon' | 'Scholarship' | 'Speaking';
  icon?: string;
  imageUrl?: string;
  gallery?: string[];
  linkUrl?: string;
}

export type SectionId = 'home' | 'projects' | 'media' | 'certifications' | 'contact';
export type ViewState = 'home' | 'project-detail' | 'accomplishments';
