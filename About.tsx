
import React from 'react';

interface AboutProps {
  onViewResume: () => void;
  info: any;
}

const About: React.FC<AboutProps> = ({ onViewResume, info }) => {
  return (
    <div className="grid md:grid-cols-5 gap-12 lg:gap-24 items-center py-12">
      <div className="md:col-span-3 order-2 md:order-1">
        <div className="reveal">
          <h2 className="text-4xl font-bold mb-10 text-stone-100 tracking-tight">About</h2>
          <div className="space-y-6 text-stone-400 text-lg leading-relaxed font-light">
            <p className="whitespace-pre-wrap">
              {info.about}
            </p>
            <div className="pt-8 flex flex-wrap gap-4">
               <button 
                 onClick={onViewResume}
                 className="flex items-center gap-3 px-10 py-5 bg-stone-100 hover:bg-white text-stone-950 font-bold uppercase tracking-widest text-xs rounded-2xl transition-all group shadow-lg shadow-black/20"
               >
                 <i className="fas fa-eye group-hover:scale-110 transition-transform"></i>
                 View Professional Resume
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 order-1 md:order-2 relative reveal">
        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-stone-950 grayscale hover:grayscale-0 transition-all duration-1000 border border-stone-800 aspect-[4/5]">
          <img 
            src={info.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
            alt={info.name} 
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-100/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-stone-800/20 rounded-full blur-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default About;
