/*we have a class named TileMap which is gonna build the map through a bidimentional array,
it will recieve the array, the images (inside constructor) 
and instructions about how to draw in canvas depending on what 
image represents an element in the array
*/
class TileMap{
    constructor(tileSize){
        this.tileSize = tileSize;

        this.floor = new Image()
        this.floor.src="../images/floor.jpeg"

        this.wall = new Image()
        this.wall.src = "../images/wall.jpg"
    //aqui las imagenes de los portales y obstaculos

    }

/* map 1
number 1 = wall
number 0 = floor
number 4 = rick
number 2 = portal to map 1
number 3 = portal to map 2
number 5 = portal to map 3
number 6 = portal to map 4
number 7 = portal to map 5
number 8 = portal to win the game 
*/
map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,0,0,4,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,1,1,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

// to start drawing we have to iterate trow the array by a nested "for loop"
    draw(ctx){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if( tile === 1){
                    this.#drawWall( column,row,this.tileSize);
                }
                else if (tile === 0){
                    this.#drawFloor(column, row, this.tileSize)
                }// aqui se declaran los portales         
            }
        }
    }

    #drawFloor(column,row,size){
        ctx.drawImage(
            this.floor, 
            column * this.tileSize,
            row * this.tileSize,
            size, 
            size
            )
    }
    #drawWall(column,row,size){
        ctx.drawImage(
            this.wall, 
            column * this.tileSize,
            row * this.tileSize,
            size, 
            size
            )
    }

    getRick(velocity){
        for( let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if(tile === 4){
                    this.map[row][column] = 0;
                    return new Rick(
                        column * this.tileSize, 
                        row * this.tileSize, 
                        this.tileSize,
                        velocity,
                        this
                        );
                }
            }
            
        }
    }

    setCanvasSize(canvas){
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    // collitions 
    didCollideWithEnviroment(x,y,direction){
        if(
            Number.isInteger(x/this.tileSize) && 
            Number.isInteger(y/this.tileSize)
        ){
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch(direction){
                case MovingDirection.right: 
                    nextColumn = x + this.tileSize;
                    column = nextColumn /this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.left: 
                    nextColumn = x - this.tileSize;
                    column = nextColumn /this.tileSize;
                    row = y / this.tileSize;
                    break;
                case MovingDirection.up: 
                    nextRow = y - this.tileSize;
                    row = nextRow /this.tileSize;
                    column = x / this.tileSize;
                    break;
                case MovingDirection.down: 
                    nextRow = y + this.tileSize;
                    row = nextRow /this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][column];
            if(tile === 1) {
                return true;
            }else {
                return false
            }
        }
    }
}