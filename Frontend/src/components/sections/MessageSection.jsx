import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const MessageSection = () => {
  const [typedText, setTypedText] = useState('');
  const fullMessage = "Thank you for being my constant 💫\nCheers to more memories in 2026 🥂";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullMessage.length) {
        setTypedText(fullMessage.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute top-8 right-8 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">Typing...</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            To My Best Friend
          </h2>

          <div className="relative min-h-[200px] mb-12">
            <pre className="text-2xl md:text-3xl lg:text-4xl text-white whitespace-pre-wrap leading-relaxed font-light">
              {typedText}
              <span className="inline-block w-1 h-10 ml-1 bg-white animate-pulse align-middle" />
            </pre>
          </div>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ delay: 3, duration: 1.5 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '💫', title: 'Your Light', text: 'You brighten every room you enter and every life you touch.' },
              { icon: '🤝', title: 'Our Bond', text: 'Through thick and thin, our friendship only grows stronger.' },
              { icon: '🎉', title: 'New Adventures', text: '2026 holds endless possibilities for us to explore together.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-yellow-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-right"
          >
            <div className="inline-block">
              <div className="text-3xl text-pink-300 mb-2">
                Forever your bestie,
              </div>
              <div className="text-lg text-gray-400">
                With all my love ❤️
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <Heart className="w-6 h-6 text-pink-400" fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MessageSection;