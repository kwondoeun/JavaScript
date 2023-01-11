var canvas = document.getElementById("canvas");
var gameOver = document.querySelector(".gameOver");

var ctx = canvas.getContext("2d");

var img1 = new Image();
img1.src = 'img/dino3.png';

var img2 = new Image();
img2.src = 'img/cactus.png';

var back = new Image();
img2.src = 'img/cactus.png';


//점수
var score = 0;

//size
canvas.width = window.innerWidth - 1000;
canvas.height = window.innerHeight - 300;


//style
ctx.fillStyle = "#12bbFF";
ctx.fillRect(0, 0, canvas.width, canvas.height);


//캐릭터
var mainCharacter = {
    x: 50,
    y: 500,
    width: 60,
    height: 70,

    draw() {
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }

}

//장애물
class Obstacle1 {
    constructor() {
        this.x = 900;
        this.y = 500;
        this.width = 50;
        this.height = 60;

    }
    draw() {
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

}


class Obstacle2 {
    constructor() {
        this.x = 900;
        this.y = 470;
        this.width = 50;
        this.height = 100;
    }
    draw() {
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

}

//변수들
var timer = 0;
var obstacles = [];
var obstacles2 = [];
var jumpTimer = 0;
var animation;
var inner = document.querySelector(".dinoGame .inner");
var span = document.querySelector("span");

function playPerFrame() {

    animation = requestAnimationFrame(playPerFrame);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % 200 == 0) {

        var miniCac = new Obstacle1();
        obstacles.push(miniCac);
        obstacles.push(miniCac);

    }

    if (timer % 100 == 0) {

        var miniCac = new Obstacle1();
        obstacles.push(miniCac);
        obstacles.push(miniCac);

    }
    
    if (timer % 290 == 0) {
        
        var cactus = new Obstacle2();
        obstacles.push(cactus);
        obstacles.push(cactus);
        // obstacles.push(cactus);
        
        
    }
    
    if(timer % 150 == 0) {
        var miniCac = new Obstacle1();
        obstacles.push(miniCac);
        obstacles.push(miniCac);

    }


    obstacles.forEach((a, i, o) => {
        //x좌표가 0 미만이면 제거 -> 점프해서 넘어가면 사라지게끔 설정
        if (a.x < 0) {
            o.splice(i, 1);
            score += 10;
            inner.innerHTML = score;
        }

        //주인공 vs 모든 장애물이 충돌하는지 안하는지를 체크해야 함
        crash(mainCharacter, a);
        a.x -= 7;
        a.draw();
    })

    obstacles2.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1);
            score += 10;
            inner.innerHTML = score;
        }

        crash2(mainCharacter, a);
        a.x -= 3;
        a.draw();
    })


    //점프 설정
    if (jumping == true) {
        // dinoGame.classList.add("jump" );
        mainCharacter.y -= 9;
        jumpTimer++;
    }
    if (jumping == false) {
        if (mainCharacter.y < 500) {

            mainCharacter.y += 9;
        }
    }
    if (jumpTimer > 20) {
        jumping = false;
        jumpTimer = 0;
    }

    //연속으로 점프 안되게 설정
    // setTimeout(() => {
    //     dinoGame.classList.remove("jump");
    //     jumping = false;
    // }, 3000);

    mainCharacter.draw();
}


playPerFrame();


//점프중일 때 변수 선언 -> 점프하면 위로 가고 false면 아래로 가게끔 설정 
var jumping = false;
var stop = false;

//스페이스 바를 누르면 점프하도록 설정
document.addEventListener('keydown', function (e) {
    if (e.code === "Space") {
        jumping = true;

        if(mainCharacter.y < 400) {
            jumping = false;
        }
    }
});


//충돌확인
function crash(mainCharacter, miniCac) {
    var xDifference = miniCac.x - (mainCharacter.x + mainCharacter.width);
    var yDifference = miniCac.y - (mainCharacter.y + mainCharacter.height);

    if (xDifference < -20 && yDifference < -20) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        canvas.style.display = "none";
        gameOver.style.display = "block";

    }


}

function crash2(mainCharacter, cactus) {
    var xDifference2 = cactus.x - (mainCharacter.x + mainCharacter.width);
    var yDifference2 = cactus.y - (mainCharacter.x + mainCharacter.width);

    if (xDifference2 < -30 && yDifference2 < -30) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        canvas.style.opacity = 0;
    }

}

var playAgainBtn = document.querySelector(".playAgainBtn");
console.log(playAgainBtn);
playAgainBtn.onclick = function () {
    gameOver.style.display = "none";
    document.location.reload();
    // playPerFrame();
    canvas.style.display = "block";
    score = 0;
    inner.innerHTML = score;
}
