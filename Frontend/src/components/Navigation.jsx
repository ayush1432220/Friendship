import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, MessageSquare, Star } from 'lucide-react';

const Navigation = ({ currentSection, setCurrentSection }) => {
  const sections = [
    { id: 0, label: 'Home', icon: <Sparkles className="w-5 h-5" /> },
    { id: 1, label: 'Gallery', icon: <Camera className="w-5 h-5" /> },
    { id: 2, label: 'Message', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 3, label: 'Finale', icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.5, type: "spring" }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 hidden md:block"
    >
      <div className="backdrop-blur-xl bg-white/10 px-6 py-3 rounded-2xl border border-white/20">
        <ul className="flex gap-6">
          {sections.map((section) => (
            <motion.li key={section.id}>
              <button
                onClick={() => {
                  setCurrentSection(section.id);
                  window.scrollTo({ 
                    top: section.id * window.innerHeight, 
                    behavior: 'smooth' 
                  });
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  currentSection === section.id
                    ? 'text-pink-300 opacity-100'
                    : 'text-gray-400 hover:text-white opacity-70'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`p-2 rounded-full ${
                    currentSection === section.id ? 'bg-white/10' : ''
                  }`}
                >
                  {section.icon}
                </motion.div>
                <span className="text-xs font-medium">{section.label}</span>
                {currentSection === section.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="w-1.5 h-1.5 rounded-full bg-pink-400"
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navigation;