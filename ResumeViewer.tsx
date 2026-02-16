
import React from 'react';
import { Experience, UIConfig } from './types';

interface ResumeViewerProps {
  onClose: () => void;
  uiConfig: UIConfig;
  personalInfo: any;
  experiences: Experience[];
  skills: any[];
}

const ResumeViewer: React.FC<ResumeViewerProps> = ({ onClose, uiConfig, personalInfo, experiences, skills }) => {
  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl overflow-y-auto pt-20 pb-10 px-4 flex justify-center">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 w-12 h-12 rounded-full bg-stone-100 text-stone-950 flex items-center justify-center text-xl shadow-2xl hover:scale-110 transition-transform z-[210]"
      >
        <i className="fas fa-times"></i>
      </button>

      <div className="w-full max-w-6xl bg-white text-stone-900 rounded-sm shadow-2xl overflow-hidden pointer-events-auto" style={{ height: 'calc(100vh - 120px)' }}>
        <iframe 
          src="/resume.pdf" 
          className="w-full h-full"
          title="Resume"
        />
      </div>

      {/* Fallback: Original generated resume - hidden by default */}
      <div className="hidden w-full max-w-4xl bg-white text-stone-900 rounded-sm shadow-2xl p-8 md:p-16 min-h-[1100px] flex flex-col pointer-events-auto selection:bg-stone-200">
        <div className="flex justify-between items-start border-b-2 border-stone-900 pb-10 mb-10">
          <div>
            <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">{personalInfo.name}</h1>
            <p className="text-xl font-medium text-stone-600 uppercase tracking-widest">{personalInfo.title}</p>
          </div>
          <div className="text-right text-sm font-bold uppercase tracking-widest text-stone-500 space-y-1">
            <p>{personalInfo.location}</p>
            <p>{personalInfo.email}</p>
            <p>linkedin.com/in/sanjeeviraman</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-1 space-y-10 border-r border-stone-100 pr-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-900 mb-6 border-b border-stone-900 pb-2">Skills</h2>
              <div className="space-y-6">
                {skills.map(skill => (
                  <div key={skill.category}>
                    <p className="text-[10px] font-black uppercase text-stone-400 mb-2">{skill.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item: string) => (
                        <span key={item} className="text-xs font-bold text-stone-900">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-900 mb-6 border-b border-stone-900 pb-2">Education</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-black">B.E. Computer Science</p>
                  <p className="text-xs text-stone-500">Tamil Nadu Engineering College</p>
                  <p className="text-[10px] font-bold text-stone-400">2022 - 2026</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-10">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-900 mb-6 border-b border-stone-900 pb-2">Experience</h2>
              <div className="space-y-10">
                {experiences.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-lg font-black uppercase tracking-tight">{exp.role}</h3>
                      <span className="text-xs font-bold text-stone-400">{exp.period}</span>
                    </div>
                    <p className="text-xs font-black text-stone-600 uppercase mb-4">{exp.company} • {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="text-sm text-stone-500 leading-relaxed flex gap-3"><span className="text-stone-300">•</span>{desc}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-stone-900 mb-6 border-b border-stone-900 pb-2">Objective</h2>
              <p className="text-sm text-stone-500 leading-relaxed italic">{personalInfo.about}</p>
            </div>
          </div>
        </div>
        <div className="mt-auto pt-10 border-t border-stone-100 text-center">
          <p className="text-[10px] font-bold text-stone-300 uppercase tracking-[0.5em]">Digitally Verified Record</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
