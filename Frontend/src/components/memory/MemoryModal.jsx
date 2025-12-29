import { motion, AnimatePresence } from "framer-motion";

const MemoryModal = ({ memory, onClose }) => {
  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white/10 border border-white/20 rounded-3xl p-10 max-w-xl text-center overflow-hidden"
          >
            {/* Display Cloudinary image if available */}
            {memory.imageUrl && (
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
            )}

            <div className="text-7xl mb-4">{memory.emoji}</div>
            <h2 className="text-4xl text-white font-bold mb-4">
              {memory.title}
            </h2>
            <p className="text-gray-300">
              This moment will always stay close to my heart 🤍
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemoryModal;
