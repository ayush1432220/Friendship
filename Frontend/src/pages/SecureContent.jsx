import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, CheckCircle } from "lucide-react";
import AnimatedBackground from "../components/AnimatedBackground";
import Navigation from "../components/Navigation";
import AudioController from "../components/AudioController";
import HeroSection from "../components/sections/HeroSection";
import MemoryGallery from "../components/sections/MemoryGallery";
import MessageSection from "../components/sections/MessageSection";
import FinalReveal from "../components/sections/FinalReveal";

const SecureContent = ({ onLogout }) => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newSection = Math.round(scrollPosition / windowHeight);
      setCurrentSection(newSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <AnimatedBackground />

      <Navigation
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLogout}
        className="fixed top-6 right-6 z-50 px-4 py-2 backdrop-blur-xl bg-white/10 rounded-full flex items-center gap-2 border border-white/20 hover:border-pink-400/50 transition-all group"
      >
        <LogOut className="w-4 h-4 text-gray-300 group-hover:text-pink-400 transition-colors" />
        <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
          Logout
        </span>
      </motion.button>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5 }}
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
      >
        <CheckCircle className="w-32 h-32 text-green-400" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10"
      >
        <HeroSection />
        <MemoryGallery />
        <MessageSection />
        <FinalReveal />
      </motion.div>

      <AudioController />
    </div>
  );
};

export default SecureContent;
