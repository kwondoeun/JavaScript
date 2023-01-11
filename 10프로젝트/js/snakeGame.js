var gameCanvas = document.getElementById("game-canvas");
var Snakectx = gameCanvas.getContext("2d");
var inner = document.querySelector(".inner");
var btn = document.querySelector(".playAgainBtn");

var gamestart;
window.onload = () => {

    document.addEventListener("keydown", keyPush);

    // 게임 시작시 초당 15fps로 game 함수 호출
    gamestart = setInterval(game, 1000 / 15);

}


// 뱀의 위치
let positionX = 10, positionY = 10;

// gridSize: 가로세로 30px , tileCount = 가로세로 30개씩 총 900개의 타일
const gridSize = 28, tileCount = 28;

// 뱀이 움직이는 방향을 설정
let velocityX = 0, velocityY = 0;

// 사과(먹이) 위치변수
let appleX = 15, appleY = 15;
let appleX1 = 20, appleY1 = 20;

// 뱀의 몸통을 저장하는 배열
const trail = [];

// 현재 뱀의 길이
let tailLength = 4;

//new 점수
var count = 0;
function game() {

    // velocity 상황에 따라 positionXY의 위치를 결정
    positionX += velocityX;
    positionY += velocityY;


    //바탕 색깔 -> 검정
    Snakectx.fillStyle = "black";
    Snakectx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    // 뱀 그리기
    Snakectx.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        // trail 배열만큼 그림
        Snakectx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);


        // 게임 오버 case 1
        if (trail[i].x === positionX && trail[i].y === positionY && tailLength != 4) {
            tailLength = 4;
            alert("your score:"+count);
            document.location.reload();
            clearInterval(gamestart);
            gamestart = false;
        }

        // 뱀 머리가 경계에 있을 때 처리
        if (positionX < 0) {
            tailLength = 4;
            // document.location.reload();
            alert("your score:"+count);
            document.location.reload();
            positionX = 10, positionY = 10;
            clearInterval(gamestart);
            gamestart = false;

        }
        if (positionX > tileCount - 1) {
            tailLength = 4;
            // document.location.reload();
            alert("your score:"+count);
            document.location.reload();
            positionX = 10, positionY = 10;
            clearInterval(gamestart);
            gamestart = false;
        }
        if (positionY < 0) {
            tailLength = 4;
            // document.location.reload();
            alert("your score:"+count);
            document.location.reload();
            positionX = 10, positionY = 10;
            clearInterval(gamestart);
            gamestart = false;
        }
        if (positionY > tileCount - 1) {
            tailLength = 4;
            // document.location.reload();
            alert("your score:"+count);
            document.location.reload();
            positionX = 10, positionY = 10;
            clearInterval(gamestart);
            gamestart = false;
        }

    }

    // 게임이 진행될 때마다 positionXY를 trail 배열에 삽입
    trail.push({
        x: positionX,
        y: positionY,

    })

    // 단, trail의 크기는 tailLength를 넘지 않게
    while (trail.length > tailLength) {
        trail.shift();
    }

    // 사과 먹었을 때
    if (appleX === positionX && appleY === positionY) {
        tailLength++;
        count++;
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        inner.innerHTML = count;

    }

    // 사과 먹었을 때 2
    if (appleX1 === positionX && appleY1 === positionY) {
        tailLength++;
        tailLength++;
        count++;
        count++;
        appleX1 = Math.floor(Math.random() * tileCount);
        appleY1 = Math.floor(Math.random() * tileCount);
        inner.innerHTML = count;
    }

    // 사과 그리기
    // 사과 이미지로 그려주기
    const img = new Image();
    img.src = 'img/a.png'; 
    Snakectx.drawImage(img, appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2); 

    const img2 = new Image();
    img2.src = 'img/a1.png'; 
    Snakectx.drawImage(img2, appleX1 * gridSize, appleY1 * gridSize, gridSize - 2, gridSize - 2); 


    // 사과 색칠에서 이미지로 변경 (위)
    // Snakectx.fillStyle = "red";
    // Snakectx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);

    // Snakectx.fillStyle = "yellow";
    // Snakectx.fillRect(appleX1 * gridSize, appleY1 * gridSize, gridSize - 2, gridSize - 2);

}

// 방향키 이벤트
var move = "";
function keyPush(evt) {

    if(!gamestart){
        count = 0;
        inner.innerHTML = count;
        gamestart = setInterval(game, 1000 / 15);
    }

    if (evt.keyCode == 37 && move != "right") {
        velocityX = -1;
        velocityY = 0;
        move = "left";
    } else if (evt.keyCode == 38 && move != "down") {
        velocityX = 0;
        velocityY = -1;
        move = "up";
    } else if (evt.keyCode == 39 && move != "left") {
        velocityX = 1;
        velocityY = 0;
        move = "right";
    } else if (evt.keyCode == 40 && move != "up") {
        velocityX = 0;
        velocityY = 1;
        move = "down";
    }
   
}