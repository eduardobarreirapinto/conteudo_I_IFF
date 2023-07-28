document.addEventListener("DOMContentLoaded", function () {
    // Get the canvas element from the HTML
    var canvas = document.getElementById("renderCanvas");
  
    // Create the Babylon.js engine
    var engine = new BABYLON.Engine(canvas, true);
  
    // Create a new scene
    var createScene = function () {
      var scene = new BABYLON.Scene(engine);
      scene.collisionsEnabled = true;
  
      // Gravity
      scene.gravity = new BABYLON.Vector3(0, -0.9, 0);
  
      // Camera
      var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1.6, 0), scene);
      camera.attachControl(canvas, true);
  
      // Light
      var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
      light.intensity = 0.7;
  
      // Ground
      var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
      var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
      groundMaterial.diffuseTexture = new BABYLON.Texture("caminho/para/textura/do/cho.jpg", scene);
      ground.material = groundMaterial;
      ground.checkCollisions = true;
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      // Walls
      var wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
      wallMaterial.diffuseTexture = new BABYLON.Texture("caminho/para/textura/da/parede.jpg", scene);
  
      var leftWall = BABYLON.MeshBuilder.CreateBox("leftWall", { width: 0.1, height: 2, depth: 10 }, scene);
      leftWall.position.x = -5;
      leftWall.position.y = 1;
      leftWall.material = wallMaterial;
      leftWall.checkCollisions = true;
      leftWall.physicsImpostor = new BABYLON.PhysicsImpostor(leftWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      var rightWall = BABYLON.MeshBuilder.CreateBox("rightWall", { width: 0.1, height: 2, depth: 10 }, scene);
      rightWall.position.x = 5;
      rightWall.position.y = 1;
      rightWall.material = wallMaterial;
      rightWall.checkCollisions = true;
      rightWall.physicsImpostor = new BABYLON.PhysicsImpostor(rightWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      var backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 10, height: 2, depth: 0.1 }, scene);
      backWall.position.z = 5;
      backWall.position.y = 1;
      backWall.material = wallMaterial;
      backWall.checkCollisions = true;
      backWall.physicsImpostor = new BABYLON.PhysicsImpostor(backWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      var frontWall = BABYLON.MeshBuilder.CreateBox("frontWall", { width: 10, height: 2, depth: 0.1 }, scene);
      frontWall.position.z = -5;
      frontWall.position.y = 1;
      frontWall.material = wallMaterial;
      frontWall.checkCollisions = true;
      frontWall.physicsImpostor = new BABYLON.PhysicsImpostor(frontWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      // Doors
      var doorMaterial = new BABYLON.StandardMaterial("doorMaterial", scene);
      doorMaterial.diffuseTexture = new BABYLON.Texture("caminho/para/textura/da/porta.jpg", scene);
  
      var leftDoor = BABYLON.MeshBuilder.CreateBox("leftDoor", { width: 0.1, height: 2, depth: 1 }, scene);
      leftDoor.position.x = -4.95;
      leftDoor.position.y = 1;
      leftDoor.material = doorMaterial;
      leftDoor.checkCollisions = true;
      leftDoor.physicsImpostor = new BABYLON.PhysicsImpostor(leftDoor, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      var rightDoor = BABYLON.MeshBuilder.CreateBox("rightDoor", { width: 0.1, height: 2, depth: 1 }, scene);
      rightDoor.position.x = 4.95;
      rightDoor.position.y = 1;
      rightDoor.material = doorMaterial;
      rightDoor.checkCollisions = true;
      rightDoor.physicsImpostor = new BABYLON.PhysicsImpostor(rightDoor, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
  
      // Windows
      var windowMaterial = new BABYLON.StandardMaterial("windowMaterial", scene);
      windowMaterial.diffuseTexture = new BABYLON.Texture("caminho/para/textura/da/janela.jpg", scene);
  
      var window = BABYLON.MeshBuilder.CreatePlane("window", { width: 2, height: 2 }, scene);
      window.position.z = -4.95;
      window.position.y = 1;
      window.material = windowMaterial;
  
      // Character
      var character;
      BABYLON.SceneLoader.ImportMesh("", "caminho/para/seu/personagem/", "personagem.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        character = newMeshes[0];
        character.scaling = new BABYLON.Vector3(0.03, 0.03, 0.03);
        character.position = new BABYLON.Vector3(0, 0, 0); // Posição inicial do personagem
        character.rotation.y = Math.PI; // Inverter o personagem para que ele comece olhando para a casa
        character.checkCollisions = true;
        character.physicsImpostor = new BABYLON.PhysicsImpostor(character, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, friction: 0.5, restitution: 0.7 }, scene);
  
        // Teclas do teclado para movimentar o personagem
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
  
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
  
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
          inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
  
        scene.onBeforeRenderObservable.add(function () {
          var speed = 0.1;
          if (inputMap["ArrowUp"] || inputMap["w"]) {
            character.moveWithCollisions(character.calcMovePOV(0, 0, speed));
          }
          if (inputMap["ArrowDown"] || inputMap["s"]) {
            character.moveWithCollisions(character.calcMovePOV(0, 0, -speed));
          }
          if (inputMap["ArrowLeft"] || inputMap["a"]) {
            character.moveWithCollisions(character.calcMovePOV(speed, 0, 0));
          }
          if (inputMap["ArrowRight"] || inputMap["d"]) {
            character.moveWithCollisions(character.calcMovePOV(-speed, 0, 0));
          }
        });
  
        // Handle door collisions
        scene.onBeforeRenderObservable.add(function () {
          if (character && character.intersectsMesh(leftDoor, true)) {
            window.location.href = "link_para_pagina_esquerda.html";
          } else if (character && character.intersectsMesh(rightDoor, true)) {
            window.location.href = "link_para_pagina_direita.html";
          }
        });
      });
  
      return scene;
    };
  
    // Create the scene
    var scene = createScene();
  
    // Run the render loop
    engine.runRenderLoop(function () {
      scene.render();
    });
  
    // Handle window resize
    window.addEventListener("resize", function () {
      engine.resize();
    });
  });