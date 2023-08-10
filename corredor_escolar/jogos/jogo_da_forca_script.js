let conteudoDoArquivo;
let parsedData;
let conteudoDoArquivo1;
let parsedData1;   


document.addEventListener("DOMContentLoaded", async function () {

    async function lerArquivo() {
     try {
       const response = await fetch('./forca.txt');
       const conteudo = await response.text();
       return conteudo;
     } catch (error) {
       console.error('Erro ao ler o arquivo:', error);
       return null;
     }
   }
   async function lerArquivo1() {
    try {
      const response = await fetch('./forca_codigo.txt');
      const conteudo = await response.text();
      return conteudo;
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
      return null;
    }
  }
   

   conteudoDoArquivo = await lerArquivo();
   parsedData = JSON.parse(conteudoDoArquivo);
   conteudoDoArquivo1 = await lerArquivo1();
   parsedData1 = JSON.parse(conteudoDoArquivo1);     

});

//Initial References
const letterContainer = document.getElementById("letter-container");
const answer_textarea = document.getElementById("answer-textarea");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas_forca = document.getElementById("canvas");
const resultText = document.getElementById("result-text");

//Options values for buttons
let options = {
  Python: ["lambda","global","finally","for","as","input","if","elif","while","try","except","pass"],
  Automação: ["GPIB", "Arduino", "Multimetro", "LED", "Transistor", "Sensor"],
  
};

//count
let winCount = 0;
let count = 0;

let chosenWord = "";

//Display option buttons
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Selecione o assunto:</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};

//Block all the Buttons
const blocker = () => {
  
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  //disable all options
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  //disable all letters
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

 let istextArea = false;
//Word Generator
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  //If optionValur matches the button innerText then highlight the button
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });

  if (optionValue === 'Python'){
    istextArea = true;
  }else{
    istextArea = false;
  }

  //initially hide letters, clear previous word
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";

  let optionArray = options[optionValue];
  //choose random word
  chosenWord1 = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord1.toUpperCase();

  //replace every letter with span containing dash
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>&nbsp');
  console.log(chosenWord1);
  optionsContainer.innerHTML = `<h3>${parsedData[chosenWord1]}</h3>`;

  //Display each element as span
  userInputSection.innerHTML = displayItem;
};

//Initial Function (Called when page loads/user presses new game)
const initializer = () => {
  try {
    profAnimResp.start(true, 1.0, profAnimResp.from, profAnimResp.to, false);
  } catch (error) {
    // Um erro ocorreu
    console.error("Não carregou a animação do professor ainda:", error);
  }
  
  
  winCount = 0;
  count = 0;
  
  //Initially erase all content and hide letteres and new game button
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";

  //For creating letter buttons
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
    //character button click
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      //if array contains clciked value replace the matched dash with letter else dram on canvas
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          //if character in array is same as clicked button
          if (char === button.innerText) {
            //replace dash with letter
            dashes[index].innerText = char;
            //increment counter
            winCount += 1;
            //if winCount equals word lenfth
            if (winCount == charArray.length) {              
              profAnimAcertou.start(false, 1.0, profAnimAcertou.from, profAnimAcertou.to, false);
              resultText.innerHTML = `<h2 class='win-msg'>Parabéns!!</h2><p>A palavra é:&nbsp<span>${chosenWord}</span></p>`;
              if(istextArea){
                resultText.innerHTML += `<textarea class="answer-textarea" id="answer-textarea"></textarea>`;
                answerTextArea = document.getElementById("answer-textarea");
                answerTextArea.value = parsedData1[chosenWord1]; // Clear any previous user input
              }
              //block all buttons
              blocker();
            }
          }
        });
      } else {
        //lose count
        count += 1;
        //for drawing man
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          profAnimErrou.start(false, 1.0, profAnimErrou.from, profAnimErrou.to, false);
          resultText.innerHTML = `<h2 class='lose-msg'>Volte a estudar!!</h2><p>A palavra era:&nbsp<span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }

  displayOptions();
  //Call to canvasCreator (for clearing previous canvas and creating initial canvas)
  let { initialDrawing } = canvasCreator();
  //initialDrawing would draw the frame
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas_forca.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

  //For drawing lines
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };

  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };

  const body = () => {
    drawLine(70, 40, 70, 80);
  };

  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };

  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };

  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };

  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };

  //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };

  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

//draw the man
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};

var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
let animationResp = "Armature.001|mixamo.com|Layer0";
let animationAcertou = "Armature.002|mixamo.com|Layer0";
let animationErrou  = "Armature.003|mixamo.com|Layer0";
let professorPromise = '';
let profAnimResp = '';
let profAnimAcertou = '';
let profAnimErrou = '';

// Criar a cena
var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(250 / 255, 250 / 255, 210 / 255); 
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Criar câmera
    var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -1.3), scene); // Altura ajustada para 1.7 (olhos do observador)
    camera.setTarget(new BABYLON.Vector3(0, -0.7, 5)); // Olhar para a direção positiva do eixo z
    camera.attachControl(canvas, true);

    // Criar luz
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  
    // Importe o modelo do professor usando ImportMeshAsync
    professorPromise = BABYLON.SceneLoader.ImportMeshAsync("", "./img/", "professor.glb", scene);

    // Quando o modelo for carregado (a promessa for resolvida), você pode acessar os meshes carregados
    professorPromise.then((result) => {
    // O resultado é um objeto que contém informações sobre os meshes carregados, como 'meshes', 'particleSystems', etc.
    const meshes = result.meshes; 
    
    // Acessar os grupos de animações associados ao modelo
    const animationGroups = result.animationGroups;

    // Iterar sobre os grupos de animações para exibir os nomes das animações
    for (const animationGroup of animationGroups) {
        console.log("Nome da animação:", animationGroup.name);
    }
    profAnimAcertou= scene.getAnimationGroupByName(animationAcertou);
    profAnimErrou= scene.getAnimationGroupByName(animationErrou);
    profAnimResp= scene.getAnimationGroupByName(animationResp);   
        

    // Certifique-se de que o modelo foi carregado corretamente e contenha meshes
    if (meshes.length > 0) {
        // Neste exemplo, iremos posicionar o professor no ponto (0, 0, 0) da cena
        meshes[0].position = new BABYLON.Vector3(-.35,-.35, -.5);

        // Você também pode rotacionar o mesh, se necessário
        meshes[0].rotation = new BABYLON.Vector3(0, 2.7 , 0);
        
        // Você pode escalar o mesh se necessário
        meshes[0].scaling = new BABYLON.Vector3(.2, .2, .2);
    } else {
        console.error("Nenhum mesh foi carregado. Verifique o caminho do arquivo .glb ou o conteúdo do modelo.");
    }
  }).catch((error) => {
    console.error("Ocorreu um erro ao carregar o modelo: ", error);
  });  

    // Importe o modelo do professor usando ImportMeshAsync
    const sala_de_aula = BABYLON.SceneLoader.ImportMeshAsync("", "./img/", "sala_de_aula.glb", scene);

    // Quando o modelo for carregado (a promessa for resolvida), você pode acessar os meshes carregados
    sala_de_aula.then((result) => {
    // O resultado é um objeto que contém informações sobre os meshes carregados, como 'meshes', 'particleSystems', etc.
      const meshes = result.meshes;

    // Certifique-se de que o modelo foi carregado corretamente e contenha meshes
      if (meshes.length > 0) {
        // Neste exemplo, iremos posicionar o professor no ponto (0, 0, 0) da cena
        meshes[0].position = new BABYLON.Vector3(-0.45,0, 0);

        // Você também pode rotacionar o mesh, se necessário
        meshes[0].rotation = new BABYLON.Vector3(.03, Math.PI /2.3, 0);
        
        // Você pode escalar o mesh se necessário
        meshes[0].scaling = new BABYLON.Vector3(.05, .05, .05);
      } else {
          console.error("Nenhum mesh foi carregado. Verifique o caminho do arquivo .glb ou o conteúdo do modelo.");
      }
    }).catch((error) => {
      console.error("Ocorreu um erro ao carregar o modelo: ", error);
    });     

    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {
scene.render();
});

window.addEventListener("resize", function () {
engine.resize();
});

//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;