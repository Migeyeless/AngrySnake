//GAME constants

let inputDir ={x:0,y:0};
const foodsound = new Audio('music/food.mp3');
const gameoversound=new Audio('music/gameover.mp3');
const movesound=new Audio('music/move.mp3');
const musicsound=new Audio('music/music.mp3');
let speed =  5;
let score = 0;
let lastPaintTime=0;
let snakearr = [
    {x: 13,y: 15}
]
food= {x: 6,y: 9};
block= {x: 4,y: 4};

//GAME Functions    
function main(ctime) {
   // console.log(ctime);
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return; 
    }
    lastPaintTime = ctime;
    gameEngine();

}
function isCollide(snake) {
    //When snake collide with itself
    for (let index = 1; index < snakearr.length; index++) {
        if(snake[index].x ===snake[0].x && snake[index].y ===snake[0].y ){
            return true;
        }    }
        // If snake collide with Boundary     
        if(snake[0].x >=18 || snake[0].x<=0 ||snake[0].y >=18 || snake[0].y<=0 /*|| (snake[0].y==4 &&snake[0].x==4 )*/){
            return true;
        
    } 
}

function gameEngine() {
    // PART 1 - Updating the snake array and food
    if(isCollide(snakearr)){
        speed = 5;
        gameoversound.play();
        musicsound.pause();
        inputDir = {x:0,y:0};
        alert("Game Over. Press any Key to Start Again");
        snakearr = [{x: 13,y: 15}];
        musicsound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score +=1;
        speed = speed+0.2;
        if (score>hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
hiscoreBox.innerHTML = "High Score:" +  hiscoreval; 


        }
        scoreBox.innerHTML = "Score:"+ score;
        snakearr.unshift({x:snakearr[0].x + inputDir.x, y:snakearr[0].y + inputDir.y });
        let a = 2;
        let b= 16; 
        food = {x: Math.round(a+(b-a)*Math.random()) ,y: Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake 
    for (let i = snakearr.length -2; i  >=0; i--) {

        snakearr[i+1] = {...snakearr[i]};
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //PART 2 - Display the snake and food
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
            
        }

        board.appendChild(snakeElement);

    }); 
//Display food
foodElement = document.createElement('div');
foodElement.style.gridRowStart=food.y;
foodElement.style.gridColumnStart=food.x;
foodElement.classList.add('food');
board.appendChild(foodElement);
}







/*MAIN LOGIC STARTS HERE*/
//Smusicsound.play();

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval = JSON.parse(hiscore);
hiscoreBox.innerHTML = "High Score:" +  hiscore; 
}





window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x: 0,y: 1}//start the game
    movesound.play();
    musicsound.play();
    switch (e.key) {
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0 ;
        inputDir.y= -1;

            
            break;
         case "ArrowDown":
            console.log("ArrowDown");
        inputDir.x= 0;
        inputDir.y= 1;
            
             break;
         case "ArrowLeft":
            console.log("Arrowleft");
        inputDir.x= -1;
        inputDir.y= 0;
            
            break;
         case "ArrowRight":
             console.log("ArrowRight");
        inputDir.x= 1;
        inputDir.y= 0;
                    
             break;
        default:
            break;
    }
})
