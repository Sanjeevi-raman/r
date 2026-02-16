
import React, { useState } from 'react';
import { Message } from './types';
import emailjs from '@emailjs/browser';

interface ContactProps {
  info: any;
}

const Contact: React.FC<ContactProps> = ({ info }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Initialize EmailJS (replace with your Public Key)
    emailjs.init(process.env.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');

    const templateParams = {
      to_email: info.email,
      from_name: formState.name,
      from_email: formState.email,
      message: formState.message,
      reply_to: formState.email,
    };

    // Send email
    emailjs.send(
      process.env.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
      process.env.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
      templateParams
    )
    .then(() => {
      // Also store locally
      const existingMessagesRaw = localStorage.getItem('portfolio_messages');
      const messages: Message[] = existingMessagesRaw ? JSON.parse(existingMessagesRaw) : [];
      
      const newMessage: Message = {
        id: Date.now().toString(),
        name: formState.name,
        email: formState.email,
        message: formState.message,
        timestamp: new Date().toISOString()
      };

      messages.unshift(newMessage);
      localStorage.setItem('portfolio_messages', JSON.stringify(messages));
      
      console.log('Message sent successfully:', newMessage);
      
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    })
    .catch((error) => {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    });
  };

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-8 text-stone-100 tracking-tighter">Contact</h2>
          <p className="text-stone-400 text-lg mb-10 leading-relaxed font-light">
            I'm currently considering select opportunities. If you have a project, an idea, or a position that aligns with my expertise, let's start a conversation. Think of me as your friend.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-100 text-xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all">
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <p className="text-stone-600 text-[10px] uppercase font-bold tracking-widest mb-1">Electronic Mail</p>
                <a href={`mailto:${info.email}`} className="text-stone-100 font-medium hover:text-stone-400 transition-colors">
                  {info.email}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-100 text-xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <p className="text-stone-600 text-[10px] uppercase font-bold tracking-widest mb-1">Base of Operations</p>
                <p className="text-stone-100 font-medium">{info.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-100 text-xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <p className="text-stone-600 text-[10px] uppercase font-bold tracking-widest mb-1">Phone Number</p>
                <a href={`tel:${info.phone}`} className="text-stone-100 font-medium hover:text-stone-400 transition-colors">
                  {info.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-100 text-xl group-hover:bg-stone-100 group-hover:text-stone-950 transition-all">
                <i className="fab fa-instagram"></i>
              </div>
              <div>
                <p className="text-stone-600 text-[10px] uppercase font-bold tracking-widest mb-1">Instagram</p>
                <a href={info.instagram} target="_blank" rel="noopener noreferrer" className="text-stone-100 font-medium hover:text-stone-400 transition-colors">
                  @lucifer_sanjeevi
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="p-12 bg-stone-900 rounded-[3rem] border border-stone-800 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-stone-500 text-[10px] uppercase font-bold tracking-widest ml-1">Full Name</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} required className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:bg-stone-900 transition-all font-light" placeholder="" />
              </div>
              <div className="space-y-3">
                <label className="text-stone-500 text-[10px] uppercase font-bold tracking-widest ml-1">Email Address</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} required className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:bg-stone-900 transition-all font-light" placeholder="" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-stone-500 text-[10px] uppercase font-bold tracking-widest ml-1">Your Message</label>
              <textarea rows={4} value={formState.message} onChange={(e) => setFormState({...formState, message: e.target.value})} required className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-6 py-4 text-stone-100 focus:outline-none focus:bg-stone-900 transition-all resize-none font-light" placeholder="" />
            </div>
            <button type="submit" disabled={status !== 'idle'} className="w-full py-5 bg-stone-100 hover:bg-stone-200 disabled:bg-stone-800 text-stone-950 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg shadow-black/30">
              {status === 'sending' ? <><i className="fas fa-circle-notch animate-spin"></i>Sending Message</> : status === 'success' ? <><i className="fas fa-check"></i>Message Sent!</> : status === 'error' ? <><i className="fas fa-exclamation-circle"></i>Send Failed</> : <><i className="fas fa-paper-plane text-[10px]"></i>Submit Inquiry</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
