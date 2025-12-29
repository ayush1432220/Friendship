import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffb8d9, #d8b4fe, #a78bfa, #ffb8d9)',
              backgroundSize: '200% auto',
            }}
            animate={{ 
              backgroundPosition: ['0%', '200%'],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            ✨ Happy New Year 2026 ✨
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl md:text-4xl text-white/90 mb-8"
          >
            To my <span className="text-pink-300 font-bold">bestie</span> 💖
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
            className="inline-block backdrop-blur-xl bg-white/10 px-8 py-4 rounded-2xl border border-white/20"
          >
            <p className="text-lg md:text-xl text-gray-100 flex items-center justify-center gap-3 flex-wrap">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              A year of magical memories begins...
              <Heart className="w-5 h-5 text-pink-400" fill="currentColor" />
            </p>
          </motion.div>

          <div className="mt-16 flex justify-center gap-8 flex-wrap">
            {['🎉', '🎊', '🥳', '🎆', '✨'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-6xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;