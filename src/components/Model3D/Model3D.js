import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { LifeModel } from "../LifeModel/LifeModel";

export const Model3D = ({ settings }) => {
  const { amount, timeLived, wallThickness } = settings;
  return (
    <div>
      <Canvas
        style={{
          width: "100%",
          height: window.innerWidth < 900 ? "50vh" : "100vh",
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
        {/* <Stats /> */}
      </Canvas>
    </div>
  );
};
