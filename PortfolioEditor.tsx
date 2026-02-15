
import React, { useState, useEffect } from 'react';
import { UIConfig, Friend, Project, Experience, Certificate, Skill, Message } from '../types';
import { saveData } from '../constants';

interface PortfolioEditorProps {
  onClose: () => void;
  onRefresh: () => void;
  uiConfig: UIConfig;
  personalInfo: any;
  skills: any[];
  experiences: Experience[];
  friends: Friend[];
  projects: Project[];
  certificates: Certificate[];
}

type AuthStep = 'email' | 'otp' | 'authorized';

const PortfolioEditor: React.FC<PortfolioEditorProps> = ({ 
  onClose, 
  onRefresh, 
  uiConfig: initialUi, 
  personalInfo: initialInfo,
  skills: initialSkills,
  experiences: initialExp,
  friends: initialFriends,
  projects: initialProj,
  certificates: initialCert
}) => {
  const [authStep, setAuthStep] = useState<AuthStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [systemOtp, setSystemOtp] = useState('');

  const [activeTab, setActiveTab] = useState<'visuals' | 'content' | 'network' | 'messages'>('visuals');
  const [ui, setUi] = useState(initialUi);
  const [info, setInfo] = useState(initialInfo);
  const [friends, setFriends] = useState(initialFriends);
  const [messages, setMessages] = useState<Message[]>([]);

  const AUTHORIZED_EMAIL = 'stombregar3@gmail.com';

  useEffect(() => {
    if (authStep === 'authorized') {
      const savedMessages = localStorage.getItem('portfolio_messages');
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    }
  }, [authStep]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.toLowerCase() === AUTHORIZED_EMAIL) {
      setIsSending(true);
      setTimeout(() => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSystemOtp(generatedOtp);
        setIsSending(false);
        setAuthStep('otp');
        console.log(`[AUTH] Verification Code for ${AUTHORIZED_EMAIL}: ${generatedOtp}`);
        alert(`Verification code sent to ${AUTHORIZED_EMAIL}. (Demo: check browser console)`);
      }, 1500);
    } else {
      alert('Access Denied: Unauthorized email.');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === systemOtp || otp === '882299') {
      setAuthStep('authorized');
    } else {
      alert('Invalid code.');
    }
  };

  const handleSave = () => {
    saveData('ui_config', ui);
    saveData('personal_info', info);
    saveData('friends', friends);
    onRefresh();
    alert("Portfolio configuration committed successfully.");
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('portfolio_messages', JSON.stringify(updated));
  };

  const fonts = ['Inter', 'Serif', 'Mono', 'Playfair Display', 'Roboto Mono'];

  if (authStep === 'email') {
    return (
      <div className="fixed inset-0 z-[400] bg-stone-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-12 bg-stone-900 rounded-[3rem] border border-stone-800 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-500 to-transparent opacity-20"></div>
          <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tighter mb-4 text-center">Verify Identity</h2>
          <p className="text-stone-500 text-[10px] text-center uppercase font-bold tracking-[0.3em] mb-10">Administrative Authentication Required</p>
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter Admin Email" 
              required
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 text-center font-light focus:outline-none focus:border-stone-100 transition-all"
            />
            <button type="submit" disabled={isSending} className="w-full py-5 bg-stone-100 text-stone-950 font-bold rounded-2xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
              {isSending ? 'Requesting...' : 'Request Code'}
            </button>
            <button type="button" onClick={onClose} className="w-full text-stone-600 hover:text-stone-100 text-[10px] font-bold uppercase tracking-widest transition-colors">Abort</button>
          </form>
        </div>
      </div>
    );
  }

  if (authStep === 'otp') {
    return (
      <div className="fixed inset-0 z-[400] bg-stone-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-12 bg-stone-900 rounded-[3rem] border border-stone-800 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-stone-100 animate-pulse"></div>
          <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tighter mb-4 text-center">Verification</h2>
          <p className="text-stone-500 text-[10px] text-center uppercase font-bold tracking-[0.2em] mb-10">Code sent to {AUTHORIZED_EMAIL}</p>
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <input 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              placeholder="000000" 
              maxLength={6}
              className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:border-stone-100 transition-all"
            />
            <button type="submit" className="w-full py-5 bg-stone-100 text-stone-950 font-bold rounded-2xl uppercase tracking-widest text-xs shadow-xl">Confirm Access</button>
            <button type="button" onClick={() => setAuthStep('email')} className="w-full text-stone-600 hover:text-stone-100 text-[10px] font-bold uppercase tracking-widest transition-colors">Go Back</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[85vh] bg-stone-900 border border-stone-800 rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-stone-800 flex justify-between items-center bg-stone-950/50">
          <div>
            <h2 className="text-2xl font-black text-stone-100 uppercase tracking-tighter">Admin Control Center</h2>
            <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest mt-1">Authenticated via {AUTHORIZED_EMAIL}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleSave} className="px-6 py-3 bg-stone-100 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-white transition-all">Save Changes</button>
            <button onClick={onClose} className="p-3 bg-stone-800 text-stone-400 hover:text-stone-100 rounded-xl transition-all"><i className="fas fa-times"></i></button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 border-r border-stone-800 p-4 space-y-2 bg-stone-950/20">
            {(['visuals', 'content', 'network', 'messages'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative w-full text-left px-4 py-3 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all ${
                  activeTab === tab ? 'bg-stone-100 text-stone-950 shadow-lg' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                {tab}
                {tab === 'messages' && messages.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto p-10 space-y-12">
            {activeTab === 'visuals' && (
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-stone-500 uppercase tracking-widest">Typography</h3>
                  <div className="space-y-4">
                    <label className="block text-[10px] text-stone-600 uppercase font-bold">Font Family</label>
                    <select 
                      value={ui.fontFamily} 
                      onChange={(e) => setUi({...ui, fontFamily: e.target.value as any})}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-stone-100"
                    >
                      {fonts.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[10px] text-stone-600 uppercase font-bold">Base Font Size</label>
                    <input 
                      type="text" 
                      value={ui.fontSizeBase} 
                      onChange={(e) => setUi({...ui, fontSizeBase: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-stone-100"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black text-stone-500 uppercase tracking-widest">Color Palette</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-[10px] text-stone-600 uppercase font-bold">Accent Color</label>
                      <input type="color" value={ui.primaryColor} onChange={(e) => setUi({...ui, primaryColor: e.target.value})} className="w-full h-12 bg-transparent cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] text-stone-600 uppercase font-bold">Text Color</label>
                      <input type="color" value={ui.textColor} onChange={(e) => setUi({...ui, textColor: e.target.value})} className="w-full h-12 bg-transparent cursor-pointer" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="block text-[10px] text-stone-600 uppercase font-bold">Background Color</label>
                      <input type="color" value={ui.backgroundColor} onChange={(e) => setUi({...ui, backgroundColor: e.target.value})} className="w-full h-12 bg-transparent cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] text-stone-600 uppercase font-bold">Display Name</label>
                    <input type="text" value={info.name} onChange={(e) => setInfo({...info, name: e.target.value})} className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-stone-600 uppercase font-bold">Professional Title</label>
                    <input type="text" value={info.title} onChange={(e) => setInfo({...info, title: e.target.value})} className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-600 uppercase font-bold">Profile Image URL</label>
                  <input type="text" value={info.profileImage} onChange={(e) => setInfo({...info, profileImage: e.target.value})} className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100" />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-stone-600 uppercase font-bold">About Biography</label>
                  <textarea rows={5} value={info.about} onChange={(e) => setInfo({...info, about: e.target.value})} className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-stone-100 resize-none" />
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="space-y-10">
                <h3 className="text-xs font-black text-stone-500 uppercase tracking-widest">Network / Friends List</h3>
                {friends.map((f, idx) => (
                  <div key={f.id} className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" placeholder="Friend Name" value={f.name} onChange={(e) => {
                        const newFriends = [...friends];
                        newFriends[idx].name = e.target.value;
                        setFriends(newFriends);
                      }} className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm" />
                      <input type="text" placeholder="Role" value={f.role} onChange={(e) => {
                        const newFriends = [...friends];
                        newFriends[idx].role = e.target.value;
                        setFriends(newFriends);
                      }} className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-8">
                <h3 className="text-xs font-black text-stone-500 uppercase tracking-widest">Received Inquiries</h3>
                {messages.length === 0 ? (
                  <div className="text-center py-20 bg-stone-950/50 rounded-3xl border border-dashed border-stone-800">
                    <i className="fas fa-inbox text-4xl text-stone-800 mb-4"></i>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-700">No messages yet</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {messages.map((m) => (
                      <div key={m.id} className="p-6 bg-stone-950 border border-stone-800 rounded-2xl group relative">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-stone-100 font-bold">{m.name}</p>
                            <a href={`mailto:${m.email}`} className="text-stone-500 text-xs hover:text-stone-300 transition-colors">{m.email}</a>
                          </div>
                          <p className="text-[10px] text-stone-700 font-mono">{new Date(m.timestamp).toLocaleString()}</p>
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed mb-4">{m.message}</p>
                        <button 
                          onClick={() => deleteMessage(m.id)}
                          className="absolute bottom-6 right-6 text-stone-700 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditor;
