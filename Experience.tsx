import React from 'react';
import { Experience as ExpType } from '../types';

interface ExperienceProps {
  experiences: ExpType[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-4xl font-bold mb-4 text-stone-100 tracking-tight">
          Career Path
        </h2>
        <p className="text-stone-500 text-center max-w-xl font-light">
          Professional journey and contributions in the IT landscape.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-900 md:-translate-x-px"></div>
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex items-start md:items-center md:justify-between group"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-4px] md:left-1/2 top-1 md:-translate-x-[4px] w-2 h-2 rounded-full bg-stone-100 border-4 border-stone-950 ring-4 ring-stone-900 z-10"></div>

              {/* Experience card */}
              <div
                className={`ml-10 md:ml-0 md:w-[45%] ${
                  index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <article className="p-8 bg-stone-900 rounded-3xl border border-stone-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest px-3 py-1 bg-stone-800 rounded-full">
                      {exp.type}
                    </span>
                    <span className="text-stone-500 text-xs font-medium">
                      {exp.period}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-100 mb-1">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-stone-400 text-sm mb-6">
                    <span className="font-medium text-stone-200">
                      {exp.company}
                    </span>
                    <span className="text-stone-700">•</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((point, i) => (
                      <li
                        key={i}
                        className="text-stone-400 text-sm leading-relaxed flex gap-3"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-600 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>

              {/* Spacer */}
              <div
                className={`hidden md:block md:w-[45%] ${
                  index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;