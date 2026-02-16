
import React from 'react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
        <div className="text-center md:text-left reveal">
          <h2 className="text-4xl font-bold mb-4 text-stone-100 tracking-tight">Events</h2>
          <p className="text-stone-500 font-light">Selected works and collaborative projects.</p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        {projects.map((project, idx) => (
          <div key={project.id} className={`reveal delay-${idx + 1} group relative bg-stone-900 rounded-[2.5rem] border border-stone-800 hover:border-stone-600 transition-all overflow-hidden shadow-sm transform hover:scale-[1.02]`}>
            <div className="aspect-[16/10] overflow-hidden bg-stone-950 cursor-pointer" onClick={() => setSelectedImage(project.image)}>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                style={project.image.includes('youth feast') ? { transform: 'rotate(-90deg) scale(1.5)' } : {}}
              />
            </div>
            
            <div className="p-10 relative z-10">
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-stone-800 text-stone-400 text-[10px] font-bold rounded-full uppercase tracking-tighter group-hover:bg-stone-100 group-hover:text-stone-950 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h3 className="text-2xl font-bold text-stone-100 mb-4 group-hover:text-stone-300 transition-colors tracking-tight">
                {project.title}
              </h3>
              
              <p className="text-stone-400 mb-8 leading-relaxed font-light">
                {project.description}
              </p>
              
              <div className="flex items-center justify-end border-t border-stone-800 pt-8">
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="w-10 h-10 bg-stone-800 hover:bg-stone-100 hover:text-stone-950 flex items-center justify-center rounded-full text-stone-300 transition-all transform hover:rotate-[360deg]"><i className="fab fa-github"></i></a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="w-10 h-10 bg-stone-100 hover:bg-white flex items-center justify-center rounded-full text-stone-950 transition-all transform hover:rotate-[360deg]"><i className="fas fa-external-link-alt text-xs"></i></a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="fixed top-8 right-8 w-12 h-12 rounded-full bg-stone-100 text-stone-950 flex items-center justify-center text-xl shadow-2xl hover:scale-110 transition-transform z-[210]"
          >
            <i className="fas fa-times"></i>
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="max-w-full max-h-full object-contain"
            style={selectedImage.includes('youth feast') ? { transform: 'rotate(-90deg)' } : {}}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
