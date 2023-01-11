

// 보드 배열을 4*4로 셋팅
var board = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
// 보드 칸마다 아이디 셋팅
var boardID = Array(Array("00", "01", "02", "03"), Array("10", "11", "12", "13"), Array("20", "21", "22", "23"), Array("30", "31", "32", "33"));

//키가 눌릴때 마다 이벤트 처리 (방향키에 대해서만 처리)
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case "ArrowUp": movingbox(0); break;
        case "ArrowDown": movingbox(1); break;
        case "ArrowLeft": movingbox(2); break;
        case "ArrowRight": movingbox(3); break;
    }
});

var score;

init();
// 초기 설정
function init() {
    // 점수를 0으로 셋팅
    score = 0;

    // 보드를 전부 0으로 셋팅
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    //초기에 2개의 값 셋팅
    for (var i = 0; i < 2; i++) {
        getNewNum();
    }
    update();
}

function update() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var box = document.getElementById(boardID[i][j]);
            //보드배열의 값이 0이 아니면 태그 안에 값 넣어주기
            box.innerHTML = board[i][j] == 0 ? "" : board[i][j];
            coloring(box);
        }
    }
    // 스코어 업데이트
    document.querySelector(".score").innerHTML = score;
}

// 점수별로 칸 색변경
function coloring(box){
    var boxNum = parseInt(box.innerHTML);
    switch(boxNum){
        case 0:
        case 2:
            box.style.color="#684A23";
            box.style.background="#FBEDDC";
            break;
        case 4:
            box.style.color="#684A23";
            box.style.background="#F9E2C7";
            break;
        case 8:
            box.style.color="#684A23";
            box.style.background="#F6D5AB";
            break;
        case 16:
            box.style.color="#684A23";
            box.style.background="#F2C185";
            break;
        case 32:
            box.style.color="#684A23";
            box.style.background="#EFB46D";
            break;
        case 64:
            box.style.color="#FFFFFF";
            box.style.background="#EBA24A";
            break;
        case 128:
            box.style.color="#FFFFFF";
            box.style.background="#E78F24";
            break;
        case 256:
            box.style.color="#FFFFFF";
            box.style.background="#E87032";
            break;
        case 512:
            box.style.color="#FFFFFF";
            box.style.background="#E85532";
            break;
        case 1024:
            box.style.color="#FFFFFF";
            box.style.background="#E84532";
            break;
        case 2048:
            box.style.color="#FFFFFF";
            box.style.background="#E83232";
            break;
        default:
            if(boxNum>2048){
                box.style.color="#FFFFFF";
                box.style.background="#E51A1A";
            }
            else{
                box.style.color="#684A23";
                box.style.background="#FBEDDC";
            }
            break;
    }
}

function movingbox(key) {
    switch (key) {
        case 0: move(); break; //up
        case 1: rotate(2); move(); rotate(2); break; //down
        case 2: rotate(1); move(); rotate(3); break; //left
        case 3: rotate(3); move(); rotate(1); break; //right
    }
    update();
}

// 보드판 회전(순서대로 오른쪽 세로방향으로 복사하여 회전 효과를 준다.)
function rotate(n) {

    while (n--) {
        var tempBoard = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
        // 기존 보드 내용을 tempBoard에 복사
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                tempBoard[i][j] = board[i][j];
        // 복사한 내용을 오른쪽 세로방향으로 복사하여 회전하는 것 같은 효과를 준다.
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++)
                board[j][3 - i] = tempBoard[i][j];
    }
}

// 보드판 이동(위로 이동해서 값을 전부 합쳐준다)
function move() {
    var isMoved = false;
    var isPlused = Array(Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0), Array(0, 0, 0, 0));
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) continue;
            var tempY = i - 1;
            while (tempY > 0 && board[tempY][j] == 0) tempY--;
            if (board[tempY][j] == 0) {
                board[tempY][j] = board[i][j];
                board[i][j] = 0;
                isMoved = true;
            }
            else if (board[tempY][j] != board[i][j]) {
                if (tempY + 1 == i) continue;
                board[tempY + 1][j] = board[i][j];
                board[i][j] = 0;
                isMoved = true;
            }
            else {
                if (isPlused[tempY][j] == 0) {
                    board[tempY][j] *= 2;
                    score += board[tempY][j];
                    board[i][j] = 0;
                    isPlused[tempY][j] = 1;
                    isMoved = true;
                }
                else {
                    board[tempY + 1][j] = board[i][j];
                    board[i][j] = 0;
                    isMoved = true;
                }
            }
        }
    }
    if (isMoved) getNewNum();
}

// 값이 없는 좌표에 새로운 숫자 2를 추가
function getNewNum() {
    while (true) {
        var x = parseInt(Math.random() * 4);
        var y = parseInt(Math.random() * 4);

        if (board[x][y] == 0) {
            var rand = parseInt(Math.random()*10);
            if(rand==0){
                board[x][y] = 4;
            }else{
                board[x][y] = 2;
            }
            checkGameOver();
            return;
        }
    }
}

// 게임오버 체크
function checkGameOver(){
    for(var i=0;i<4;i++){
        var colCheck = board[i][0];
        if(colCheck==0) return;
        for(var j=1;j<4;j++){
            if(board[i][j]==colCheck || board[i][j]==0) return;
            else colCheck = board[i][j];
        }
    }
    for(var i=0;i<4;i++){
        var rowCheck = board[0][i];
        if(rowCheck==0) return;
        for(var j=1;j<4;j++){
            if(board[j][i]==rowCheck || board[j][i]==0) return;
            else rowCheck = board[j][i];
        }
    }
    gameover();
}

// 최대 점수 반환 - 최대로
function getMaxNum(){
    var ret=0;
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++)
            if(board[i][j]>ret)
                ret=board[i][j];
    return ret;
}

// 게임오버 처리
function gameover(){
    alert("[Game Over]\n MAX: "+getMaxNum()+"\nScore"+score);
    init();
}
