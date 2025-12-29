import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Camera } from "lucide-react";

const MemoryGallery = () => {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const memories = [
    {
      id: 1,
      title: "An Unexpected Beginning",
      description:
        "Humari friendship bilkul unexpected thi. Thanks to Abhay Bajpayi sir, jinke wajah se hum uss special din mile — aur wahi se sab kuch shuru hua.",
      date: "16 September 2024",
      location: "College Campus",
      emoji: "✨",
      color: "from-purple-400 to-indigo-500",
    },
    {
      id: 2,
      title: "Our First Taxi Meet",
      description:
        "Jab aap taxi se ghar ja rahi thi aur humari pehli proper meet hui. Sach bolu to uss din mujhe aap bahut hi achi lagi.",
      date: "October 2024",
      location: "In a Taxi",
      emoji: "🚕",
      color: "from-pink-400 to-rose-500",
    },
    {
      id: 3,
      title: "When You Came Back",
      description:
        "Jab aap wapas ghar se aayi aur hum phir mile. Us moment me hi lag gaya tha ki ye friendship kuch special hone wali hai.",
      date: "29 October 2024",
      location: "Outside Campus",
      emoji: "💫",
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 4,
      title: "Chandrika Devi",
      description:
        "Saath me lunch, hasi–mazaak, aur phir Chandrika Devi mandir jaana. Unplanned tha, par dil ke bahut kareeb.",
      date: "September 2024",
      location: "Chandrika Devi",
      emoji: "🛕",
      color: "from-orange-400 to-amber-500",
    },
    {
      id: 5,
      title: "Scooty Rides & Crazy Moments",
      description:
        "Tumhara scooty chalana aur wo car ke aage cut maarna 😄 Har meeting unexpected thi, par har ek yaad ban gayi.",
      date: "October 2024",
      location: "Lucknow Roads",
      emoji: "🛵",
      color: "from-green-400 to-emerald-500",
    },
    {
      id: 6,
      title: "From Chats to Late Night Calls",
      description:
        "Pehle chats, phir calls, aur phir late night endless baatein. Dheere dheere humne ek dusre se har baat share karna shuru kar diya.",
      date: "Ongoing",
      location: "Everywhere 💙",
      emoji: "📞",
      color: "from-indigo-400 to-purple-500",
    },
    {
      id: 7,
      title: "The Legendary Dry Fruits Wait",
      description:
        "Aur haan 😌 — main abhi bhi mere dry fruits aur dry wali sewayi ka wait kar raha hoon… jiske liye main tumhe hamesha chidta hoon ❤️",
      date: "Still Waiting 😜",
      location: "Inside Jokes",
      emoji: "🥜",
      color: "from-yellow-400 to-orange-500",
    },
    {
  id: 8,
  title: "Chandrika Devi – Barefoot & Beyond",
  description:
    "26 December ko hum phir Chandrika Devi gaye. Nange pair, bina shoes ke, sirf faith aur saath. Tumhare saath river ko dhoondhna, river side photos click karna — har cheez simple thi, par bahut special thi.",
  date: "26 December 2024",
  location: "Chandrika Devi & Riverside",
  emoji: "🌊",
  color: "from-sky-400 to-blue-600"
},
{
  id: 9,
  title: "The Spiciest Maggie Ever",
  description:
    "Spicy maggie — itni mirch ki literally life ki first real spicy cheez thi 😭 Tumhari wajah se first time khayiii. Wha to mujhe mirch nikalte-nikalte bhi hasi aa rahi thi. But wha vo maggie khane ka bhi alg mza tha",
  date: "26 December 2024",
  location: "Riverside",
  emoji: "🍜",
  color: "from-red-400 to-orange-500"
},
{
  id: 10,
  title: "That Cup of Tea ☕",
  description:
    "Aur haan… tumhari jhoothi chai peena. Chhoti si baat thi, par us moment ki warmth alag hi thi.",
  date: "26 December 2024",
  location: "Quiet Corner",
  emoji: "☕",
  color: "from-amber-400 to-yellow-500"
},
{
  id: 11,
  title: "Bike Ride & Movie Day",
  description:
    "27 December — bike se jaana, movie dekhna, aur phir park me ghoomna. Uss din main tumhare saath ka har ek moment capture karna chahta tha… aur maine kiya bhi.",
  date: "27 December 2024",
  location: "City Ride & Park",
  emoji: "🏍️",
  color: "from-green-400 to-emerald-600"
},
{
  id: 12,
  title: "Frames We Captured Together",
  description:
    "Tumhara meri photos click karna, mai us din har ek moment capture karna chahta tha. Har photo ke peeche ek feeling thi — ek pal jo sirf humara tha.",
  date: "27 December 2024",
  location: "Park",
  emoji: "📸",
  color: "from-violet-400 to-purple-600"
},
{
  id: 13,
  title: "The Moment I Wanted to Pause Time",
  description:
    "Aakhri wo pal… jise main kabhi aane dena nahi chahta tha. Main har second ko rokna chahta tha jisme tum mere saath thi. Bas sochta raha ki kaash thoda aur time mil jaye… par wo pal aa hi gaya jab tumhe jaana tha.",
  date: "27 December 2024",
  location: "Unsaid Feelings",
  emoji: "🕊️",
  color: "from-gray-400 to-slate-600"
}

  ];

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Our Beautiful Memories
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Every moment with you is a treasure. Click any memory to relive it
            in full glory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              viewport={{ once: true }}
              onClick={() => setSelectedMemory(memory)}
              className="backdrop-blur-xl bg-white/10 rounded-3xl overflow-hidden border border-white/20 cursor-pointer group relative"
            >
              <div
                className={`h-64 bg-gradient-to-br ${memory.color} flex items-center justify-center relative overflow-hidden`}
              >
                <motion.div
                  className="text-8xl"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {memory.emoji}
                </motion.div>

                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {memory.title}
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {memory.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{memory.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate max-w-[120px]">
                      {memory.location}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.2, rotate: 180 }}
              >
                <Camera className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Memory Detail Modal */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 max-w-2xl w-full"
              >
                <div
                  className={`h-96 bg-gradient-to-br ${selectedMemory.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <div className="text-9xl">{selectedMemory.emoji}</div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {selectedMemory.title}
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  {selectedMemory.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedMemory.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedMemory.location}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MemoryGallery;
