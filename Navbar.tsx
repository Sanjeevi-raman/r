
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Network', id: 'network' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 300);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 px-6 md:px-12 py-6 flex items-center justify-between ${
        isScrolled ? 'bg-stone-950/80 backdrop-blur-xl border-b border-stone-900 py-4' : 'bg-transparent'
      }`}>
        <div className="text-stone-100 font-black text-lg md:text-xl tracking-tight uppercase">
          SANJEEVI RAMAN E
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-4 px-6 py-3 bg-stone-900/50 hover:bg-stone-100 rounded-full border border-stone-800 transition-all duration-300 shadow-xl"
        >
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
            isOpen ? 'text-stone-950' : 'text-stone-400 group-hover:text-stone-950'
          }`}>
            {isOpen ? 'Close' : 'Menu'}
          </span>
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`h-0.5 w-full bg-stone-100 rounded-full transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2 bg-stone-950' : 'group-hover:bg-stone-950'
            }`}></span>
            <span className={`h-0.5 w-full bg-stone-100 rounded-full transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'group-hover:bg-stone-950'
            }`}></span>
            <span className={`h-0.5 w-full bg-stone-100 rounded-full transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2 bg-stone-950' : 'group-hover:bg-stone-950'
            }`}></span>
          </div>
        </button>
      </header>

      <div className={`fixed inset-0 z-[140] bg-stone-950 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        
        {/* Subtle Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-stone-900/10 select-none -z-10 pointer-events-none uppercase tracking-widest opacity-20">
          INDEX
        </div>

        <div className="h-full flex flex-col justify-center items-center px-6">
          <nav className="flex flex-col items-center gap-3 md:gap-5">
            {navLinks.map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative group overflow-hidden transition-all duration-500 transform flex items-center gap-4 ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="block text-2xl md:text-4xl lg:text-5xl font-bold text-stone-600 group-hover:text-stone-100 transition-all uppercase tracking-tight">
                  {link.name}
                </span>
                <div className="w-0 group-hover:w-8 h-px bg-stone-100 transition-all duration-500"></div>
              </a>
            ))}
          </nav>

          <div className={`mt-16 flex flex-col items-center gap-8 transition-all duration-1000 delay-500 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex gap-10 text-xl text-stone-500">
              <a href="#" className="hover:text-stone-100 transition-colors"><i className="fab fa-github"></i></a>
              <a href="#" className="hover:text-stone-100 transition-colors"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="hover:text-stone-100 transition-colors"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
