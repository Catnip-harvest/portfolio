export interface Project {
  id: string;
  type?: 'project' | 'certificate';
  title: string;
  shortDescription: string;
  fullDescription: string;
  impact?: string;
  tags: string[];
  imageUrl: string;
  imageFit?: 'cover' | 'contain';
  previewVideoUrl?: string;
  posterUrl?: string;
  videoUrl?: string;
  secondaryImageUrl?: string;
  additionalMedia?: string[];
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
