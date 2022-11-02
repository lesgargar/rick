


const tileMap = new TileMap(tileSize, map1);

const rick = tileMap.getRick(velocity);

tileMap.setCanvasSize(canvas);
// setInterval(gameLoop, 1000/75);
requestAnimationFrame(gameLoop)
function gameLoop(){
    tileMap.draw()
    rick.draw()
    requestAnimationFrame(gameLoop)
};


