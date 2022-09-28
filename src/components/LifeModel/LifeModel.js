import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { beforeCompileShader } from "../../helpers/beforeCompileShader";
import { createInstancedBufferGeometry } from "../../helpers/createInstancedBufferGeometry";
import { SpheresBlock } from "../SpheresBlock/SpheresBlock";

const sphereTexture = new THREE.TextureLoader().load(
  "/timetolive/ball.png",
  (t) => {
    t.center.setScalar(0.5);
    t.rotation = -Math.PI * 0.5;
  }
);

const currentPointMat = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.3,
  transparent: true,
});

currentPointMat.onBeforeCompile = beforeCompileShader;

const radius = 11;

export const LifeModel = ({ amount, timeLived, wallThickness }) => {
  const currentPosition = new Float32Array(3);
  const currentColor = new Float32Array([1, 0, 0]);
  const sizes = new Float32Array(Math.pow(amount, 3)).fill(28);
  let i = 0;

  for (let x = 0; x < amount; x++) {
    if (i > timeLived) break;
    for (let y = 0; y < amount; y++) {
      if (i > timeLived) break;
      for (let z = 0; z < amount; z++) {
        if (i > timeLived) break;
        if (i === timeLived) {
          currentPosition[0] = (amount * radius) / 2 - x * radius;
          currentPosition[1] = (amount * radius) / 2 - y * radius;
          currentPosition[2] = (amount * radius) / 2 - z * radius;
        }
        i++;
      }
    }
  }

  const currentGeometry = createInstancedBufferGeometry({
    positions: currentPosition,
    colors: currentColor,
    sizes,
  });

  useFrame(({ clock }) => {
    // This function runs at the native refresh rate inside of a shared render-loop
    currentPointMat.opacity =
      0.35 * Math.sin(clock.getElapsedTime() * 3) + 0.75;
  });

  return (
    <>
      <points args={[currentGeometry, currentPointMat]} />
      <SpheresBlock
        count={Math.pow(amount, 3)}
        amount={amount}
        timeLived={timeLived}
        wallThickness={wallThickness}
        sphereRadius={11}
      />
    </>
  );
};
