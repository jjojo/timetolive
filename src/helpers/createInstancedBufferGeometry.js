import * as THREE from "three";

export const createInstancedBufferGeometry = ({ positions, colors, sizes }) => {
  const geometry = new THREE.InstancedBufferGeometry();

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  if (colors)
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("sizes", new THREE.BufferAttribute(sizes, 1));
  const sumDisp = new Float32Array([0, 0, 0]);
  geometry.setAttribute(
    "offset",
    new THREE.InstancedBufferAttribute(sumDisp, 3)
  );
  return geometry;
};
