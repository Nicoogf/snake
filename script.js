
const playBoard = document.querySelector(".play-board")

const changeFoodPosition = () =>{

    //Pasa al azar un valor entre 0 y 30 para la comida 

    foodX= Math.floor(Math.random() * 30) + 1 ;
    foodY= Math.floor(Math.random() * 30) + 1 ;
}


let foodX  , foodY ; 

const initGame = () =>{
    let  htmlMarkup = `<div class="food" style="grid-area:${foodY} / ${foodX}"> </div>`
    playBoard.innerHTML =  htmlMarkup;
}

changeFoodPosition();
initGame();
