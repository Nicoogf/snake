
const playBoard = document.querySelector(".play-board")

let gameOver = false ;
let foodX  , foodY ; 
let snakeX  = 5, snakeY= 10 ; 
let snakeBody= [] ;
let velocityX = 0 , velocityY = 0;
let setIntervalID ;

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

    if(e.key === "ArrowUp"){
        velocityX =  0;
        velocityY =  -1;
    }else if(e.key === "ArrowDown"){    // right
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft"){     //left
        velocityX = -1;
        velocityY =  0;
    }else if(e.key === "ArrowRight"){   // down
        velocityX = 1;
        velocityY = 0;
    }
    
}

const initGame = () =>{
    if(gameOver) return handleGameOver();

    let  htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"> </div>`

    if( snakeX === foodX && snakeY === foodY ){
        changeFoodPosition();
        snakeBody.push([foodX,foodY])  //Para pushear la posicion de la comida al cuerpo del skane
        console.log(snakeBody)
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
    }

 
    playBoard.innerHTML =  htmlMarkup;
}

changeFoodPosition();

setIntervalID = setInterval(initGame, 120)

document.addEventListener("keydown" , changueDirection)