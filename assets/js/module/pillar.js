import {board, innerBoard, flappyBird, flappyObj, flappyBirdInitial} from "../script.js";





let pillarIncVal = 0;

function pillarFun(){
    let pillarImage = document.querySelectorAll("[pillars] div img");

    for(let i=0; i<pillarImage.length; i++){
        pillarImage[i].style.right = `${flappyObj.pillarImageVal}px`;
    }

    if(pillarImage[pillarIncVal].getBoundingClientRect().left < board.getBoundingClientRect().left){
        increasePillar();
        pillarIncVal++;
    }
}


// Move Pillars
function pillarsMove(){
    flappyObj.pillarImageVal+= 4;
    pillarFun();
}





// Add Pillars
function increasePillar(){
    let randomNum = Math.floor(Math.random() * (301)) - 150;

    let topPillar = document.querySelector("[pillars] [top]");
    let BottomPillar = document.querySelector("[pillars] [bottom]");

    let topImg = '<img src="./assets/img/top-pillar.png">';
    let btmImg = '<img src="./assets/img/bottom-pillar.png">';

    topPillar.insertAdjacentHTML("beforeend",topImg)
    BottomPillar.insertAdjacentHTML("beforeend",btmImg)

    topPillar.lastElementChild.style.top = `${randomNum}px`;
    BottomPillar.lastElementChild.style.top = `${randomNum}px`;
    
}












export {pillarFun, pillarsMove, increasePillar};