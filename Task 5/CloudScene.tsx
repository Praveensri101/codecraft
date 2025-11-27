import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cloud } from '@react-three/drei';
import * as THREE from 'three';

export const CloudScene = () => {
  const cloudGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudGroupRef.current) {
      cloudGroupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      
      <group ref={cloudGroupRef}>
        <Cloud
          position={[-2, 1, -2]}
          speed={0.2}
          opacity={0.8}
          color="#B8C6DB"
        />
        <Cloud
          position={[2, 0.5, -1]}
          speed={0.3}
          opacity={0.7}
          color="#A8B8C8"
        />
        <Cloud
          position={[0, -0.5, -3]}
          speed={0.25}
          opacity={0.6}
          color="#98A8B8"
        />
      </group>
    </>
  );
};
