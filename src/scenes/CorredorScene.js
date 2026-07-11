/**
 * CorredorScene.js
 * Cena 3D navegável do corredor escolar.
 * Controles: W/A/S/D ou setas para mover, mouse drag para rotacionar.
 */

const ASSET_BASE = '/corredor_escolar/img/';

// Configuração das portas — facilita adicionar/remover salas
const DOORS = [
  {
    name: 'leftDoor',
    position: new BABYLON.Vector3(-5.1, 0.4, 0),
    size: { width: 0.5, height: 3.1, depth: 1.1 },
    label: 'Programação',
    labelSide: 'left',
    labelZ: 0,
    href: '/sala_de_aula_com_livro/sala_de_aula_livro_python.html',
  },
  {
    name: 'rightDoor1',
    position: new BABYLON.Vector3(5.1, 0.4, -0.8),
    size: { width: 0.5, height: 3.1, depth: 1.1 },
    label: 'Automação',
    labelSide: 'right',
    labelZ: -0.8,
    href: '#',
  },
  {
    name: 'rightDoor2',
    position: new BABYLON.Vector3(5.1, 0.4, 0.8),
    size: { width: 0.5, height: 3.1, depth: 1.1 },
    label: 'Prog. Web',
    labelSide: 'right',
    labelZ: 0.8,
    fontSize: 70,
    href: '/sala_de_aula_com_livro/sala_de_aula_livro_web.html',
  },
];

export function initCorredorScene(canvasId, { onSceneReady } = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || typeof BABYLON === 'undefined') return;

  const engine = new BABYLON.Engine(canvas, true);
  const scene  = createScene(engine, canvas);

  scene.executeWhenReady(() => {
    onSceneReady?.();
  });

  engine.runRenderLoop(() => scene.render());
  window.addEventListener('resize', () => engine.resize());

  return { engine, scene };
}

function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);
  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.CannonJSPlugin());
  scene.collisionsEnabled = true;

  setupLighting(scene);
  const camera = setupCamera(scene, canvas);
  buildRoom(scene);
  buildDoors(scene);
  loadModels(scene);
  setupCameraControls(scene, camera);

  return scene;
}

function setupLighting(scene) {
  const hdrTexture = new BABYLON.CubeTexture('https://www.babylonjs-playground.com/textures/environment.dds', scene);
  scene.environmentTexture = hdrTexture;

  const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  const ceilingLight = new BABYLON.HemisphericLight('ceilingLight', new BABYLON.Vector3(0, -1, 0), scene);
  ceilingLight.intensity = 0.5;
}

function setupCamera(scene, canvas) {
  const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 1.4, -3.5), scene);
  camera.checkCollisions = true;
  camera.applyGravity = false;
  return camera;
}

function buildRoom(scene) {
  const groundMat = new BABYLON.StandardMaterial('groundMat', scene);
  groundMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}chao.jpg`, scene);
  groundMat.diffuseTexture.uScale = 6.5;
  groundMat.diffuseTexture.vScale = 6.5;

  const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);
  ground.material = groundMat;
  ground.checkCollisions = true;
  ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene
  );

  const wallMat = new BABYLON.StandardMaterial('wallMat', scene);
  wallMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}textura_parede.jpg`, scene);

  const walls = [
    { name: 'leftWall',  w: 0.1, h: 3.5, d: 10, x: -5, y: 1, z:  0 },
    { name: 'rightWall', w: 0.1, h: 3.5, d: 10, x:  5, y: 1, z:  0 },
    { name: 'backWall',  w: 10,  h: 3.5, d: 0.1, x: 0, y: 1, z:  5 },
    { name: 'frontWall', w: 10,  h: 3.5, d: 0.1, x: 0, y: 1, z: -5 },
  ];

  walls.forEach(({ name, w, h, d, x, y, z }) => {
    const wall = BABYLON.MeshBuilder.CreateBox(name, { width: w, height: h, depth: d }, scene);
    wall.position.set(x, y, z);
    wall.material = wallMat;
    wall.checkCollisions = true;
    wall.physicsImpostor = new BABYLON.PhysicsImpostor(
      wall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene
    );
  });

  // Parede frontal com textura de paisagem (portal de saída)
  const frontMat = new BABYLON.StandardMaterial('frontMat', scene);
  frontMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}paisagem.jpg`, scene);

  const frontDoor = BABYLON.MeshBuilder.CreateBox('frontDoor', { width: 4, height: 2.5, depth: 0.1 }, scene);
  frontDoor.position.set(0, 1, -4.95);
  frontDoor.material = frontMat;
  frontDoor.checkCollisions = true;
  frontDoor.physicsImpostor = new BABYLON.PhysicsImpostor(
    frontDoor, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene
  );
  registerClickAction(frontDoor, scene, '/src/pages/index.html');

  // Janelas
  const windowDefs = [
    { name: 'w0', tex: `${ASSET_BASE}janela.jpg`,  x:    0, y: 1.5, z: 4.9 },
    { name: 'w1', tex: `${ASSET_BASE}janela1.jpg`, x: -2.5, y: 1.5, z: 4.9 },
    { name: 'w2', tex: `${ASSET_BASE}janela2.jpg`, x:  2.5, y: 1.5, z: 4.9 },
  ];

  windowDefs.forEach(({ name, tex, x, y, z }) => {
    const mat = new BABYLON.StandardMaterial(`${name}Mat`, scene);
    mat.diffuseTexture = new BABYLON.Texture(tex, scene);
    const mesh = BABYLON.MeshBuilder.CreatePlane(name, { width: 2, height: 2 }, scene);
    mesh.position.set(x, y, z);
    mesh.material = mat;
  });

  // Teto
  const ceilingMat = new BABYLON.StandardMaterial('ceilingMat', scene);
  ceilingMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}teto.jpg`, scene);
  ceilingMat.diffuseTexture.uScale = 20;
  ceilingMat.diffuseTexture.vScale = 20;

  const ceiling = BABYLON.MeshBuilder.CreateBox('ceiling', { width: 10, height: 0.1, depth: 10 }, scene);
  ceiling.position.y = 2.7;
  ceiling.material = ceilingMat;
  ceiling.checkCollisions = true;
  ceiling.physicsImpostor = new BABYLON.PhysicsImpostor(
    ceiling, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene
  );
}

function buildDoors(scene) {
  const invisibleMat = new BABYLON.StandardMaterial('invisibleMat', scene);
  invisibleMat.alpha = 0;

  const signMat = new BABYLON.StandardMaterial('signMat', scene);
  signMat.diffuseTexture = new BABYLON.Texture(`${ASSET_BASE}letreiro.jpg`, scene);

  DOORS.forEach(({ name, position, size, label, labelSide, labelZ, fontSize, href }) => {
    // Letreiro visual
    const letreiro = BABYLON.MeshBuilder.CreateBox(`${name}_letreiro`, { width: 0.1, height: 0.3, depth: 1.1 }, scene);
    letreiro.position.set(position.x, 2.35, labelZ);
    letreiro.material = signMat;

    // Caixa de colisão invisível (área clicável)
    const door = BABYLON.MeshBuilder.CreateBox(name, size, scene);
    door.position.copyFrom(position);
    door.material = invisibleMat;
    door.checkCollisions = true;
    door.physicsImpostor = new BABYLON.PhysicsImpostor(
      door, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene
    );

    if (href && href !== '#') {
      registerClickAction(door, scene, href);
    }

    // Placa 3D com o nome da sala
    createRoomSign(scene, label, labelSide, labelZ, fontSize);
  });
}

function createRoomSign(scene, text, side, z = 0, fontSize = 85) {
  const xPos = side === 'left' ? -4.85 : 4.85;
  const rotY = side === 'left' ? -Math.PI / 2 : Math.PI / 2;

  const sign = BABYLON.MeshBuilder.CreatePlane(`sign_${text}`, { width: 2, height: 1.8 }, scene);
  sign.position.set(xPos, 2.35, z);
  sign.rotation.y = rotY;

  const texture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(sign);
  const textBlock = new BABYLON.GUI.TextBlock();
  textBlock.text = text;
  textBlock.color = 'white';
  textBlock.fontSize = fontSize;
  textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  textBlock.textVerticalAlignment   = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  texture.addControl(textBlock);
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
      file: 'planta1.glb',
      position: new BABYLON.Vector3(-4.6, 0, -1),
      scale: new BABYLON.Vector3(0.2, 0.2, 0.2),
    },
    {
      file: 'planta2.glb',
      position: new BABYLON.Vector3(4.6, 0, 2.5),
      scale: new BABYLON.Vector3(1.4, 1.4, 1.4),
    },
    {
      file: 'pet.glb',
      position: new BABYLON.Vector3(-6.3, 2, 3.7),
      scale: new BABYLON.Vector3(1, 1, 1),
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
      scale: new BABYLON.Vector3(0.3, 0.55, 0.3),
      onClick: '/corredor_escolar/jogos/jogos.html',
    },
    {
      file: 'porta.glb',
      position: new BABYLON.Vector3(-4.99, 0, 0),
      rotation: new BABYLON.Vector3(0, -Math.PI / 2, 0),
      scale: new BABYLON.Vector3(1.3, 1, 1),
    },
  ];

  models.forEach(({ file, position, rotation, scale, onClick }) => {
    BABYLON.SceneLoader.ImportMeshAsync('', ASSET_BASE, file, scene)
      .then(({ meshes }) => {
        if (!meshes.length) return;
        meshes[0].position = position;
        if (rotation) meshes[0].rotation = rotation;
        meshes[0].scaling = scale;

        if (onClick) {
          meshes.forEach(mesh => {
            mesh.isPickable = true;
            registerClickAction(mesh, scene, onClick);
          });
        }
      })
      .catch(err => console.warn(`Erro ao carregar ${file}:`, err));
  });

  // Portas direitas: carrega uma vez e clona para a segunda posição
  const rightDoorPositions = [
    new BABYLON.Vector3(4.90, 0, -0.8),
    new BABYLON.Vector3(4.90, 0,  0.8),
  ];

  BABYLON.SceneLoader.ImportMeshAsync('', ASSET_BASE, 'porta.glb', scene)
    .then(({ meshes }) => {
      if (!meshes.length) return;

      // Primeira porta direita — usa os meshes originais
      meshes[0].position = rightDoorPositions[0];
      meshes[0].rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
      meshes[0].scaling  = new BABYLON.Vector3(1.3, 1, 1);

      // Segunda porta direita — clona cada mesh
      meshes.forEach(mesh => {
        const clone = mesh.clone(`${mesh.name}_clone`);
        if (clone) {
          clone.position = rightDoorPositions[1].clone();
          clone.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
          clone.scaling  = new BABYLON.Vector3(1.3, 1, 1);
        }
      });
    })
    .catch(err => console.warn('Erro ao carregar porta.glb:', err));
}

function setupCameraControls(scene, camera) {
  const SPEED = 0.03;
  let isDragging = false;
  const ROTATION_SENSITIVITY = 0.001;

  // Movimento com teclado
  scene.onKeyboardObservable.add(({ event }) => {
    const forward = camera.getDirection(BABYLON.Axis.Z);
    const right   = camera.getDirection(BABYLON.Axis.X);
    const move    = new BABYLON.Vector3(forward.x, 0, forward.z).normalize();
    const strafe  = new BABYLON.Vector3(right.x,   0, right.z).normalize();

    const keyMap = {
      'ArrowUp': () => camera.position.addInPlace(move.scale(SPEED)),
      'w':       () => camera.position.addInPlace(move.scale(SPEED)),
      'ArrowDown': () => camera.position.addInPlace(move.scale(-SPEED)),
      's':         () => camera.position.addInPlace(move.scale(-SPEED)),
      'ArrowLeft': () => camera.position.addInPlace(strafe.scale(-SPEED)),
      'a':         () => camera.position.addInPlace(strafe.scale(-SPEED)),
      'ArrowRight':() => camera.position.addInPlace(strafe.scale(SPEED)),
      'd':         () => camera.position.addInPlace(strafe.scale(SPEED)),
    };

    keyMap[event.key]?.();
  });

  // Rotação com mouse drag
  window.addEventListener('pointerdown', e => { if (e.button === 0) isDragging = true; });
  window.addEventListener('pointerup',   e => { if (e.button === 0) isDragging = false; });
  window.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const deltaX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    camera.rotation.y -= deltaX * ROTATION_SENSITIVITY;
  });
}

function registerClickAction(mesh, scene, href) {
  mesh.actionManager = new BABYLON.ActionManager(scene);
  mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
      window.location.href = href;
    })
  );
}
