let board = document.querySelector("[board]")
let flappyBird = document.querySelector("[flappy_bird]");


let flappyObj = {
    initTopPerceVal: board.clientHeight / 2 - flappyBird.clientHeight,
    initLeftPercVal: 30,
    flappyBeforeRotate: -20,
    flappyAfterRotate: 20,
    isAnimiRun : true,
    isGameStart : false,
}




// FPS Controller
let lastPaintTime = 0;
let speed = 70;
function animationFlappy(ctime){
    window.requestAnimationFrame(animationFlappy);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    if(flappyObj.isAnimiRun === true){
        flappyBottomControl();
        isCollabToBoard();
    }
}
window.requestAnimationFrame(animationFlappy);







// Flappy Bird Initial Fun
function flappyBirdInitial(){
    flappyBird.style.top = `${flappyObj.initTopPerceVal}px`;
    flappyBird.style.left = `${flappyObj.initLeftPercVal}%`;
}
flappyBirdInitial();







// Controlls
document.addEventListener("keypress",(e)=>{if(e.key == " ") coltroll()});
document.addEventListener("click",()=>{coltroll()});
function coltroll(){
    flappyBird.style.animation = "none";
    flappyObj.isGameStart = true;
    flappyObj.isAnimiRun = false;
    flappyTopControl();
    setTimeout(()=>{flappyObj.isAnimiRun = true},200)
}


function flappyTopControl(){
    if(flappyObj.isGameStart == true){
        flappyBird.style.transition = 'all ease-out 0.2s';
        flappyObj.initTopPerceVal -= 170;
        flappyBird.style.rotate = `${flappyObj.flappyBeforeRotate}deg`;
        flappyBirdInitial();
    }
}
function flappyBottomControl(){
    if(flappyObj.isGameStart == true){
        flappyBird.style.transition = 'all ease-out 0.2s';
        flappyObj.initTopPerceVal += 10;
        flappyBird.style.rotate = `${flappyObj.flappyAfterRotate}deg`;
        flappyBirdInitial();
    }
};







// Game Over
function gameOver(){
    flappyObj.initTopPerceVal = board.clientHeight / 2 - flappyBird.clientHeight;
    flappyObj.initLeftPercVal = 30;
    flappyObj.flappyBeforeRotate = -20;
    flappyObj.flappyAfterRotate = 20;
    flappyObj.isAnimiRun  = true;
    flappyObj.isGameStart = false;
    flappyBird.style.rotate = `0deg`;
    flappyBird.style.animation = "flappyAnimi 1s infinite";
    flappyBirdInitial();
}

function isCollabToBoard(){
    if(board.clientHeight <= flappyObj.initTopPerceVal){
        flappyBird.style.transition = '';
        gameOver();
    }
}