


const tileMap = new TileMap(tileSize, map1);

const rick = tileMap.getRick(velocity);
const button = document.getElementById("play")


button.onclick = startGame

tileMap.setCanvasSize(canvas);
// setInterval(gameLoop, 1000/75);


function getSeconds(){
    timeCounter.innerHTML =  Math.floor((time/100))
}
function startGame(){
    if(!requestId){
        audio.play()
        requestId = requestAnimationFrame(gameLoop)
    }
}
function gameLoop(){
    time --
    tileMap.draw()
    rick.draw()
    
    getSeconds()
    if(Number(livesCounter.innerText) <= 0 || time <=0){
        audio.pause()
        requestId = undefined
        window.location.href = "lost.html";
    }
    if(requestId){
        requestAnimationFrame(gameLoop)
    }
    
};


addEventListener("keydown",(event)=>{
if(event.keyCode == 49){
    window.location.href = "win.html";
}
if(event.keyCode == 50){
    window.location.href = "lost.html";
}
})


