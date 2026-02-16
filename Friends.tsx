
import React from 'react';
import { Friend } from '../types';

interface FriendsProps {
  friends: Friend[];
}

const Friends: React.FC<FriendsProps> = ({ friends }) => {
  return (
    <div className="py-12">
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-stone-100 tracking-tight">Professional Circle</h2>
        <p className="text-stone-500 text-center font-light">Collaborators, mentors, and peers in my journey.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {friends.map((friend) => (
          <div key={friend.id} className="group bg-stone-900 rounded-[2.5rem] border border-stone-800 hover:border-stone-500 transition-all p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-stone-800 group-hover:bg-stone-100 transition-colors"></div>
            <div className="w-32 h-32 rounded-3xl overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 shadow-xl ring-4 ring-stone-950">
              <img src={friend.image} alt={friend.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 className="text-xl font-bold text-stone-100 mb-1 tracking-tight">{friend.name}</h3>
            <p className="text-stone-500 text-[10px] uppercase font-bold tracking-widest mb-6">{friend.role}</p>
            <div className="w-full space-y-4 pt-6 border-t border-stone-800">
              <div className="flex items-center justify-center gap-3 text-stone-400 group-hover:text-stone-200 transition-colors">
                <i className="fas fa-phone-alt text-xs"></i>
                <span className="text-sm font-medium">{friend.phoneNumber}</span>
              </div>
              <div className="flex justify-center gap-6 text-stone-600">
                {friend.socials.linkedin && (
                  <a href={friend.socials.linkedin} className="hover:text-stone-100 transition-colors text-lg"><i className="fab fa-linkedin"></i></a>
                )}
                {friend.socials.github && (
                  <a href={friend.socials.github} className="hover:text-stone-100 transition-colors text-lg"><i className="fab fa-github"></i></a>
                )}
                {friend.socials.twitter && (
                  <a href={friend.socials.twitter} className="hover:text-stone-100 transition-colors text-lg"><i className="fab fa-twitter"></i></a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
