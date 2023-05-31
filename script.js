
const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")

let gameOver = false ;
let foodX  , foodY ; 
let snakeX  = 5, snakeY= 10 ; 
let snakeBody= [] ;
let velocityX = 0 , velocityY = 0;
let setIntervalID ;
let score = 0 ;


let highScore = localStorage.getItem("high-score") || 0;  //El puntaje 
highScoreElement.innerText = `High Score : ${highScore}`
 
const changeFoodPosition = () =>{

    //Pasa al azar un valor entre 0 y 30 para la comida 

    foodX= Math.floor(Math.random() * 30) + 1 ;
    foodY= Math.floor(Math.random() * 30) + 1 ;
}


const handleGameOver = () =>{
    //Se limpia el timer y se recarga cuando  gameover es true
    clearInterval(setIntervalID)
    alert("Game Over! Press OK To replay...")
    location.reload()
}

const changueDirection = (e) =>{

    //Cambia el valor de la velocidad con la pulsación de tecla

    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX =  0;
        velocityY =  -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){    
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){     
        velocityX = -1;
        velocityY =  0;
    }else if(e.key === "ArrowRight" && velocityX != -1){   
        velocityX = 1;
        velocityY = 0;
    }
    
}

controls.forEach( key =>{
    key.addEventListener("click" , () => changueDirection({
        key: key.dataset.key
    }))
})

const initGame = () =>{
    if(gameOver) return handleGameOver();

    let  htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"> </div>`

    if( snakeX === foodX && snakeY === foodY ){
        changeFoodPosition();
        snakeBody.push([foodX,foodY])  //Para pushear la posicion de la comida al cuerpo del skane
        score ++ ;  //Incrementa puntaje en 1

        highScore = score >= highScore ? 
                    score : highScore;


        localStorage.setItem("high-score" , highScore)



        scoreElement.innerText = `Score : ${score}`
        highScoreElement.innerText = `High Score : ${highScore}`
    }
  
    for(let i = snakeBody.length -1 ; i > 0; i--){
        snakeBody[i] = snakeBody [ i - 1 ] // Se desplaza hacia adelante los valores del elemento del body
   }


    snakeBody[0] = [snakeX, snakeY] // Se setea el primer elemento


    //Se actualiza la posicion del snake
    snakeX += velocityX;    
    snakeY += velocityY;


    //Validacion para cuando la cabeza del snake salga del Board
    if( snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver =  true ;
    }

    for(let i = 0 ; i < snakeBody.length; i++ ){
        //Se agrega un div al cuerpo del snake
        htmlMarkup += `<div class="head" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"> </div>`
     
      //Validacion para cuando el snake choque con si mismo 
        if( i !== 0  && snakeBody[0][1] === snakeBody[i][1] &&  snakeBody[0][0] === snakeBody[i][0] ){
        gameOver =  true ;
     }
    }

 
    playBoard.innerHTML =  htmlMarkup;
}

changeFoodPosition();

setIntervalID = setInterval(initGame, 120)

document.addEventListener("keydown" , changueDirection)