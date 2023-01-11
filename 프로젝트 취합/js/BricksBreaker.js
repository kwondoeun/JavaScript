var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");//캔버스에 그리기위해 사용되는 도구 2D rendering context
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
//공을 치기 위한 paddle
var paddleHeight = 10;
var paddleWidth = 80;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//벽돌 만들기
var brickRowCount = 5;
var brickColumnCount = 8;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var stat = 1;
var speed = 10;
var btn1 = document.querySelector(".btn1");
var btn2 = document.querySelector(".btn2");




var bricks = [];
//생명
var life = 3;
//점수
var score = 0;




//키눌렀을 시 paddle움직이는 함수 실행
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

//마우스로 패들 이동
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
//게임시작 전 멘트
function drawText() {
    ctx.font = "32px Arial";
    ctx.fillStyle = "balck";
    ctx.fillText("게임을 시작하려면 Enter 키를 누르세요.", 65, 200)
}
drawText();

//벽돌 파괴
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            //calculations
            if (b.status >= 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status--;
                    if (b.status == 0) score++;

                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
//점수
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20)
}
function drawLife() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("♥", 300, 20)
}


function drawBall() { //공 그리기
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "rgb(6, 98, 114)";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {//패들 그리기
    ctx.beginPath();
    //
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#rgb(6, 98, 114)";
    ctx.fill();
    ctx.closePath();
}
//벽돌 그리기
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status >= 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if (bricks[c][r].status == 2) ctx.fillStyle = "rgb(39, 110, 11)";
                if (bricks[c][r].status == 1) ctx.fillStyle = "rgb(66, 158, 30)";
                ctx.fill();

                ctx.closePath();
            }
        }
    }
}

// 실행
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); //이전 캔버스흔적 지움
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { //좌우벽튕김
        dx = -dx;
    }
    if (y + dy < ballRadius) { //위아래벽튕김
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (x < paddleX + 20) {
                if (dx > 0) {
                    dx = -dx;
                }
                dx = -3;
            } else if (x < paddleX + 40) {
                if (dx > 0) {
                    dx = -dx;
                }
                dx = -2;
            }
            else if (x < paddleX + 60) {
                if (dx < 0) {
                    dx = -dx;
                }
                dx = 2;
            } else {
                if (dx < 0) {
                    dx = -dx;
                }
                dx = 3;
            }
            dy = -dy;

        } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            alert("GAME OVER! Score : " + score + " !!");

            document.location.reload();

        
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    x += dx;
    y += dy;

} 

document.addEventListener("keydown", start, false);
btn1.onclick = function(event){
    speed = 10;
    stat = 1;
    var btnclicked = document.querySelector(".btnclicked");
    btnclicked.classList.remove("btnclicked");
    event.target.classList.add("btnclicked");
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: stat };
        }
    }
    
}
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: stat };
    }
}
btn2.onclick = function(event){
    speed = 5;
    stat = 2;
    var btnclicked = document.querySelector(".btnclicked");
    btnclicked.classList.remove("btnclicked");
    event.target.classList.add("btnclicked");
    for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: stat };
        }
    }
    
}

function start(e) {
    if (e.keyCode == 13) {
        setInterval(draw, speed);
    }
}



