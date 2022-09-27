import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { beforeCompileShader } from "../../helpers/beforeCompileShader";
import { createInstancedBufferGeometry } from "../../helpers/createInstancedBufferGeometry";
import { SpheresBlock } from "../SpheresBlock/SpheresBlock";

const dateOfBirth = new Date(1992, 6, 9);

let daysLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24)
);

// daysLived = yearsLived;

// console.log(yearsLived);

const sphereTexture = new THREE.TextureLoader().load("/ball.png", (t) => {
  t.center.setScalar(0.5);
  t.rotation = -Math.PI * 0.5;
});

const currentPointMat = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.3,
  transparent: true,
});

currentPointMat.onBeforeCompile = beforeCompileShader;

const radius = 11;

export const LifeModel = ({ amount, count }) => {
  const currentPosition = new Float32Array(3);
  const currentColor = new Float32Array([1, 0, 0]);
  const sizes = new Float32Array(count).fill(28);
  let i = 0;

  for (let x = 0; x < amount; x++) {
    if (i > daysLived) break;
    for (let y = 0; y < amount; y++) {
      if (i > daysLived) break;
      for (let z = 0; z < amount; z++) {
        if (i > daysLived) break;
        if (i === daysLived) {
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
        count={count}
        amount={amount}
        timeLived={daysLived}
        wallThickness={2}
        sphereRadius={11}
      />
    </>
  );
};
