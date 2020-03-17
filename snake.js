const canvs = document.getElementById("snake");
const contx = canvs.getContext("2d");

//creating the box unit of 32px
const box = 32;

//loading the images
const ground = new Image();
ground.src = "./img/ground.png";
const foodImage = new Image();
foodImage.src = "./img/apple(1).png";

//creating the snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

//audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const right = new Audio();
const left = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";

//creating the apple

let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
}

//control keys

let keyDirection;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && keyDirection != "RIGHT"){
        keyDirection = "LEFT";
        left.play();
    }else if(event.keyCode == 38 && keyDirection != "DOWN"){
        keyDirection = "UP";
        up.play();
    }else if(event.keyCode == 39 && keyDirection != "LEFT"){
        keyDirection = "RIGHT"
        right.play();
    }else if(event.keyCode == 40 && keyDirection != "UP"){
        keyDirection = "DOWN";
        down.play();
    }
}


//the score counter

let score = 0;

//drawing everthing on the canvas
function draw(){
    contx.drawImage(ground,0,0);

    for(let i = 0; i < snake.length; i++){
        contx.fillStyle = (i == 0)? "black": "red";
        contx.fillRect(snake[i].x,snake[i].y,box,box);

        contx.strokeStyle = 'red';
        contx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    contx.drawImage(foodImage, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    //check wich direction
    if(keyDirection == "LEFT"){
        snakeX -= box;
    }if(keyDirection == "UP"){
        snakeY -= box;
    }if(keyDirection == "RIGHT"){
        snakeX += box;
    }if(keyDirection == "DOWN"){
        snakeY += box;
    }


    //making the snake longer
    if (snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        }
    }else{
        //remove tail
        snake.pop();

    }
    //add the new head
        let newHead = {
            x: snakeX,
            y: snakeY
        }
    //collision
    function collision(head, array){
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }

    if (snakeX < box || snakeX > 17 * box || 
        snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
             
        clearInterval(game);
        dead.play();
        alert(`game over U a loose with the score of ${score}`);
         }

    

    

    snake.unshift(newHead);

    contx.fillStyle = "white";
    contx.font = "45px Changa one";
    contx.fillText(score, 2*box, 1.6*box);
    
}

let game = setInterval(draw, 100);