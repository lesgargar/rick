


const tileMap = new TileMap(tileSize);

const rick = tileMap.getRick(velocity);

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);

function gameLoop(){
    tileMap.draw()
    rick.draw()
};


