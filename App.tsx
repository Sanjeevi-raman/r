
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Friends from './components/Friends';
import Contact from './components/Contact';
import AIAssistant from './components/AIAssistant';
import ResumeViewer from './components/ResumeViewer';
import { getUIConfig, getPersonalInfo, getSkills, getExperiences, getFriends, getProjects, getCertificates } from './constants';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [showResume, setShowResume] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);

  // Dynamic Content States
  const [uiConfig, setUiConfig] = useState(getUIConfig());
  const [personalInfo, setPersonalInfo] = useState(getPersonalInfo());
  const [skills, setSkills] = useState(getSkills());
  const [experiences, setExperiences] = useState(getExperiences());
  const [friends, setFriends] = useState(getFriends());
  const [projects, setProjects] = useState(getProjects());
  const [certificates, setCertificates] = useState(getCertificates());

  const refreshContent = () => {
    setUiConfig(getUIConfig());
    setPersonalInfo(getPersonalInfo());
    setSkills(getSkills());
    setExperiences(getExperiences());
    setFriends(getFriends());
    setProjects(getProjects());
    setCertificates(getCertificates());
    setContentVersion(v => v + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'certificates', 'network', 'contact'];
      const scrollPosition = window.scrollY + 150; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="relative min-h-screen transition-colors duration-500 overflow-x-hidden"
      style={{ 
        backgroundColor: uiConfig.backgroundColor,
        color: uiConfig.textColor,
        fontFamily: uiConfig.fontFamily,
        fontSize: uiConfig.fontSizeBase
      }}
    >
      {/* Inject CSS Variables */}
      <style>{`
        :root {
          --primary-color: ${uiConfig.primaryColor};
          --text-color: ${uiConfig.textColor};
          --bg-color: ${uiConfig.backgroundColor};
        }
        .text-stone-100 { color: var(--primary-color) !important; }
        .bg-stone-100 { background-color: var(--primary-color) !important; }
        .text-stone-400 { color: var(--text-color) !important; opacity: 0.8; }
        .dark-obsidian-bg { background-color: var(--bg-color) !important; }
        .border-stone-800 { border-color: rgba(255,255,255,0.05) !important; }
        .bg-stone-900 { background-color: rgba(255,255,255,0.02) !important; backdrop-filter: blur(20px); }
        .bg-stone-950 { background-color: var(--bg-color) !important; }
      `}</style>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-stone-900/40 blur-[180px] rounded-full opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-stone-800/20 blur-[180px] rounded-full opacity-30"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <Navbar 
        activeSection={activeSection}
        onOpenAdmin={() => {}}
      />
      
      <main key={contentVersion} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 md:space-y-48 pb-32 pt-24">
        <section id="about" className="pt-20">
          <About onViewResume={() => setShowResume(true)} info={personalInfo} />
        </section>

        <section id="skills" className="pt-20">
          <Skills skills={skills} />
        </section>
        
        <section id="experience" className="pt-20">
          <Experience experiences={experiences} />
        </section>
        
        <section id="projects" className="pt-20">
          <Projects projects={projects} />
        </section>
        
        <section id="certificates" className="pt-20">
          <Certificates certificates={certificates} />
        </section>

        <section id="network" className="pt-20">
          <Friends friends={friends} />
        </section>
        
        <section id="contact" className="pt-20 pb-20">
          <Contact info={personalInfo} />
        </section>
      </main>

      {/* Modals */}
      {showResume && <ResumeViewer onClose={() => setShowResume(false)} uiConfig={uiConfig} personalInfo={personalInfo} experiences={experiences} skills={skills} />}

      <footer className="border-t border-stone-900 py-20 bg-stone-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="font-bold text-xl tracking-tighter text-stone-100 uppercase mb-6">{personalInfo.name}</div>
          <div className="flex justify-center gap-8 text-stone-500">
             <a href={personalInfo.twitter} className="hover:text-stone-100 transition-colors">Twitter</a>
             <a href={personalInfo.linkedin} className="hover:text-stone-100 transition-colors">LinkedIn</a>
             <a href={personalInfo.github} className="hover:text-stone-100 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
