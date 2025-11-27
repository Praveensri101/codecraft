import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { SunScene } from './SunScene';
import { CloudScene } from './CloudScene';
import { RainScene } from './RainScene';
import { SnowScene } from './SnowScene';
import { Suspense } from 'react';

interface WeatherSceneProps {
  condition: string;
}

export const WeatherScene = ({ condition }: WeatherSceneProps) => {
  const getScene = () => {
    const conditionLower = condition.toLowerCase();
    
    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return <SunScene />;
    } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <RainScene />;
    } else if (conditionLower.includes('snow')) {
      return <SnowScene />;
    } else if (conditionLower.includes('cloud')) {
      return <CloudScene />;
    }
    return <CloudScene />;
  };

  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          {getScene()}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
