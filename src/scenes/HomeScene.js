/**
 * HomeScene.js
 * Cena 3D estática da página inicial — sala de aula de entrada.
 * Usa apenas o que é necessário: sem physics engine completa,
 * câmera fixa sem controles (decorativa).
 */

const ASSET_BASE = '/img_escola/';

export function initHomeScene(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof BABYLON === 'undefined') return;

  const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true });

  const scene = createScene(engine, canvas);

  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return { engine, scene };
}

function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.collisionsEnabled = true;

  // Iluminação
  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const ceilingLight = new BABYLON.HemisphericLight('ceilingLight', new BABYLON.Vector3(0, -1, 0), scene);
  ceilingLight.intensity = 0.5;

  // Ambiente HDRI
  const hdrTexture = new BABYLON.CubeTexture('https://www.babylonjs-playground.com/textures/environment.dds', scene);
  scene.environmentTexture = hdrTexture;

  // Câmera fixa (decorativa — sem controles)
  const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0.4, -2.2), scene);
  camera.fov = 0.8;

  buildRoom(scene);
  loadModels(scene);

  return scene;
}

function buildRoom(scene) {
  // Materiais
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}chao.jpg`, scene);
  groundMat.diffuseTexture.uScale = 6.5;
  groundMat.diffuseTexture.vScale = 6.5;

  const wallMat = new BABYLON.StandardMaterial('wallMat', scene);
  wallMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}textura_parede.jpg`, scene);

  const ceilingMat = new BABYLON.StandardMaterial('ceilingMat', scene);
  ceilingMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}teto.jpg`, scene);
  ceilingMat.diffuseTexture.uScale = 20;
  ceilingMat.diffuseTexture.vScale = 20;

  // Chão
  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
  ground.material = groundMat;
  ground.checkCollisions = true;

  // Paredes
  const wallConfigs = [
    { name: 'leftWall',  w: 0.1, h: 3.5, d: 10, x: -5,  y: 1, z: 0   },
    { name: 'rightWall', w: 0.1, h: 3.5, d: 10, x:  5,  y: 1, z: 0   },
    { name: 'backWall',  w: 10,  h: 3.5, d: 0.1, x: 0,  y: 1, z:  5  },
    { name: 'frontWall', w: 10,  h: 3.5, d: 0.1, x: 0,  y: 1, z: -5  },
  ];

  wallConfigs.forEach(({ name, w, h, d, x, y, z }) => {
    const wall = BABYLON.MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, scene);
    wall.position.set(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
  });

  // Janelas decorativas
  const windowConfigs = [
    { name: 'w0', tex: `${ASSET_BASE}janela.jpg`,  x:    0, y: 1.5, z: 4.9 },
    { name: 'w1', tex: `${ASSET_BASE}janela1.jpg`, x: -2.5, y: 1.5, z: 4.9 },
    { name: 'w2', tex: `${ASSET_BASE}janela2.jpg`, x:  2.5, y: 1.5, z: 4.9 },
  ];

  windowConfigs.forEach(({ name, tex, x, y, z }) => {
    const mat = new BABYLON.StandardMaterial(`${name}Mat`, scene);
    mat.diffuseTexture = new BABYLON.Texture(tex, scene);
    const mesh = BABYLON.MeshBuilder.CreatePlane(name, { width: 2, height: 2 }, scene);
    mesh.position.set(x, y, z);
    mesh.material = mat;
  });

  // Teto
  const ceiling = BABYLON.MeshBuilder.CreateBox('ceiling', { width: 10, height: 0.1, depth: 10 }, scene);
  ceiling.position.y = 2.7;
  ceiling.material = ceilingMat;
  ceiling.checkCollisions = true;
}

function loadModels(scene) {
  const models = [
    {
      file: 'aluno_digitando.glb',
      position: new BABYLON.Vector3(3.8, 0.03, 3.4),
      rotation: new BABYLON.Vector3(0, Math.PI / 2, 0),
      scale: new BABYLON.Vector3(0.7, 0.7, 0.7),
    },
    {
      file: 'computador1.glb',
      position: new BABYLON.Vector3(8.05, 3.4, 1),
      rotation: new BABYLON.Vector3(0, Math.PI / 2, 0),
      scale: new BABYLON.Vector3(1, 1, 1),
    },
    {
      file: 'gaming_pc.glb',
      position: new BABYLON.Vector3(-3, -0.2, 3),
      rotation: new BABYLON.Vector3(0, 0, 0),
      scale: new BABYLON.Vector3(0.3, 0.55, 0.3),
    },
  ];

  models.forEach(({ file, position, rotation, scale }) => {
    BABYLON.SceneLoader.ImportMeshAsync('', ASSET_BASE, file, scene)
      .then(({ meshes }) => {
        if (!meshes.length) return;
        meshes[0].position = position;
        meshes[0].rotation = rotation;
        meshes[0].scaling  = scale;
      })
      .catch(err => console.warn(`Erro ao carregar ${file}:`, err));
  });
}
