import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  Pause,
  Play,
  SkipForward,
  SkipBack,
  ListMusic,
  X,
  Maximize2
} from 'lucide-react';

// Import your specific audio files
import Aashiqui from '../assets/musics/Aashiqui.mp3';
import Dhun from '../assets/musics/Dhun.mp3';
import Dil from '../assets/musics/Dil.mp3';
import Kaun from '../assets/musics/Kaun.mp3';
import Kuch from '../assets/musics/Kuch.mp3';
import Rahat from '../assets/musics/Rahat.mp3';
import Sanam from '../assets/musics/Sanam.mp3';
import Shaamat from '../assets/musics/Shaamat.mp3';
import Shiddat from '../assets/musics/Shiddat.mp3'; 

const AudioController = () => {
  // --- State ---
  const [isMinimized, setIsMinimized] = useState(true); // Default to minimized state
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // --- Refs ---
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);
  const sourceRef = useRef(null);

  // --- Playlist Configuration ---
  const PLAYLIST = [
    { title: "Aashiqui aa gyi", artist: "For You", src: Aashiqui, color: "#ffb8d9" },
    { title: "Dhun Saiyara", artist: "Us", src: Dhun, color: "#d8b4fe" },
    { title: "Heartbeats", artist: "Forever", src: Dil, color: "#a78bfa" },
    { title: "Kaun Tujhe", artist: "Always", src: Kaun, color: "#818cf8" },
    { title: "Kuch batein hai", artist: "You & Me", src: Kuch, color: "#2dd4bf" },
    { title: "Ishq-E-Jaan", artist: "Bond", src: Rahat, color: "#fbbf24" },
    { title: "Sanam Teri Kasam", artist: "Moments", src: Sanam, color: "#f472b6" },
    { title: "Shaamat", artist: "Fate", src: Shaamat, color: "#fb7185" },
    { title: "Shiddat", artist: "Your Favorite", src: Shiddat, color: "#c084fc" },
  ];

  const currentTrack = PLAYLIST[currentTrackIndex];

  // --- Scroll Detection Logic ---
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // If player is open, minimize it on scroll
      if (!isMinimized) {
        setIsMinimized(true);
        setIsPlaylistOpen(false); // Close playlist when minimizing
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMinimized]);

  // --- Audio Context & Visualizer Setup ---
  const initializeAudioContext = useCallback(() => {
    if (audioContextRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    
    if (audioRef.current) {
      if (!sourceRef.current) {
         sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
         sourceRef.current.connect(analyserRef.current);
         analyserRef.current.connect(audioContextRef.current.destination);
      }
    }
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);
  }, []);

  // --- Draw Visualizer ---
  const drawVisualizer = useCallback(() => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const draw = () => {
      if (!isPlaying) {
        cancelAnimationFrame(animationFrameRef.current);
        return;
      }
      animationFrameRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / dataArrayRef.current.length) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        barHeight = (dataArrayRef.current[i] / 255) * height;
        ctx.fillStyle = currentTrack.color;
        ctx.beginPath();
        ctx.roundRect(x, height - barHeight, barWidth, barHeight, 2);
        ctx.fill();
        x += barWidth + 1;
      }
    };
    draw();
  }, [isPlaying, currentTrack.color]);

  // --- Handlers ---
  const togglePlay = async (e) => {
    e?.stopPropagation(); // Prevent click from bubbling if needed
    if (!audioContextRef.current) initializeAudioContext();
    if (audioContextRef.current?.state === 'suspended') await audioContextRef.current.resume();
    
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = clickPosition / width;
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // --- Effects ---
  useEffect(() => {
    if (isPlaying && !isPlaylistOpen && !isMinimized) drawVisualizer();
    else if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    return () => { if(animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [isPlaying, isPlaylistOpen, drawVisualizer, isMinimized]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) playPromise.catch(console.error);
    }
  }, [currentTrackIndex]);

  // --- Render ---
  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => handleTrackChange((currentTrackIndex + 1) % PLAYLIST.length)}
      />

      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Floating Button (Left Side) */
          <motion.div
            key="minimized"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed bottom-8 left-8 z-50"
          >
            <motion.button
              onClick={() => setIsMinimized(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg overflow-hidden"
            >
              {/* Spinning border effect when playing */}
              {isPlaying && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-400 border-r-purple-400"
                />
              )}
              
              {/* Album Art / Icon */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center relative z-10"
                style={{ backgroundColor: isPlaying ? currentTrack.color : '#4b5563' }}
              >
                {isPlaying ? (
                  <Music className="w-5 h-5 text-white animate-pulse" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-1" />
                )}
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isPlaying ? "Click to Expand" : "Play Music"}
              </div>
            </motion.button>
          </motion.div>
        ) : (
          /* Expanded Player (Center Bottom) */
          <motion.div
            key="expanded"
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            {/* Visualizer Canvas */}
            <motion.div 
              animate={{ opacity: isPlaying ? 1 : 0, y: isPlaying ? 0 : 20 }}
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 pointer-events-none"
            >
              <canvas ref={canvasRef} width={200} height={50} className="rounded-xl" />
            </motion.div>

            {/* Main Controller Card */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-20 transition-colors duration-700" style={{ backgroundColor: currentTrack.color }} />

              <div className="p-4 relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                          <motion.div
                              animate={{ rotate: isPlaying ? 360 : 0 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0"
                          >
                              <Music className="w-5 h-5 text-white" />
                          </motion.div>
                          <div className="min-w-0">
                              <h3 className="text-white font-bold truncate text-sm">{currentTrack.title}</h3>
                              <p className="text-white/60 text-xs truncate">{currentTrack.artist}</p>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                            className={`p-2 rounded-full transition-colors ${isPlaylistOpen ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}
                        >
                            {isPlaylistOpen ? <X className="w-5 h-5"/> : <ListMusic className="w-5 h-5" />}
                        </button>
                        <button 
                            onClick={() => setIsMinimized(true)}
                            className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                      </div>
                  </div>

                  {/* Playlist Drawer */}
                  <AnimatePresence>
                      {isPlaylistOpen && (
                          <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mb-4 bg-black/20 rounded-xl"
                          >
                              <div className="p-2 max-h-40 overflow-y-auto custom-scrollbar">
                                  {PLAYLIST.map((track, idx) => (
                                      <button
                                          key={idx}
                                          onClick={() => handleTrackChange(idx)}
                                          className={`w-full flex items-center gap-3 p-2 rounded-lg text-sm mb-1 transition-colors ${
                                              currentTrackIndex === idx ? 'bg-white/20 text-white' : 'text-white/60 hover:bg-white/10'
                                          }`}
                                      >
                                          <span className="text-xs w-4">{idx + 1}</span>
                                          <div className="text-left flex-1 truncate">{track.title}</div>
                                          {currentTrackIndex === idx && <Sparkles className="w-3 h-3 text-yellow-300" />}
                                      </button>
                                  ))}
                              </div>
                          </motion.div>
                      )}
                  </AnimatePresence>

                  {/* Progress Bar */}
                  <div className="mb-2 group cursor-pointer" onClick={handleProgressClick}>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                              className="h-full bg-gradient-to-r from-pink-400 to-purple-400"
                              style={{ width: `${progress}%` }}
                          />
                      </div>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40 font-mono mb-4">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between">
                      {/* Volume Controls */}
                      <div className="flex items-center gap-2 group">
                          <button onClick={() => setIsMuted(!isMuted)} className="text-white/60 hover:text-white">
                              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                          </button>
                          <input 
                              type="range" min="0" max="1" step="0.01"
                              value={isMuted ? 0 : volume}
                              onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                              className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                      </div>

                      {/* Main Transport */}
                      <div className="flex items-center gap-4">
                          <button onClick={() => handleTrackChange((currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length)} className="text-white/60 hover:text-white hover:scale-110 transition-transform">
                              <SkipBack className="w-5 h-5" />
                          </button>
                          <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={togglePlay}
                              className="w-12 h-12 rounded-full bg-white text-purple-900 flex items-center justify-center hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
                          >
                              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                          </motion.button>
                          <button onClick={() => handleTrackChange((currentTrackIndex + 1) % PLAYLIST.length)} className="text-white/60 hover:text-white hover:scale-110 transition-transform">
                              <SkipForward className="w-5 h-5" />
                          </button>
                      </div>
                      <div className="w-20" /> {/* Spacer */}
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AudioController;