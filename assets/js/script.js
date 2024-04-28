let board = document.querySelector("[board]")
let flappyBird = document.querySelector("[flappy_bird]");


let flappyObj = {
    initTopPerceVal: board.clientHeight / 2 - flappyBird.clientHeight,
    initLeftPercVal: 30,
    flappyBeforeRotate: -20,
    flappyAfterRotate: 20,
    isAnimiRun : true,
    isGameStart : false,
    pillarImageVal : -500,
    isPillarMove : false,
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
    if(flappyObj.isPillarMove === true){
        pillarsMove();
        collabToPillar();
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







// Game Over
function gameOver(){
    let PillarParent = document.querySelector("[pillars]");
    PillarParent.innerHTML = `<div top></div><div bottom></div>`;
    increasePillar();
    increasePillar();
    increasePillar();

    flappyObj.initTopPerceVal = board.clientHeight / 2 - flappyBird.clientHeight;
    flappyObj.initLeftPercVal = 30;
    flappyObj.flappyBeforeRotate = -20;
    flappyObj.flappyAfterRotate = 20;
    flappyObj.isAnimiRun  = true;
    flappyObj.isGameStart = false;
    flappyBird.style.rotate = `0deg`;
    flappyBird.style.animation = "flappyAnimi 1s infinite";
    flappyObj.pillarImageVal = -500;
    flappyObj.isPillarMove = false;
    flappyBirdInitial();
    pillarFun();
}

function isCollabToBoard(){
    if(board.clientHeight-60 <= flappyObj.initTopPerceVal){
        flappyBird.style.transition = '';
        gameOver();
    }
}











// Pillars Logic

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
increasePillar();
increasePillar();
increasePillar();





















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


    if(flappyX >= topPlrX+100 || flappyX >= BtmPlrX+100){
        val++;
    }

    if(flappyY <= topPlrY && flappyX >= topPlrX || flappyY >= BtmPlrY && flappyX >= BtmPlrX){
        gameOver();
        val = 0;
    }
    
}