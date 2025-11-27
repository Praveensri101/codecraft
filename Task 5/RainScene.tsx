import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RainScene = () => {
  const rainRef = useRef<THREE.Points>(null);
  
  const rainParticles = useMemo(() => {
    const particles = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      particles[i * 3] = (Math.random() - 0.5) * 20;
      particles[i * 3 + 1] = Math.random() * 20 - 5;
      particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return particles;
  }, []);

  useFrame(() => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 2000; i++) {
        positions[i * 3 + 1] -= 0.1;
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 15;
        }
      }
      rainRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#4A90E2" />
      
      <points ref={rainRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={rainParticles.length / 3}
            array={rainParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#6BA3D4"
          transparent
          opacity={0.6}
        />
      </points>
    </>
  );
};
