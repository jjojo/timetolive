import * as THREE from "three";
import { beforeCompileShader } from "../../helpers/beforeCompileShader";
import { createInstancedBufferGeometry } from "../../helpers/createInstancedBufferGeometry";

const sphereTexture = new THREE.TextureLoader().load("/ball.png", (t) => {
  t.center.setScalar(0.5);
  t.rotation = -Math.PI * 0.5;
});

const pointsMat = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.5,
  transparent: false,
});

const pointsMatTransparent = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.1,
  transparent: true,
  opacity: 0.3,
});

pointsMat.onBeforeCompile = beforeCompileShader;
pointsMatTransparent.onBeforeCompile = beforeCompileShader;

export const SpheresBlock = ({
  count,
  amount,
  timeLived,
  wallThickness = 2,
  sphereRadius,
}) => {
  let i = 0;
  let positions = [];
  //   let colors = [];
  let transparentPositions = [];

  const hollowCondition = (i) =>
    i > (amount - wallThickness) * (amount * wallThickness) + timeLived &&
    i + amount * amount * wallThickness < count &&
    i % amount > wallThickness - 1 &&
    (i + wallThickness) % amount > wallThickness - 1 &&
    i % (amount * amount) > amount * wallThickness &&
    (i + amount * wallThickness) % (amount * amount) > amount * wallThickness;

  const hollowCondition2 = (i) =>
    i > amount * amount * wallThickness &&
    i + amount * amount * wallThickness <
      timeLived - (timeLived % (amount * amount)) &&
    i % amount > wallThickness - 1 &&
    (i + wallThickness) % amount > wallThickness - 1 &&
    i % (amount * amount) > amount * wallThickness &&
    (i + amount * wallThickness) % (amount * amount) > amount * wallThickness;

  const calcPositions = (x, y, z) => [
    (amount * sphereRadius) / 2 - x * sphereRadius,
    (amount * sphereRadius) / 2 - y * sphereRadius,
    (amount * sphereRadius) / 2 - z * sphereRadius,
  ];

  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        if (i > timeLived && !hollowCondition(i)) {
          positions.push(...calcPositions(x, y, z));
        } else if (i < timeLived && !hollowCondition2(i)) {
          transparentPositions.push(...calcPositions(x, y, z));
        }
        i++;
      }
    }
  }

  const geometry = createInstancedBufferGeometry({
    positions: new Float32Array(positions),
    colors: new Float32Array(positions.length).fill(1),
    sizes: new Float32Array(positions.length).fill(28),
  });
  const transparentGeometry = createInstancedBufferGeometry({
    positions: new Float32Array(transparentPositions),
    colors: new Float32Array(transparentPositions.length).fill(1),
    sizes: new Float32Array(transparentPositions.length).fill(28),
  });

  return (
    <>
      <points args={[transparentGeometry, pointsMatTransparent]} />;
      <points args={[geometry, pointsMat]} />;
    </>
  );
};
