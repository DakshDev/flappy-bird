// Controlls
import {board, innerBoard, flappyBird, flappyObj, flappyBirdInitial} from "../script.js"



function controller(){
    document.addEventListener("keypress",(e)=>{if(e.key == " ") coltroll()});
    document.addEventListener("click",()=>{coltroll()});
}

function coltroll(){
    flappyBird.style.animation = "none";
    flappyObj.isGameStart = true;
    flappyObj.isAnimiRun = false;
    flappyObj.isPillarMove = true;
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






// EXPORT CODE
export {controller, flappyBottomControl}