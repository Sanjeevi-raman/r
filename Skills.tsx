
import React from 'react';

interface SkillsProps {
  skills: any[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const getLogoClass = (skill: string): string => {
    const s = skill.toLowerCase().replace(/\s/g, '');
    // AWS
    if (s.includes('aws') || s.includes('ec2') || s.includes('s3') || s.includes('lambda') || s.includes('cloudformation') || s.includes('iam')) return 'devicon-amazonwebservices-plain';
    // Google Cloud / Arcade
    if (s.includes('google') || s.includes('gcp') || s.includes('bigquery') || s.includes('kubernetes')) return 'devicon-googlecloud-plain';
    // Frontend
    if (s.includes('react')) return 'devicon-react-original';
    if (s.includes('typescript')) return 'devicon-typescript-plain';
    if (s.includes('javascript')) return 'devicon-javascript-plain';
    if (s.includes('html')) return 'devicon-html5-plain';
    if (s.includes('css')) return 'devicon-css3-plain';
    if (s.includes('tailwind')) return 'devicon-tailwindcss-original';
    // Figma & UI/UX
    if (s.includes('figma') || s.includes('design') || s.includes('prototype') || s.includes('wireframe') || s.includes('ui') || s.includes('ux') || s.includes('usability') || s.includes('interaction')) return 'devicon-figma-plain';
    // Content Writing
    if (s.includes('writing') || s.includes('documentation') || s.includes('technical') || s.includes('blog') || s.includes('copy') || s.includes('seo') || s.includes('content')) return 'devicon-markdown-original';
    return 'devicon-devicon-plain';
  };

  const allSkillsWithLogos = skills.flatMap(category => 
    category.items.map((item: string) => ({
      name: item,
      logoClass: getLogoClass(item)
    }))
  );

  const marqueeItems = [...allSkillsWithLogos, ...allSkillsWithLogos];

  return (
    <div className="py-12 overflow-hidden">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-stone-100 tracking-tight text-center">Competencies</h2>
        <p className="text-stone-500 text-center max-w-xl font-light">
          A collection of tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="relative mb-24 py-12 bg-stone-900/10 border-y border-stone-800/40">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {marqueeItems.map((skill, index) => (
            <div key={index} className="mx-16 flex items-center gap-6 group cursor-default">
              <i className={`${skill.logoClass} colored text-4xl md:text-6xl opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`}></i>
              <span className="text-3xl md:text-5xl font-black text-stone-100/10 uppercase tracking-tighter group-hover:text-stone-100 transition-all duration-500">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-stone-950 to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-stone-950 to-transparent pointer-events-none z-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {skills.map((skill, idx) => (
          <div key={skill.category} className={`reveal delay-${(idx % 3) + 1} p-10 bg-stone-900 rounded-[2rem] border border-stone-800 hover:border-stone-500 transition-all shadow-sm group transform hover:-translate-y-2 cursor-pointer`}>
            <div className="flex items-center gap-5 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-stone-800 flex items-center justify-center text-stone-100 text-3xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all duration-500 group-hover:rotate-12">
                <i className={`${skill.icon} colored`}></i>
              </div>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-[0.2em]">{skill.category}</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skill.items.map((item: string) => (
                <span key={item} className="px-4 py-2 bg-stone-800 rounded-xl text-stone-400 text-xs font-medium hover:bg-stone-100 hover:text-stone-950 transition-all border border-stone-700/50 hover:scale-110">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
