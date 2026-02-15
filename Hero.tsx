
import React from 'react';
// Import the getter instead of a non-existent constant
import { getPersonalInfo } from '../constants';

const Hero: React.FC = () => {
  // Retrieve latest personal info from storage
  const info = getPersonalInfo();

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
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
  };

  return (
    <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 flex flex-col items-center text-center">
      <h1 className="reveal delay-1 text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 text-stone-100 leading-none">
        Digital <span className="text-stone-700">Architect</span>
      </h1>
      
      <p className="reveal delay-2 max-w-2xl text-lg md:text-2xl text-stone-400 mb-14 leading-relaxed font-light px-4">
        {info.about}
      </p>
      
      <div className="reveal delay-3 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto px-6">
        <a 
          href="#projects" 
          onClick={(e) => scrollToId(e, 'projects')}
          className="w-full sm:w-auto px-12 py-5 bg-stone-100 hover:bg-white text-stone-950 font-bold uppercase tracking-widest text-xs rounded-2xl transition-all transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-100/10 active:scale-95"
        >
          View Portfolio
        </a>
        <a 
          href="#contact" 
          onClick={(e) => scrollToId(e, 'contact')}
          className="w-full sm:w-auto px-12 py-5 bg-stone-900/50 hover:bg-stone-800 text-stone-100 font-bold uppercase tracking-widest text-xs rounded-2xl border border-stone-800 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Get In Touch
        </a>
      </div>

      <div className="reveal delay-3 mt-24 flex gap-10 text-2xl text-stone-700">
        <a href={info.github} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-all hover:scale-125"><i className="fab fa-github"></i></a>
        <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-all hover:scale-125"><i className="fab fa-linkedin"></i></a>
        <a href={info.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-all hover:scale-125"><i className="fab fa-twitter"></i></a>
      </div>
    </div>
  );
};

export default Hero;
