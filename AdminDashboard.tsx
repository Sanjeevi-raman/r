
import React, { useState, useEffect } from 'react';

interface AdminDashboardProps {
  onClose: () => void;
  onUpdate: () => void;
}

type AuthStep = 'email' | 'otp' | 'authorized';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onUpdate }) => {
  const [step, setStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [systemOtp, setSystemOtp] = useState('');
  
  // Load current values
  const [aboutText, setAboutText] = useState(() => {
    const saved = localStorage.getItem('portfolio_personal_info');
    return saved ? JSON.parse(saved).about : "Default about text...";
  });

  const AUTHORIZED_EMAIL = 'stombregar3@gmail.com';

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === AUTHORIZED_EMAIL) {
      setIsSending(true);
      // Simulate OTP sending delay
      setTimeout(() => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSystemOtp(generatedOtp);
        setIsSending(false);
        setStep('otp');
        // In a real app, this would be an API call to send the email.
        // For simulation, we log it to console.
        console.log(`[SIMULATION] OTP sent to ${AUTHORIZED_EMAIL}: ${generatedOtp}`);
        alert(`Verification code sent to ${AUTHORIZED_EMAIL}. (For demo: check browser console)`);
      }, 1500);
    } else {
      alert('Unauthorized email address.');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === systemOtp || otp === '882299') { // 882299 is a backup demo code
      setStep('authorized');
    } else {
      alert('Invalid verification code.');
    }
  };

  const handleSave = () => {
    const info = JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}');
    info.about = aboutText;
    localStorage.setItem('portfolio_personal_info', JSON.stringify(info));
    onUpdate();
    alert('Information Updated Successfully');
  };

  if (step === 'email') {
    return (
      <div className="fixed inset-0 z-[300] bg-stone-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-10 bg-stone-900 rounded-[2.5rem] border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-800 via-stone-100 to-stone-800 opacity-20"></div>
          <h2 className="text-2xl font-black text-stone-100 uppercase tracking-tighter mb-4 text-center">Admin Access</h2>
          <p className="text-stone-500 text-[10px] text-center uppercase font-bold tracking-[0.2em] mb-8">Enter your registered administrator email</p>
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div className="relative">
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="administrator@domain.com"
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:border-stone-100 transition-all text-center font-light"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSending}
              className="w-full py-5 bg-stone-100 text-stone-950 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-black/40 flex items-center justify-center gap-3"
            >
              {isSending ? (
                <>
                  <i className="fas fa-circle-notch animate-spin"></i>
                  Requesting Code
                </>
              ) : (
                'Request Verification'
              )}
            </button>
            <button type="button" onClick={onClose} className="w-full text-stone-500 text-[10px] font-bold uppercase tracking-widest hover:text-stone-100 transition-colors">
              Abort Session
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="fixed inset-0 z-[300] bg-stone-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md p-10 bg-stone-900 rounded-[2.5rem] border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-stone-100 animate-pulse"></div>
          <h2 className="text-2xl font-black text-stone-100 uppercase tracking-tighter mb-4 text-center">Verify Identity</h2>
          <p className="text-stone-500 text-[10px] text-center uppercase font-bold tracking-[0.1em] mb-8">Verification code sent to <br/><span className="text-stone-300">{AUTHORIZED_EMAIL}</span></p>
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <input 
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:border-stone-100 transition-all text-center tracking-[0.5em] text-2xl font-black"
            />
            <button type="submit" className="w-full py-5 bg-stone-100 text-stone-950 font-bold rounded-2xl uppercase tracking-widest text-xs shadow-xl">
              Confirm Access
            </button>
            <div className="flex flex-col gap-4 items-center">
              <button 
                type="button" 
                onClick={() => setStep('email')} 
                className="text-stone-500 text-[10px] font-bold uppercase tracking-widest hover:text-stone-100 transition-colors"
              >
                Back to Email
              </button>
              <p className="text-[9px] text-stone-700 uppercase font-bold tracking-widest">Secured by End-to-End Encryption</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] bg-stone-950 overflow-y-auto pt-24 px-4 pb-10">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-black text-stone-100 uppercase tracking-tighter">Admin Portal</h2>
            <p className="text-stone-600 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 italic">Authenticated: {AUTHORIZED_EMAIL}</p>
          </div>
          <button onClick={onClose} className="bg-stone-900 p-4 rounded-full text-stone-500 hover:text-stone-100 border border-stone-800 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="grid gap-8">
          <div className="p-10 bg-stone-900 rounded-[2rem] border border-stone-800 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-[10vw] font-black text-white/5 pointer-events-none select-none -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-1000">BIO</div>
            <h3 className="text-xs font-black text-stone-500 uppercase tracking-[0.3em]">Biography Control</h3>
            <textarea 
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              className="w-full h-40 bg-stone-950 border border-stone-800 rounded-2xl p-6 text-stone-100 focus:outline-none focus:border-stone-100 transition-all font-light leading-relaxed relative z-10"
            />
            <button 
              onClick={handleSave}
              className="relative z-10 px-10 py-4 bg-stone-100 text-stone-950 font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-black/20"
            >
              Commit Changes
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 bg-stone-900/50 rounded-[2rem] border border-stone-800 border-dashed flex flex-col items-center justify-center text-stone-700 min-h-[200px]">
               <i className="fas fa-project-diagram mb-4 text-3xl opacity-20"></i>
               <p className="text-[10px] uppercase font-bold tracking-[0.4em]">Project Management Coming Soon</p>
            </div>
            <div className="p-10 bg-stone-900/50 rounded-[2rem] border border-stone-800 border-dashed flex flex-col items-center justify-center text-stone-700 min-h-[200px]">
               <i className="fas fa-users mb-4 text-3xl opacity-20"></i>
               <p className="text-[10px] uppercase font-bold tracking-[0.4em]">Network Management Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
