import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const FinalReveal = () => {
  const [nameInput, setNameInput] = useState('');
  const [showLetter, setShowLetter] = useState(false);
  const [showError, setShowError] = useState(false);
  const [letterLines, setLetterLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);

  const letterContent = [
  "Dear Doraemon,",
  "",
  "Pata hai, life mein kuch cheezein bina planning ke hoti hain...",
  "aur shayad wahi cheezein sabse zyada special ban jaati hain.",
  "",
  "16th September — wo din jab hum pehli baar mile the.",
  "Abhay Bajpayi sir ki wajah se.",
  "Us waqt socha bhi nahi tha ki ek normal si meeting",
  "itni important ban jayegi meri life mein.",
  "",
  "Pehli taxi ride aaj bhi yaad hai mujhe.",
  "Main thoda nervous tha, thodi awkward silence bhi thi,",
  "par uss silence mein bhi kuch alag sa feel ho raha tha.",
  "Jaise kahin na kahin koi naya chapter shuru ho raha ho.",
  "",
  "Phir dheere dheere har meeting hui —",
  "mostly unplanned, unexpected — par har baar perfect.",
  "",
  "Chandrika Devi ke visits,",
  "wo scooty rides jahan hawa bhi thodi alag lagti thi,",
  "bike rides jahan hum sirf ride nahi kar rahe the,",
  "apni baatein, apni duniya bhi saath le ja rahe the.",
  "",
  "Aur wo river ke kinare ke moments...",
  "jahan zyada baatein nahi hoti thi,",
  "par silence bhi bohot kuch keh jaati thi.",
  "",
  "Chats se calls tak ka safar...",
  "phir wo late-night calls,",
  "jahan sab kuch share karna normal lagne laga.",
  "Koi filter nahi, koi dikhawa nahi —",
  "bas tum aur main, jaise hum waise hi the.",
  "",
  "Wo chhoti chhoti cheezein aaj bhi clearly yaad hain:",
  "- Spicy maggie… itni zyada mirch ki meri literally life ki first spicy maggie ban gayi 😅",
  "- Tumhari jhoothi chai… jiska taste aaj bhi yaad hai",
  "- River side photos click karna, bina kisi reason ke",
  "- Ek-dusre ke liye photos lena — har frame mein ek yaad",
  "- Dry fruits aur dry sewayi wala inside joke 😂",
  "",
  "26 December ka din...",
  "Chandrika Devi jaana,",
  "nange pair bina shoes ke chalna,",
  "river ko dhoondhna,",
  "river side baith ke photos lena —",
  "wo sab moments dil mein kahin permanently reh gaye hain.",
  "",
  "Aur 27 December...",
  "bike se jaana, movie dekhna, park mein ghoomna.",
  "Us din main tumhare saath ka har ek moment",
  "dil aur dimaag dono mein capture karna chahta tha —",
  "aur shayad maine kiya bhi.",
  "",
  "Tumhara meri photos click karna,",
  "aur phir wo last moment...",
  "",
  "Honestly, main nahi chahta tha wo pal aaye.",
  "Main time ko rokna chahta tha.",
  "Bas thoda sa aur waqt, bas thodi si aur der tumhare saath.",
  "Par kuch pal hum chah kar bhi nahi rok paate.",
  "",
  "Pata nahi kab feelings dheere dheere badalne lagi.",
  "Kab dosti se zyada kuch feel hone laga.",
  "Main khud bhi thoda confuse tha pehle,",
  "par ab ek clarity hai.",
  "",
  "Doraemon, main tumse kuch kehna chahta hoon...",
  "",
  "Mere paas koi grand gestures nahi hain,",
  "na hi perfect shabdon ka collection.",
  "Par itna zaroor jaanta hoon —",
  "tum mere liye special ho.",
  "",
  "Tumhare saath har moment real lagta hai.",
  "Tumhare saath main khud jaisa reh pata hoon.",
  "Aur tumhare bina kuch thoda adhoora sa lagta hai.",
  "",
  "Mujhe pata hai dosti pe risk lena risky hota hai.",
  "Aur main is cheez ko lightly nahi le raha.",
  "Par main ye risk lena chahta hoon,",
  "kyunki tum worth it ho.",
  "",
  "Koi pressure nahi.",
  "Koi expectations nahi.",
  "Agar tum comfortable nahi ho, toh bilkul theek hai.",
  "Humari friendship hamesha same rahegi — ye mera promise hai.",
  "",
  "Par agar kahin na kahin,",
  "thoda sa bhi lagta hai ki tum bhi kuch feel karti ho,",
  "agar lagta hai ki hum kuch aur ho sakte hain...",
  "",
  "Toh main yahin hoon.",
  "Tumhare saath.",
  "Har step pe.",
  "",
  "I don't know what the future holds,",
  "but I know one thing —",
  "",
  "I would love to walk it with you,",
  "if you choose to.",
  "",
  "— Tumhara dost,",
  "jo shayad thoda zyada feel kar baitha 💫",
  "",
  "P.S. — Decision chahe jo bhi ho, Hum dost humesa rehengey😊"
];

  useEffect(() => {
    if (showLetter && currentLine < letterLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, letterLines[currentLine]?.length > 60 ? 2000 : 1500);
      
      return () => clearTimeout(timer);
    }
  }, [showLetter, currentLine, letterLines]);

  const handleSubmit = () => {
    const trimmedName = nameInput.trim().toLowerCase();
    
    if (trimmedName === 'avni' || 'Avni') {
      setShowError(false);
      setLetterLines(letterContent);
      setShowLetter(true);
      setCurrentLine(0);
    } else if (trimmedName) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (showLetter) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900" />
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.3,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.02,
              }}
            />
          ))}
        </motion.div>

        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="backdrop-blur-xl bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10 space-y-4 text-gray-100 font-light leading-relaxed">
              {letterLines.slice(0, currentLine).map((line, index) => {
                const isDearAvni = line === "Dear Avni,";
                const isSignature = line.startsWith('—');
                const isPS = line.startsWith('P.S.');
                const isSpecialLine = line.includes('I don\'t know what') || line.includes('if you choose to');
                const isEmpty = line === '';
                
                let className = '';
                if (isDearAvni) className = 'text-2xl font-semibold text-pink-300 mb-6';
                else if (isSignature) className = 'text-right text-pink-200 italic mt-8';
                else if (isPS) className = 'text-sm text-gray-400 mt-8';
                else if (isSpecialLine) className = 'text-xl text-center text-purple-200 font-medium';
                else if (isEmpty) className = 'h-2';
                
                const fontFamily = (isDearAvni || isSignature) ? 'cursive' : 'inherit';
                
                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className={className}
                    style={{ fontFamily }}
                  >
                    {line}
                  </motion.p>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
          viewport={{ once: true }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
            animate={{
              textShadow: [
                '0 0 20px rgba(255,184,217,0.5)',
                '0 0 40px rgba(167,139,250,0.8)',
                '0 0 20px rgba(255,184,217,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
              Happy New Year 2026 🎆
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            viewport={{ once: true }}
            className="mt-20 max-w-lg mx-auto"
          >
            <motion.div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <Sparkles className="w-12 h-12 mx-auto text-yellow-300" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">One Last Question...</h3>
              <p className="text-gray-300 mb-6">Enter your best friend's name as saved in your contacts</p>

              <div className="relative">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type the name..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all text-center text-lg"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className="mt-6 w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-2xl"
              >
                Continue to Memory Lane
              </motion.button>

              <AnimatePresence>
                {showError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-purple-500/20 border border-purple-400/30 rounded-xl"
                  >
                    <p className="text-purple-200 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      This story is waiting for someone special 💫
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalReveal;