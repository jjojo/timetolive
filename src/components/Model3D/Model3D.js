import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { LifeModel } from "../LifeModel/LifeModel";

// amount 438 => 80 years in seconds
// amount 31 => 81.6 years in days
// amount 16 => 80 years in weeks
// amount 4 => 80 years in years

export const Model3D = ({ settings }) => {
  const { amount, timeLived, wallThickness } = settings;
  console.log(settings);
  return (
    <div>
      <Canvas
        style={{
          width: "100%",
          height: "500px",
        }}
        camera={{
          fov: 50,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: Math.max(amount * amount * amount, 1000),
          position: [amount * 12, amount * 12, amount * 12],
        }}
      >
        <hemisphereLight
          skyColor={0xffffff}
          groundColor={0x888888}
          position={[0, 1, 0]}
        ></hemisphereLight>
        <LifeModel
          amount={amount}
          timeLived={timeLived}
          wallThickness={wallThickness}
        />
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
};
