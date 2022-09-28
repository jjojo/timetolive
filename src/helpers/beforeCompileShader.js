export const beforeCompileShader = (shader) => {
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
