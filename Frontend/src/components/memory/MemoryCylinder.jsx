import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageService from "../../services/imageService";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  { id: 1, title: "Unexpected Beginning", emoji: "✨" },
  { id: 2, title: "Taxi Meet", emoji: "🚕" },
  { id: 3, title: "She Came Back", emoji: "💫" },
  { id: 4, title: "Chandrika Devi", emoji: "🛕" },
  { id: 5, title: "Scooty Rides", emoji: "🛵" },
  { id: 6, title: "Late Night Calls", emoji: "📞" },
  { id: 7, title: "Dry Fruits Wait", emoji: "🥜" },
  { id: 8, title: "Barefoot Faith", emoji: "🌊" },
  { id: 9, title: "Spicy Maggie", emoji: "🍜" },
  { id: 10, title: "That Tea", emoji: "☕" },
  { id: 11, title: "Laughter Echoes", emoji: "😂" },
  { id: 12, title: "Midnight Dreams", emoji: "🌙" },
  { id: 13, title: "Golden Moments", emoji: "✨" },
  { id: 14, title: "Forever Friends", emoji: "👯" },
  { id: 15, title: "Adventures Await", emoji: "🚀" },
];

const radius = 3;

const MemoryCylinder = ({ onSelect }) => {
  const groupRef = useRef();
  const [cloudinaryUrls, setCloudinaryUrls] = useState({});

  // Pre-load Cloudinary URLs on component mount
  useEffect(() => {
    const loadCloudinaryUrls = async () => {
      const urls = {};
      for (const memory of memories) {
        // Load all 15 memories
        const url = await ImageService.getMemoryImageUrl(memory.id);
        if (url) {
          urls[memory.id] = url;
        }
      }
      setCloudinaryUrls(urls);
    };

    loadCloudinaryUrls();
  }, []);

  useEffect(() => {
    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
  }, []);

  useFrame(() => {
    groupRef.current.rotation.y += 0.0008;
  });

  const handleSelect = (memory) => {
    const cloudinaryUrl = cloudinaryUrls[memory.id];
    onSelect({ ...memory, imageUrl: cloudinaryUrl });
  };

  return (
    <group ref={groupRef}>
      {memories.map((memory, index) => {
        const angle = (index / memories.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group
            key={memory.id}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
            onClick={() => handleSelect(memory)}
          >
            <RoundedBox args={[2, 1.2, 0.2]} radius={0.2} smoothness={4}>
              <meshStandardMaterial
                color="#111"
                roughness={0.2}
                metalness={0.8}
              />
            </RoundedBox>

            <Text
              position={[0, 0.1, 0.15]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {memory.title}
            </Text>

            <Text position={[0, -0.3, 0.15]} fontSize={0.5}>
              {memory.emoji}
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default MemoryCylinder;
