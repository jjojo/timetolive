import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { LifeModel } from "../LifeModel/LifeModel";

export const Model3D = () => {
  return (
    <Canvas
      style={{ border: "1px solid blue" }}
      camera={{
        fov: 15,
        aspect: window.innerWidth / window.innerHeight,
        near: 2,
        far: 5000,
        position: [1500, 1500, 1500],
      }}
    >
      <perspectiveCamera
        fov={15}
        aspect={window.innerWidth / window.innerHeight}
        near={2}
        far={5000}
        lookAt={[0, 0, 0]}
        position={[10, 10, 10]}
      ></perspectiveCamera>
      <hemisphereLight
        skyColor={0xffffff}
        groundColor={0x888888}
        position={[0, 1, 0]}
      ></hemisphereLight>
      <LifeModel />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
};
