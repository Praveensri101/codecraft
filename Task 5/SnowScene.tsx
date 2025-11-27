import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SnowScene = () => {
  const snowRef = useRef<THREE.Points>(null);
  
  const snowParticles = useMemo(() => {
    const particles = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      particles[i * 3] = (Math.random() - 0.5) * 20;
      particles[i * 3 + 1] = Math.random() * 20 - 5;
      particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return particles;
  }, []);

  useFrame((state) => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 1500; i++) {
        positions[i * 3 + 1] -= 0.02;
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.01;
        
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 15;
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#E0F7FF" />
      
      <points ref={snowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={snowParticles.length / 3}
            array={snowParticles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#FFFFFF"
          transparent
          opacity={0.9}
        />
      </points>
    </>
  );
};
