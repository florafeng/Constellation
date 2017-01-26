'use strict';

var Cubemap = function (cameraCube) {
  let sceneCube = new THREE.Scene();
  console.log("finished building scene");
  // let cameraCube = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
  let path = 'javascript/webgl-frameworks/cubemap/cm';
  let format = '.jpg';
  let urls = [
    path + format, path + format,
    path + format, path + format,
    path + format, path + format
  ];
  let textureCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);
  let shader = THREE.ShaderLib.cube;
  shader.uniforms.tCube.value = textureCube;

  let material = new THREE.ShaderMaterial({

      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      depthWrite: false,
      side: THREE.BackSide

    }),

  mesh = new THREE.Mesh(new THREE.CubeGeometry(1000000, 1000000, 1000000), material);
  sceneCube.add(mesh);
  console.log("finished adding cube map");
  return sceneCube;
};
