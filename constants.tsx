
import { Experience, Project, Certificate, Skill, Friend, UIConfig } from './types';

// Helper to get initial data
const getInitialData = (key: string, defaultValue: any) => {
  const saved = localStorage.getItem(`portfolio_${key}`);
  return saved ? JSON.parse(saved) : defaultValue;
};

export const saveData = (key: string, data: any) => {
  localStorage.setItem(`portfolio_${key}`, JSON.stringify(data));
};

export const UI_CONFIG_DEFAULT: UIConfig = {
  fontFamily: 'Inter',
  fontSizeBase: '16px',
  primaryColor: '#f5f5f4', // stone-100
  backgroundColor: '#0c0a09', // stone-950
  textColor: '#a8a29e', // stone-400
};

export const getUIConfig = (): UIConfig => getInitialData('ui_config', UI_CONFIG_DEFAULT);

export const PERSONAL_INFO_DEFAULT = {
  name: "SANJEEVI RAMAN E",
  title: "Multi-Cloud Learner | Cybersecurity Intern | Competitive Programmer",
  about: "A highly motivated Computer Science undergraduate actively building expertise across Cybersecurity, Cloud Computing (AWS, Azure, GCP), Competitive Programming, AI Innovation, and UI/UX Design. Passionate about solving real-world problems through hands-on internships and hackathons.",
  email: "sanjeeviraman777@gmail.com",
  phone: "+91 7904283959",
  location: "Tindivanam 604001 Tamil Nadu, India",
  profileImage: "/jpg.jpeg",
  github: "https://github.com/Sanjeevi-raman",
  linkedin: "https://www.linkedin.com/in/sanjeevi-raman-e-519655336",
  twitter: "https://x.com/Sanjeevi121211t",
  instagram: "https://www.instagram.com/lucifer_sanjeevi?igsh=am53NXRuOWx1YXg2",
};

export const getPersonalInfo = () => getInitialData('personal_info', PERSONAL_INFO_DEFAULT);

export const SKILLS_DEFAULT: (Skill & { icon: string })[] = [
  { 
    category: "AWS", 
    items: ["AWS"],
    icon: "devicon-amazonwebservices-plain-wordmark"
  },
  { 
    category: "Google Arcade", 
    items: ["Google Arcade"],
    icon: "devicon-googlecloud-plain"
  },
  { 
    category: "Frontend", 
    items: ["Frontend"],
    icon: "devicon-react-original"
  },
  { 
    category: "UI & UX", 
    items: ["UI & UX"],
    icon: "devicon-figma-plain"
  },
  { 
    category: "Content Writing", 
    items: ["Content Writing"],
    icon: "devicon-markdown-original"
  }
];

export const getSkills = () => getInitialData('skills', SKILLS_DEFAULT);

export const EXPERIENCES_DEFAULT: Experience[] = [
  {
    id: "exp1",
    company: "Skilldunia",
    role: "Cyber Security Intern",
    period: "2026 - Present",
    location: "Remote / Hybrid",
    type: "internship",
    description: [
      "Gaining practical exposure in industrial security practices and vulnerability assessments.",
      "Developing a deep understanding of organizational cybersecurity posture and risk management."
    ]
  }
];

export const getExperiences = () => getInitialData('experiences', EXPERIENCES_DEFAULT);

export const FRIENDS_DEFAULT: Friend[] = [
  {
    id: "f1",
    name: "MOHANASUNDHARAM B",
    role: "Developer",
    image: "/mohan.png",
    phoneNumber: "+91 63824 45409",
    socials: {
      linkedin: "https://www.linkedin.com/in/mohanasundaram-b-a2891335b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Brh%2FKFKrSTu2XMej08GLUJw%3D%3D",
      github: "https://github.com/mohan25355?tab=overview&from=2026-02-01&to=2026-02-15",
      twitter: "#"
    }
  }
];

export const getFriends = () => getInitialData('friends', FRIENDS_DEFAULT);

export const PROJECTS_DEFAULT: Project[] = [
  {
    id: "p1",
    title: "Youth Fest 2026 - Double Victory",
    description: "Won 3rd Prize in both AI Hackathon (₹2000 + Medal) and Paper Presentation (₹400 + Medal) at Youth Fest 2026. Competed on 5th January and received awards on 12th January 2026. Collaborated with teammates MOHANASUNDHARAM B and SELVADHARSHINI K to showcase innovation in AI and research. A proud moment of teamwork, learning, and achievement.",
    image: "/youth feast.jpeg",
    tags: ["AI", "Research", "Hackathon", "Award Winner"],
    team: [
      { name: "Sanjeevi Raman E", role: "Team Lead", avatar: "https://i.pravatar.cc/150?u=s" },
      { name: "Mohanasundharam B", role: "Developer", avatar: "https://i.pravatar.cc/150?u=m" },
      { name: "Selvadharshini K", role: "Researcher", avatar: "https://i.pravatar.cc/150?u=k" }
    ]
  }
];

export const getProjects = () => getInitialData('projects', PROJECTS_DEFAULT);

export const CERTIFICATES_DEFAULT: Certificate[] = [
  {
    id: "c1",
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "2023",
    credentialUrl: "#",
    image: "/aws.png",
    certificateImage: "/aws.jpg"
  }
];

export const getCertificates = () => getInitialData('certificates', CERTIFICATES_DEFAULT);
