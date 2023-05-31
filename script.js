
const playBoard = document.querySelector(".play-board")

const changeFoodPosition = () =>{

    //Pasa al azar un valor entre 0 y 30 para la comida 

    foodX= Math.floor(Math.random() * 30) + 1 ;
    foodY= Math.floor(Math.random() * 30) + 1 ;
}


let foodX  , foodY ; 
let snakeX  = 5, snakeY= 10 ; 
let velocityX = 0 , velocityY = 0;

const changueDirection = (e) =>{

    //Cambia el valor de la velocidad con la pulsación de tecla

    if(e.key === "ArrowUp"){
        velocityX = -1;
        velocityY =  0;
    }else if(e.key === "ArrowRight"){    // right
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft"){     //left
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown"){   // down
        velocityX = 1;
        velocityY = 0;
    }
    initGame()
}

const initGame = () =>{
    let  htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"> </div>`

    //Se actualiza la posicion del snake

    snakeX += velocityX;    
    snakeY += velocityY;

    htmlMarkup += `<div class="head" style="grid-area:${snakeX} / ${snakeY}"> </div>`
    playBoard.innerHTML =  htmlMarkup;
}

changeFoodPosition();
initGame();


document.addEventListener("keydown" , changueDirection)