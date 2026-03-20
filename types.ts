export interface Project {
  id: string;
  type?: 'project' | 'certificate';
  title: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  imageUrl: string;
  videoUrl?: string;
  secondaryImageUrl?: string;
  additionalMedia?: string[];
  features: string[];
  date?: string;
  role?: string;
  collaborators?: string[];
  credentialUrl?: string;
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
  category: 'Award' | 'Hackathon' | 'Scholarship' | 'Speaking';
  icon?: string;
}

export type SectionId = 'home' | 'projects' | 'media' | 'certifications' | 'contact';
export type ViewState = 'home' | 'project-detail' | 'accomplishments';