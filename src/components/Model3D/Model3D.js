import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { LifeModel } from "../LifeModel/LifeModel";
import { useState } from "react";

// const AMOUNT = 100;
// const COUNT = Math.pow(AMOUNT, 3);

// amount 438 => 80 years in seconds
// amount 31 => 81.6 years in days
// amount 16 => 80 years in weeks
// amount 4 => 80 years in years

export const Model3D = () => {
  const [amount, setAmount] = useState(31);
  const [count, setCount] = useState(Math.pow(amount, 3));

  return (
    <Canvas
      style={{ border: "1px solid blue" }}
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
      <LifeModel amount={amount} count={count} />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};
