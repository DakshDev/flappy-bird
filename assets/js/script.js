import {controller, flappyBottomControl} from './module/controll.js';
import {gameOver, isCollabToBoard, collabToPillar} from "./module/game_over.js";
import {pillarFun, pillarsMove, increasePillar} from "./module/pillar.js";




let board = document.querySelector("[board]");
let innerBoard = document.querySelector("[innerBoard]");
let flappyBird = document.querySelector("[flappy_bird]");


let flappyObj = {
    initTopPerceVal: innerBoard.clientHeight / 2,
    initLeftPercVal: 30,
    flappyBeforeRotate: -20,
    flappyAfterRotate: 20,
    isAnimiRun : true,
    isGameStart : false,
    pillarImageVal : -500,
    isPillarMove : false,
}



// Flappy Bird Initial Position
function flappyBirdInitial(){
    flappyBird.style.top = `${flappyObj.initTopPerceVal}px`;
    flappyBird.style.left = `${flappyObj.initLeftPercVal}%`;
}
flappyBirdInitial();




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
    if(flappyObj.isPillarMove === true){
        pillarsMove();
        collabToPillar();
    }
}
window.requestAnimationFrame(animationFlappy);














controller();
increasePillar();
increasePillar();
increasePillar();


// EXPORT CODE
export {board, innerBoard, flappyBird, flappyObj, flappyBirdInitial}