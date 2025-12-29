import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";
import AuthService from "../services/authService";
import AnimatedBackground from "../components/AnimatedBackground";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (isLocked) {
      setError("Too many failed attempts. Please wait 30 seconds.");
      return;
    }

    if (!username || !password) {
      setError("Please enter both username and password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsLoading(true);
    setError("");

    // Call backend API to verify credentials
    const result = await AuthService.login(username, password);

    if (result.success) {
      onLogin();
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLocked(true);
        setError("Account temporarily locked. Wait 30 seconds.");
        setTimeout(() => {
          setIsLocked(false);
          setLoginAttempts(0);
        }, 30000);
      } else {
        setError(`${result.message} ${3 - newAttempts} attempts remaining.`);
      }

      setShake(true);
      setTimeout(() => setShake(false), 500);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <motion.div
        initial={{ scale: 0, opacity: 0, rotateY: 180 }}
        animate={{
          scale: shake ? [1, 0.95, 1.05, 0.95, 1] : 1,
          opacity: 1,
          rotateY: 0,
          x: shake ? [-10, 10, -10, 10, 0] : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Background and Decorations are handled in CSS/Framer */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "linear-gradient(0deg, rgba(255,184,217,0.3), transparent)",
                  "linear-gradient(90deg, rgba(167,139,250,0.3), transparent)",
                  "linear-gradient(180deg, rgba(255,215,0,0.3), transparent)",
                  "linear-gradient(270deg, rgba(255,184,217,0.3), transparent)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 184, 217, 0.5)",
                    "0 0 40px rgba(167, 139, 250, 0.8)",
                    "0 0 20px rgba(255, 184, 217, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center relative"
              >
                <Lock className="w-10 h-10 text-white" />

                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: "50%", left: "50%" }}
                    animate={{
                      x: [0, Math.cos((i * Math.PI) / 2) * 40],
                      y: [0, Math.sin((i * Math.PI) / 2) * 40],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-pink-400/40 rounded-full"
                style={{ padding: "4px" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Shield className="w-8 h-8 text-yellow-300" />
              Secure Access
            </h1>
            <p className="text-gray-200 text-sm">
              Enter credentials to view your special wishes
            </p>
          </motion.div>

          <div className="space-y-6" onKeyDown={handleKeyDown}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-pink-400 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all backdrop-blur-sm"
                  placeholder="Your name on My Phone"
                  disabled={isLocked}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-pink-400 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all backdrop-blur-sm"
                  placeholder="3 Special Dates in Increasing Order"
                  disabled={isLocked}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm text-center backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 40px rgba(255, 184, 217, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading || isLocked}
              className="w-full py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group"
              style={{ backgroundSize: "200% 100%" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />

              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span className="relative z-10">Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Login to Continue</span>
                  <Sparkles className="w-5 h-5 relative z-10" />
                </>
              )}
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center space-y-2"
          >
            <p className="text-xs text-gray-300 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Your session is secure and encrypted
            </p>
            <p className="text-xs text-gray-400">
              Session expires after 24 hours
            </p>
          </motion.div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />
      </motion.div>
    </div>
  );
};

export default LoginPage;
