//----Declare global variables for tracking game board size----
const LINE_PIXEL_COUNT = 40
const TOTAL_PIXEL_COUNT = LINE_PIXEL_COUNT**2

//------Track scores------
let totalFoodEaten = 0
let totalDistanceTraveled = 0

//-----Shorten reference to game board-----
const gameContainer = document.getElementById('gameContainer')

//-----Generate game board-----
const createGameBoardPixels = () => {
    for(let i = 1; i <= TOTAL_PIXEL_COUNT; i++){
        gameContainer.innerHTML = `${gameContainer.innerHTML} <div class = "gameBoardPixel" id = "pixel${i}"></div>`
    }
}

//-----Shorten reference to game pixels-----
const gameBoardPixels = document.getElementsByClassName('gameBoardPixel')


//------Randomly generated food items on board------
let currentFoodPosition = 0
const createFood = () => {
    gameBoardPixels[currentFoodPosition].classList.remove("food")
    currentFoodPosition = Math.floor(Math.random()*TOTAL_PIXEL_COUNT)
    gameBoardPixels[currentFoodPosition].classList.add("food")
}

//------Setting up snake behavior-------

//---Directions----
const LEFT_DIR = 37
const UP_DIR = 38
const RIGHT_DIR = 39
const DOWN_DIR = 40

let snakeCurrentDirection = RIGHT_DIR

//---Confirming validity of user input and change snake direction---
const changeDirection = newDirectionCode => {
    if(newDirectionCode == snakeCurrentDirection) return;
    if(newDirectionCode == LEFT_DIR && snakeCurrentDirection !== RIGHT_DIR){
        snakeCurrentDirection = newDirectionCode
    }else if(newDirectionCode == UP_DIR && snakeCurrentDirection !== DOWN_DIR){
        snakeCurrentDirection = newDirectionCode
    }else if(newDirectionCode == RIGHT_DIR && snakeCurrentDirection !== LEFT_DIR){
        snakeCurrentDirection = newDirectionCode
    }else if(newDirectionCode == DOWN_DIR && snakeCurrentDirection !== UP_DIR){
        snakeCurrentDirection = newDirectionCode
    }
}

//---Starting point for snake---
let currentHeadPosition = TOTAL_PIXEL_COUNT / 2

//---Starting length for snake---
let snakeLength = 300

//---Moving snake, wraps to other side of screen if necessary---
const moveSnake = () => {
    switch(snakeCurrentDirection){
        case LEFT_DIR:
          --currentHeadPosition
          const isHeadAtLeft = currentHeadPosition % LINE_PIXEL_COUNT == LINE_PIXEL_COUNT - 1 || currentHeadPosition < 0
          if(isHeadAtLeft){
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
          };
        break;
        case RIGHT_DIR:
            ++currentHeadPosition
            const isHeadAtRight = currentHeadPosition % LINE_PIXEL_COUNT == 0
            if(isHeadAtRight){
                currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT
            }         
        break;
        case UP_DIR:
            currentHeadPosition = currentHeadPosition - LINE_PIXEL_COUNT 
            const isHeadAtTop = currentHeadPosition < 0
            if(isHeadAtTop){
                currentHeadPosition = currentHeadPosition + TOTAL_PIXEL_COUNT
            }
        break;
        case DOWN_DIR:
            currentHeadPosition = currentHeadPosition + LINE_PIXEL_COUNT
            const isHeadAtBottom = currentHeadPosition > TOTAL_PIXEL_COUNT - 1
            if(isHeadAtBottom){
                currentHeadPosition = currentHeadPosition - TOTAL_PIXEL_COUNT
            }
        break;
        default:
        break;
    }
    //---Accessing correct pixel within HTML collection---
    let nextSnakeHeadPixel = gameBoardPixels[currentHeadPosition]
    //--- Check if snake head will intersect with own body ---
    if(nextSnakeHeadPixel.classList.contains("snakeBodyPixel")){
        clearInterval(moveSnakeInterval)
        alert(`You have eaten ${totalFoodEaten} and traveled ${totalDistanceTraveled} blocks.`)
        window.location.reload()
    }

    //--- If empty pixel, add snake body styling ---
    nextSnakeHeadPixel.classList.add("snakeBodyPixel")
}

//Initialize game at start up
createGameBoardPixels();
createFood();
let moveSnakeInterval = setInterval(moveSnake, 100)