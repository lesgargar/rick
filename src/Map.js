/*we have a class named TileMap which is gonna build the map through a bidimentional array,
it will recieve the array, the images (inside constructor) 
and instructions about how to draw in canvas depending on what 
image represents an element in the array
*/
class TileMap{
    constructor(tileSize,map){
        this.tileSize = tileSize;

        this.floor = new Image()
        this.floor.src="../images/floor1.png"

        //here walls

        this.wall = new Image()
        this.wall.src = "../images/wall.jpg"

        this.map = map

        this.portal1 = new Image()
        this.portal1.src = "../images/portal0.png"
        this.portal2 = new Image()
        this.portal2.src =  "../images/portal1.png"
        this.portal = this.portal1
    }


// to start drawing we have to iterate trow the array by a nested "for loop"
    draw(ctx){
        for(let row = 0; row < this.map.length; row++){
            for(let column = 0; column < this.map[row].length; column++){
                let tile = this.map[row][column];
                if( tile === 1){
                    this.drawWall( column,row,this.tileSize);
                }
                else if (tile === 0){
                    this.drawFloor(column, row, this.tileSize)
                }else if(
                    tile === 2 ||
                    tile === 3 ||
                    tile === 5 ||
                    tile === 6 ||
                    tile === 7 ||
                    tile === 8 ||
                    tile === 9 
                    ){
                        this.drawPortal(column, row, this.tileSize)
                    }


            }
        }
    }

    drawFloor(column,row,size){
        ctx.drawImage(
            this.floor, 
            column * this.tileSize,
            row * this.tileSize,
            size, 
            size
            )
        
    }
    drawWall(column,row,size){
        ctx.drawImage(
            this.wall, 
            column * this.tileSize,
            row * this.tileSize,
            size, 
            size
            )
    }

    drawPortal(column,row,size){
        if(time % 8 === 0){
            this.portal =  this.portal === this.portal2 ? this.portal1 : this.portal2
        }
        ctx.drawImage(
            this.portal, 
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
                //change between the maps 
                if(tile === 2){
                    this.map = map1
                    this.floor.src="../images/floor1.png"
                    this.wall.src = "../images/wall.jpg"
                    livesCounter.innerHTML = Number(livesCounter.innerText)-1

                    return true
                }
                if(tile === 3){
                    this.map = map2
                    this.floor.src="../images/floor2.png"
                    this.wall.src = "../images/wall2.png"
                    return true
                }
                if(tile === 5){
                    this.map = map3
                    this.floor.src="../images/floor3.png"
                    this.wall.src = "../images/wall3.png"
                    return true
                }
                if(tile === 6){
                    this.map = map4
                    this.floor.src="../images/floor4.png"
                    this.wall.src = "../images/wall4.png"
                    return true
                }
                if(tile === 7){
                    this.map = map5
                    this.floor.src="../images/floor5.png"
                    this.wall.src = "../images/wall5.png"
                    return true
                }
                if(tile === 9){
                    this.map = map1

                    livesCounter.innerHTML = Number(livesCounter.innerText)-1

                    this.floor.src="../images/floor1.png"
                    this.wall.src = "../images/wall.jpg"
                    return true
                }
                if(tile === 8){
                    window.location.href = "win.html";
                    return true
                }


                return false
            }


        }
    }
}