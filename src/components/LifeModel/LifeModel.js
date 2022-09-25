import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const dateOfBirth = new Date(1992, 6, 9);

const daysLived = Math.round(
  new Date(new Date().getTime() - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24)
);

console.log(daysLived);

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
const pointsMatTransparent = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.1,
  transparent: true,
  opacity: 0.3,
});
const pointsMat = new THREE.PointsMaterial({
  map: sphereTexture,
  vertexColors: true,
  alphaTest: 0.5,
  transparent: false,
});

const beforeCompileShader = (shader) => {
  shader.vertexShader =
    `
  	attribute float sizes;
    attribute vec3 offset;
  ` + shader.vertexShader;

  shader.vertexShader = shader.vertexShader.replace(
    `#include <begin_vertex>`,
    `#include <begin_vertex>
    transformed += offset;
    `
  );
  shader.vertexShader = shader.vertexShader.replace(
    `gl_PointSize = size;`,
    `gl_PointSize = size * sizes;`
  );
};

pointsMat.onBeforeCompile = beforeCompileShader;
pointsMatTransparent.onBeforeCompile = beforeCompileShader;
currentPointMat.onBeforeCompile = beforeCompileShader;

const radius = 11;
const createPosSetter =
  (n, r = radius) =>
  (array, i, x, y, z) => {
    array[i * 3] = (n * r) / 2 - x * r;
    array[i * 3 + 1] = (n * r) / 2 - y * r;
    array[i * 3 + 2] = (n * r) / 2 - z * r;
    return array;
  };

const createGeometry = ({ positions, colors, sizes }) => {
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("sizes", new THREE.BufferAttribute(sizes, 1));
  const sumDisp = new Float32Array([0, 0, 0]);
  geometry.setAttribute(
    "offset",
    new THREE.InstancedBufferAttribute(sumDisp, 3)
  );
  return geometry;
};

export const LifeModel = ({ amount, count }) => {
  const setPos = createPosSetter(amount);

  const transparentSpheresPos = new Float32Array(count * 3);
  let positions = [];
  const currentPosition = new Float32Array(3);
  const colors = new Float32Array(count * 3);
  const transparentColor = new Float32Array(count * 3).fill(1);
  const currentColor = new Float32Array([1, 0, 0]);
  const sizes = new Float32Array(count).fill(28);
  const spherePadding = 5;
  let i = 0;
  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        if (i > daysLived) {
          if (
            !(
              i >
                (amount - spherePadding) * amount * 2 +
                  spherePadding +
                  daysLived &&
              i < count - amount * amount * spherePadding + 1 &&
              i % amount > spherePadding - 1 &&
              (i + spherePadding) % amount > spherePadding - 1 &&
              i % (amount * amount) > amount * spherePadding &&
              (i + amount * spherePadding) % (amount * amount) > amount * 2
            )
          ) {
            // setPos(positions, i, x, y, z);
            positions.push(
              (amount * 11) / 2 - x * 11,
              (amount * 11) / 2 - y * 11,
              (amount * 11) / 2 - z * 11
            );
          }
        } else if (i === daysLived) {
          currentPosition[0] = (amount * radius) / 2 - x * radius;
          currentPosition[1] = (amount * radius) / 2 - y * radius;
          currentPosition[2] = (amount * radius) / 2 - z * radius;
        } else {
          setPos(transparentSpheresPos, i, x, y, z);
        }

        if (
          i >
            (amount - spherePadding) * amount * 2 + spherePadding + daysLived &&
          i < count - amount * amount * spherePadding + 1 &&
          i % amount > spherePadding - 1 &&
          (i + spherePadding) % amount > spherePadding - 1 &&
          i % (amount * amount) > amount * spherePadding &&
          (i + amount * spherePadding) % (amount * amount) > amount * 2
        ) {
          colors[i * 3 + 0] = Math.random();
          colors[i * 3 + 1] = Math.random();
          colors[i * 3 + 2] = Math.random();
        } else {
          colors[i * 3 + 0] = 1;
          colors[i * 3 + 1] = 1;
          colors[i * 3 + 2] = 1;
        }
        i++;
      }
    }
  }

  const currentGeometry = createGeometry({
    positions: currentPosition,
    colors: currentColor,
    sizes,
  });
  console.log(positions);
  const geometry = createGeometry({
    positions: new Float32Array(positions),
    colors: colors,
    sizes,
  });

  const transparentGeometry = createGeometry({
    positions: transparentSpheresPos,
    colors: transparentColor,
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
      <points args={[transparentGeometry, pointsMatTransparent]} />
      <points args={[geometry, pointsMat]} />
    </>
  );
};
