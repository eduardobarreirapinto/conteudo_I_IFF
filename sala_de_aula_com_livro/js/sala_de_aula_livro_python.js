// References to DOM elements
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const book = document.querySelector('#book');

const paper1 = document.querySelector('#p1');
const paper2 = document.querySelector('#p2');
const paper3 = document.querySelector('#p3');
const paper4 = document.querySelector('#p4');

const cont_pag = document.querySelector('#cont_pag');
const select_pag = document.querySelector('.searchbar');

const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

window.addEventListener("keydown",keydownHandler,false);

var zum = 1.0
//console.log('Zum: ' + zum);
function keydownHandler(e){
		var key = e.keyCode;
		switch(key){
			case LEFT:
				goPrevious();
				break;
            case RIGHT:
                    goNext();
                    break;
			 case UP:
                zum += .1
                document.body.style.zoom = zum;
			 	break;
			 case DOWN:
                zum -= .1
                document.body.style.zoom = zum;
			 	break;
		}
}

//teste
//const paper1_front = document.querySelector('#f1');
//const paper1_back = document.querySelector('#b1');

//paper1_back.addEventListener("click", goPrevious);
//paper1_front.addEventListener("click", goNext);

// Event listeners
prevBtn.addEventListener("click", goPrevious);
nextBtn.addEventListener("click", goNext);

// Business Logic
let currentState = 1;
let numOfPapers = 3;
let maxState = numOfPapers + 1;

cont_pag.innerHTML = currentState;
select_pag.placeholder = '1/' + maxState;


function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isFirstPage) {
    if(isFirstPage) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNext() {
    if(currentState < maxState) { 
        switch(currentState) {
            case 1:
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 0;
                break;
            case 2:
                paper2.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                break;
            case 3:
                paper3.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                break;
            case 4:
                closeBook(false);
                paper3.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                paper4.style.zIndex = 4;
                break;
            default: 
                throw new Error("unkown state");    
        }

        currentState++;
        if(currentState == maxState) { 
        cont_pag.innerHTML = '';
        }else{
            cont_pag.innerHTML = currentState;
        }
        select_pag.placeholder = currentState +'/'+ maxState;
    }
}

function goPrevious() {
   
    if(currentState > 0) {
        switch(currentState) {
            case 1:                
                window.location.href = "../index.html";
                break;
            case 2:
                closeBook(true);
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;              
                break;
            case 3:
                paper2.classList.remove("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 0;    
                break;
            case 4: 
                paper3.classList.remove("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                break;
            case 5: 
                openBook()
                paper4.classList.remove("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 2;
                paper3.style.zIndex = 3;
                paper4.style.zIndex = 4;
                break;
        }

        currentState--;
        cont_pag.innerHTML = currentState;
        select_pag.placeholder = currentState +'/'+ maxState;
    }
}