import {board, innerBoard, flappyBird, flappyObj, flappyBirdInitial} from "../script.js";
import {pillarFun, pillarsMove, increasePillar} from "./pillar.js";

// Game Over
function gameOver(){
    let PillarParent = document.querySelector("[pillars]");
    PillarParent.innerHTML = `<div top></div><div bottom></div>`;
    increasePillar();
    increasePillar();
    increasePillar();
    flappyBird.style.rotate = `0deg`;
    flappyBird.style.animation = "flappyAnimi 1s infinite";

    flappyObj.initTopPerceVal = innerBoard.clientHeight / 2;
    flappyObj.initLeftPercVal = 30;
    flappyObj.flappyBeforeRotate = -20;
    flappyObj.flappyAfterRotate = 20;
    flappyObj.isAnimiRun  = true;
    flappyObj.isGameStart = false;
    flappyObj.pillarImageVal = -500;
    flappyObj.isPillarMove = false;
    flappyBirdInitial();
    pillarFun();
}

function isCollabToBoard(){
    if(innerBoard.clientHeight <= flappyObj.initTopPerceVal - flappyBird.clientHeight){
        flappyBird.style.transition = '';
        gameOver();
    }
}





// Is Collab with Pillars
let val = 0;
function collabToPillar(){

    let topImg = document.querySelectorAll("[top] img");
    let btmImg = document.querySelectorAll("[bottom] img");

    
    
    let flappyY = Math.floor(flappyBird.getBoundingClientRect().top);
    let flappyX = Math.floor(flappyBird.getBoundingClientRect().left) + flappyBird.clientWidth;

    // Top Img
    let topPlrX;
    let topPlrY;
    for(let i=0; i<topImg.length; i++){
        topPlrX = Math.floor(topImg[val].getBoundingClientRect().left);
        topPlrY = Math.floor(topImg[val].getBoundingClientRect().bottom);
    }


    // Bottom Img
    let BtmPlrX;
    let BtmPlrY;
    for(let i=0; i<topImg.length; i++){
        BtmPlrX = Math.floor(btmImg[val].getBoundingClientRect().left);
        BtmPlrY = Math.floor(btmImg[val].getBoundingClientRect().top) - flappyBird.clientHeight;
    }


    if(flappyX >= topPlrX+150 || flappyX >= BtmPlrX+150){
        val++;
    }

    if(flappyY <= topPlrY && flappyX >= topPlrX || flappyY >= BtmPlrY && flappyX >= BtmPlrX){
        gameOver();
        val = 0;
    }
    
}













// EXPORT CODE
export {gameOver, isCollabToBoard, collabToPillar}