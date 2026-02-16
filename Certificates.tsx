
import React from 'react';
import { Certificate } from './types';

interface CertificatesProps {
  certificates: Certificate[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <div className="py-12">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-stone-100 tracking-tight">Accreditation</h2>
        <p className="text-stone-500 text-center font-light">Verified professional certifications and achievements.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-6 bg-stone-900 rounded-3xl border border-stone-800 hover:shadow-xl transition-all group">
            <div 
              className="aspect-[4/3] mb-6 rounded-2xl overflow-hidden bg-stone-950 cursor-pointer relative"
              onClick={() => setSelectedImage(cert.certificateImage || cert.image)}
            >
              <img src={cert.image} alt={cert.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                <i className="fas fa-search-plus text-white text-2xl"></i>
              </div>
            </div>
            <h3 className="font-bold text-stone-100 mb-2 line-clamp-1 tracking-tight">{cert.title}</h3>
            <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-6">{cert.issuer}</p>
            <div className="flex items-center justify-between pt-4 border-t border-stone-800">
              <span className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em]">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Image Modal */}
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
            alt="Certificate" 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Certificates;
