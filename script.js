
const playBoard = document.querySelector(".play-board")


let foodX  , foodY ; 
let snakeX  = 5, snakeY= 10 ; 
let velocityX = 0 , velocityY = 0;

const changeFoodPosition = () =>{

    //Pasa al azar un valor entre 0 y 30 para la comida 

    foodX= Math.floor(Math.random() * 30) + 1 ;
    foodY= Math.floor(Math.random() * 30) + 1 ;
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
    let  htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"> </div>`

    if( snakeX === foodX && snakeY === foodY ){
        changeFoodPosition();
    }
    console.log(snakeX ,snakeY) 

    console.log(foodX ,foodY) 
    //Se actualiza la posicion del snake

    snakeX += velocityX;    
    snakeY += velocityY;

    htmlMarkup += `<div class="head" style="grid-area:${snakeY} / ${snakeX}"> </div>`
    playBoard.innerHTML =  htmlMarkup;
}

changeFoodPosition();

setInterval(initGame, 100)

document.addEventListener("keydown" , changueDirection)