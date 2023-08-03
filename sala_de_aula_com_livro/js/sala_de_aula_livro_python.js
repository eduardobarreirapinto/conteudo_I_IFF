// References to DOM elements
const prevBtn = document.querySelector('#prev-btn');
prevBtn.children[0].style.display = 'none';
const nextBtn = document.querySelector('#next-btn');
const logos_I = document.querySelector('#logos_I');
const logos_FF = document.querySelector('#logos_FF');


const paper1 = document.querySelector('#p1');
const paper2 = document.querySelector('#p2');
const paper3 = document.querySelector('#p3');
const paper4 = document.querySelector('#p4');
const paper5 = document.querySelector('#p5');
const paper6 = document.querySelector('#p6');
const paper7 = document.querySelector('#p7');
const paper8 = document.querySelector('#p8');

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
let numOfPapers = 8;
let maxState = numOfPapers + 1;

cont_pag.innerHTML = currentState;
select_pag.placeholder = '1/' + maxState;


function openBook() {
    if (window.innerWidth > 767) {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-180px)";
        nextBtn.style.transform = "translateX(180px)";
        logos_I.style.transform = "translateX(-180px)";
        logos_FF.style.transform = "translateX(180px)";
    }
}

function closeBook(isFirstPage) {
    if(isFirstPage) {
        book.style.transform = "translateX(0%)";
        prevBtn.style.transform = "translateX(0px)";
        prevBtn.children[0].style.display = 'none';
                    
    } else {
        book.style.transform = "translateX(100%)";        
        nextBtn.style.transform = "translateX(0px)";
        nextBtn.children[0].style.display = 'none';
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
    logos_I.style.transform = "translateX(0px)";
    logos_FF.style.transform = "translateX(0px)";
    
}

function goNext() {
    // Verifica se a largura da janela é maior que 767px (modo desktop)
    if (window.innerWidth > 767) {
        prevBtn.children[0].style.display = 'block';
    }
    
    if(currentState < maxState) { 
        switch(currentState) {
            case 1:
                console.log(1);
                console.log(currentState);
                openBook();
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                paper2.style.zIndex = 1;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 0;
                break;
            case 2:
                console.log(2);
                console.log(currentState);
                paper2.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 1;
                paper3.style.zIndex = 1;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 0;
                break;
            case 3:
                console.log(3);
                console.log(currentState);
                paper3.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 1;
                paper4.style.zIndex = 1;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 0;
                break;
            case 4:
                console.log(4);
                console.log(currentState);
                paper4.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 1;
                paper5.style.zIndex = 1;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 0;
                break;
            case 5:
                console.log(5);
                console.log(currentState);
                paper5.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 1;
                paper6.style.zIndex = 1;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 0;
                break;
            case 6:
                console.log(6);
                console.log(currentState);
                paper6.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 1;
                paper7.style.zIndex = 1;
                paper8.style.zIndex = 0;
                break;
            case 7:
                console.log(7);
                console.log(currentState);
                paper7.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 1;
                paper8.style.zIndex = 1;
                break;
            case 8:
                console.log(8);
                console.log(currentState);
                closeBook(false);
                paper8.classList.add("flipped");
                paper1.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper6.style.zIndex = 0;
                paper7.style.zIndex = 0;
                paper8.style.zIndex = 1;
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
    if (window.innerWidth > 767) {
        nextBtn.children[0].style.display = 'block';
    }
    if(currentState > 0) {
        switch(currentState) {
            case 1: 
                console.log(1);
                console.log(currentState);               
                window.location.href = "../index.html";
                break;
            case 2:
                console.log(2);
                console.log(currentState);
                closeBook(true);
                paper1.classList.remove("flipped");
                paper8.style.zIndex = -6;
                paper7.style.zIndex = -5;
                paper6.style.zIndex = -5;
                paper5.style.zIndex = -3;
                paper4.style.zIndex = -2;
                paper3.style.zIndex = -1;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 1;             
                break;
            case 3:
                console.log(3);
                console.log(currentState);
                paper2.classList.remove("flipped");
                paper8.style.zIndex = -5;
                paper7.style.zIndex = -4;
                paper6.style.zIndex = -3;
                paper5.style.zIndex = -2;
                paper4.style.zIndex = -1;
                paper3.style.zIndex = 0;
                paper2.style.zIndex = 1;
                paper1.style.zIndex = 1;  
                break;
            case 4: 
                console.log(4);
                console.log(currentState);
                paper3.classList.remove("flipped");
                paper8.style.zIndex = -4;
                paper7.style.zIndex = -3;
                paper6.style.zIndex = -2;
                paper5.style.zIndex = -1;
                paper4.style.zIndex = 0;
                paper3.style.zIndex = 1;
                paper2.style.zIndex = 1;
                paper1.style.zIndex = 0;
                break;
            case 5: 
                console.log(5);
                console.log(currentState);
                paper4.classList.remove("flipped");
                paper8.style.zIndex = -2;
                paper7.style.zIndex = -2;
                paper6.style.zIndex = -1;
                paper5.style.zIndex = 0;
                paper4.style.zIndex = 1;
                paper3.style.zIndex = 1;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 0;
                break;
            case 6: 
                console.log(6);
                console.log(currentState);
                paper5.classList.remove("flipped");
                paper8.style.zIndex = -2;
                paper7.style.zIndex = -1;
                paper6.style.zIndex = 0;
                paper5.style.zIndex = 1;
                paper4.style.zIndex = 1;
                paper3.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 0;
                break;
            case 7: 
                console.log(7);
                console.log(currentState);
                paper6.classList.remove("flipped");
                paper8.style.zIndex = -1;
                paper7.style.zIndex = 0;
                paper6.style.zIndex = 1;
                paper5.style.zIndex = 1;
                paper4.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 0;
                break;
            case 8: 
                console.log(8);
                console.log(currentState);
                paper7.classList.remove("flipped");
                paper8.style.zIndex = 0;
                paper7.style.zIndex = 1;
                paper6.style.zIndex = 1;
                paper5.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 0;
                break;
            case 9: 
                console.log(9);
                console.log(currentState);
                openBook()
                paper8.classList.remove("flipped");
                paper8.style.zIndex = 1;
                paper7.style.zIndex = 1;
                paper6.style.zIndex = 0;
                paper5.style.zIndex = 0;
                paper4.style.zIndex = 0;
                paper3.style.zIndex = 0;
                paper2.style.zIndex = 0;
                paper1.style.zIndex = 0;
                break;
        }

        currentState--;
        cont_pag.innerHTML = currentState;
        select_pag.placeholder = currentState +'/'+ maxState;
    }
}