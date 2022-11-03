


const tileMap = new TileMap(tileSize, map1);

const rick = tileMap.getRick(velocity);



tileMap.setCanvasSize(canvas);
// setInterval(gameLoop, 1000/75);
requestId = requestAnimationFrame(gameLoop)

function getSeconds(){
    timeCounter.innerHTML =  Math.floor((time/100))
}

function gameLoop(){
    time --
    tileMap.draw()
    rick.draw()
    
    getSeconds()
    if(Number(livesCounter.innerText) <= 0 || time <=0){
        requestId = undefined
        window.location.href = "lost.html";
    }
    if(requestId){
        requestAnimationFrame(gameLoop)
    }
    
};


