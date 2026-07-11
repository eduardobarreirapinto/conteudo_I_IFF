// References to DOM elements
const prevBtn = document.querySelector('#prev-btn');
if (prevBtn && prevBtn.children[0]) {
    prevBtn.children[0].style.display = 'none';
}
const nextBtn = document.querySelector('#next-btn');
const logos_I = document.querySelector('#logos_I');
const logos_FF = document.querySelector('#logos_FF');
const book = document.querySelector('#book');
const cont_pag = document.querySelector('#cont_pag');
const select_pag = document.querySelector('.searchbar');

// Dynamically query all paper elements
const papers = Array.from(document.querySelectorAll('.paper'));
const numOfPapers = papers.length;
const maxState = numOfPapers + 1;

let currentState = 1;
if (cont_pag) {
    cont_pag.innerHTML = currentState;
}
if (select_pag) {
    select_pag.placeholder = currentState + '/' + maxState;
}

const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
window.addEventListener("keydown", keydownHandler, false);

let zum = 1.0;

function keydownHandler(e) {
    const key = e.keyCode;
    switch(key) {
        case LEFT:
            goPrevious();
            break;
        case RIGHT:
            goNext();
            break;
        case UP:
            zum += 0.1;
            document.body.style.zoom = zum;
            break;
        case DOWN:
            zum -= 0.1;
            document.body.style.zoom = zum;
            break;
    }
}

// Event listeners
if (prevBtn) prevBtn.addEventListener("click", goPrevious);
if (nextBtn) nextBtn.addEventListener("click", goNext);

function openBook() {
    if (!book) return;
    if (window.innerWidth > 767) {
        book.style.transform = "translateX(50%)";
        if (prevBtn) prevBtn.style.transform = "translateX(-180px)";
        if (nextBtn) nextBtn.style.transform = "translateX(180px)";
        if (logos_I) logos_I.style.transform = "translateX(-180px)";
        if (logos_FF) logos_FF.style.transform = "translateX(180px)";
    }
}

function closeBook(isFirstPage) {
    if (!book) return;
    if (isFirstPage) {
        book.style.transform = "translateX(0%)";
        if (prevBtn) {
            prevBtn.style.transform = "translateX(0px)";
            if (prevBtn.children[0]) prevBtn.children[0].style.display = 'none';
        }
    } else {
        if (window.innerWidth > 767) { 
            book.style.transform = "translateX(100%)";        
            if (nextBtn) {
                nextBtn.style.transform = "translateX(0px)";
                if (nextBtn.children[0]) nextBtn.children[0].style.display = 'none';
            }
        }
    }
    if (prevBtn) prevBtn.style.transform = "translateX(0px)";
    if (nextBtn) nextBtn.style.transform = "translateX(0px)";
    if (logos_I) logos_I.style.transform = "translateX(0px)";
    if (logos_FF) logos_FF.style.transform = "translateX(0px)";
}

function updatePaginationDisplay() {
    if (cont_pag) {
        if (currentState === maxState) {
            cont_pag.innerHTML = '';
        } else {
            cont_pag.innerHTML = currentState;
        }
    }
    if (select_pag) {
        select_pag.placeholder = currentState + '/' + maxState;
    }
}

function goNext() {
    if (currentState < maxState) {
        if (prevBtn && prevBtn.children[0]) {
            prevBtn.children[0].style.display = 'block';
        }
        
        const paperIndex = currentState - 1;
        if (currentState === 1) {
            openBook();
        }
        
        if (currentState === numOfPapers) {
            closeBook(false);
            if (window.innerWidth <= 767 && nextBtn && nextBtn.children[0]) {
                nextBtn.children[0].style.display = 'none';
            }
        }
        
        // Flip current paper
        if (papers[paperIndex]) {
            papers[paperIndex].classList.add("flipped");
        }
        
        // Update z-indexes
        papers.forEach((paper, idx) => {
            if (currentState === numOfPapers) {
                paper.style.zIndex = (idx === numOfPapers - 1) ? 1 : 0;
            } else {
                if (idx === paperIndex - 1) {
                    paper.style.zIndex = 0;
                } else if (idx === paperIndex || idx === paperIndex + 1) {
                    paper.style.zIndex = 1;
                } else {
                    paper.style.zIndex = 0;
                }
            }
        });
        
        currentState++;
        updatePaginationDisplay();
    }
}

function goPrevious() {
    if (currentState > 0) {
        if (nextBtn && nextBtn.children[0]) {
            nextBtn.children[0].style.display = 'block';
        }
   
        if (currentState === 1) {
            window.location.href = "../index.html";
            return;
        }
        
        const targetPaperIndex = currentState - 2;
        
        if (currentState === 2) {
            closeBook(true);
        } else if (currentState === maxState) {
            openBook();
        }
        
        if (papers[targetPaperIndex]) {
            papers[targetPaperIndex].classList.remove("flipped");
        }
        
        // Update z-indexes
        papers.forEach((paper, idx) => {
            if (currentState === 2) {
                if (idx === 0) paper.style.zIndex = 1;
                else if (idx === 1) paper.style.zIndex = 0;
                else paper.style.zIndex = -idx;
            } else if (currentState === maxState) {
                if (idx === numOfPapers - 1 || idx === numOfPapers - 2) {
                    paper.style.zIndex = 1;
                } else {
                    paper.style.zIndex = 0;
                }
            } else {
                if (idx === targetPaperIndex - 1 || idx === targetPaperIndex) {
                    paper.style.zIndex = 1;
                } else if (idx === targetPaperIndex + 1) {
                    paper.style.zIndex = 0;
                } else {
                    paper.style.zIndex = -idx;
                }
            }
        });
        
        currentState--;
        updatePaginationDisplay();
    }
}
