import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const SunScene = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={2} color="#FDB813" />
      
      <Sphere ref={sunRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FDB813"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Sun rays */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.8, 0.1, 0.1]} />
            <meshStandardMaterial
              color="#FDB813"
              emissive="#FDB813"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </>
  );
};
