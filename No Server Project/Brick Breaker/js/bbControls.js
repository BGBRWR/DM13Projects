var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");



//Player controls
var rightPressed = false;
var leftPressed = false;









//Paddle
var paddleHeight = 20;
var paddleWidth = 15000;
var paddleX = (canvas.width-paddleWidth)/2;
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}



//Bricks
var brickRowCount = 20;
var brickColumnCount = 18;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 40;
var bricks = [];
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = color1;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

var color1 = getRandomColor();
function paddleColorChange () {
  color1 = getRandomColor();
}

//Ball Size
var ballRadius = 20;



//Ball Movement
var x = canvas.width/2;
var y = canvas.height-paddleHeight-ballRadius;
var dx = 2;
var dy = -2;

//ball Color Change
var ballColor = "#0095DD";
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//blue sphere
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

//movement & cleanup
function draw() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    x += dx;
    y += dy;

    //Ball Left & Right boundary
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        ballColor = getRandomColor();
    }
    //Ball Top & Right boundary
    if(y + dy < ballRadius) {
        dy = -dy;
        ballColor = getRandomColor();
    }
    else if(y + dy > canvas.height-ballRadius-paddleHeight) {
        if(x > paddleX-ballRadius && x < paddleX + paddleWidth + ballRadius) {
            dy = -dy;
            dx += 0.02;
            dy += -0.02;

            ballColor = getRandomColor();
        }
        else {
          lives--;
          if(!lives) {
            alert("GAME OVER! YOUR SCORE WAS " + score);
            document.location.reload();
          }
          else {
            x = canvas.width/2;
            y = canvas.height-paddleHeight-ballRadius;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
          }
        }
    }
    //Paddle Left & Right boundary
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    requestAnimationFrame(draw);
}
//listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
//collisionDetection for the bricks
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x - ballRadius && x - ballRadius < b.x + brickWidth && y > b.y - ballRadius && y - ballRadius < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    ballColor = getRandomColor();
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                       alert("YOU WIN, CONGRATULATIONS! YOUR SCORE WAS " + score);
                       document.location.reload();
                   }
                }
            }
        }
    }
}

//Score-------------------------------------------------------------------------------------------------------
var score = 0;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

//Lives
var lives = 3;
function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, canvas.width-65, 20)
}
//mouse controls
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}


//Action
draw();
setInterval(paddleColorChange, 5000);
