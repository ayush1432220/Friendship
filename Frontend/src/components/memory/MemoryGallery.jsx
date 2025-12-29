import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import MemoryCylinder from "./MemoryCylinder";
import MemoryModal from "./MemoryModal";

gsap.registerPlugin(ScrollTrigger);

const MemoryGallery = () => {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section className="h-screen w-full bg-black relative overflow-hidden">
      {/* Title */}
      <div className="absolute top-12 w-full text-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Our Memories ✨
        </h1>
        <p className="text-gray-400 mt-4">
          Scroll to travel through moments
        </p>
      </div>

      {/* 3D Scene */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <MemoryCylinder onSelect={setActiveMemory} />
      </Canvas>

      {/* Modal */}
      <MemoryModal
        memory={activeMemory}
        onClose={() => setActiveMemory(null)}
      />
    </section>
  );
};

export default MemoryGallery;
