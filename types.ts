
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  type: 'internship' | 'job' | 'student-work';
  location: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  team: TeamMember[];
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface Friend {
  id: string;
  name: string;
  role: string;
  image: string;
  phoneNumber: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image: string;
  certificateImage?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface UIConfig {
  fontFamily: 'Inter' | 'Serif' | 'Mono' | 'Playfair Display' | 'Roboto Mono';
  fontSizeBase: string; // e.g. "16px"
  primaryColor: string; // Accent color
  backgroundColor: string;
  textColor: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
