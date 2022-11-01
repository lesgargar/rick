class Rick {
    constructor(x,y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.#loadRickImages();

        this.currentMovingDirection = null;
        this. requestedMovingDirection = null;

        //animation
        this.rickAnimationTimerDefault = 10;
        this.rickAnimationTimer = null;

        document.addEventListener("keydown", this.#keydown)

        }
        //here indicated how to draw the character 
        draw(){
            this.#move();
            this.#animate();
            ctx.drawImage(
                this.rickImages[this.rickImageIndex], 
                this.x, 
                this.y, 
                this.tileSize, 
                this.tileSize
                )
        }
        
        #loadRickImages(){
            const rickFront1 = new Image();
            rickFront1.src = "images/front1.png";
        
            const rickFront2 = new Image();
            rickFront2.src = "images/front2.png";
        
            const rickFront3 = new Image();
            rickFront3.src = "images/front1.png";

            const rickFront4 = new Image();
            rickFront4.src = "images/front3.png";

            this.rickImages = [
                rickFront1,
                rickFront2,
                rickFront3,
                rickFront4
            ];

            this.rickImageIndex = 0;
        }

        //keydown says, if an specific key is pressed, will check what is the current direction
        //and assign the new direction according to the key pressed
        #keydown =(event)=>{
            //up 
            if(event.keyCode == 38){
                if(this.currentMovingDirection == MovingDirection.down){
                    this.currentMovingDirection = MovingDirection.up;
                }
                this.requestedMovingDirection = MovingDirection.up;
            }
            //down
            if(event.keyCode == 40){
                if(this.currentMovingDirection == MovingDirection.up){
                    this.currentMovingDirection = MovingDirection.down;
                }
                this.requestedMovingDirection = MovingDirection.down;
            }
            //left
            if(event.keyCode == 37){
                if(this.currentMovingDirection == MovingDirection.right){
                    this.currentMovingDirection = MovingDirection.left;
                }
                this.requestedMovingDirection = MovingDirection.left;
            }
            //right
            if(event.keyCode == 39){
                if(this.currentMovingDirection == MovingDirection.left){
                this.currentMovingDirection = MovingDirection.right;
                }
                this.requestedMovingDirection = MovingDirection.right;
            }
        }

        #move(){
            if(this.currentMovingDirection !== this.requestedMovingDirection){
                console.log("pero1",Number.isInteger(this.y/this.tileSize))

                if( 
                Number.isInteger(this.x/this.tileSize) && 
                Number.isInteger(this.y/this.tileSize)
                ){
                    if(
                        !this.tileMap.didCollideWithEnviroment(
                            this.x, 
                            this.y, 
                            this.requestedMovingDirection
                        )
                    )

                    this.currentMovingDirection = this.requestedMovingDirection;
                    
                }
            } 
        // check if my character collides with walls
            if(this.tileMap.didCollideWithEnviroment(
                this.x,
                this.y, 
                this.currentMovingDirection
                )
            ){
                return;
            }
            else if(this.currentMovingDirection != null && 
                this.rickAnimationTimer == null){
                    this.rickAnimationTimer = this.rickAnimationTimerDefault;
            }
    //The next switch makes the character move trough x and y (up, down, left, right)
            switch(this.currentMovingDirection){
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;
                case MovingDirection.down:
                    this.y += this.velocity;
                    break;
                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;
                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
                default:
                    this.y = this.y
                    this.x=this.x
                    break
            }
        }

        #animate(){
        if(this.rickAnimationTimer == null){
            return; //will do nothing
        }
        this.rickAnimationTimer--;
        if(this.rickAnimationTimer == 0){
            this.rickAnimationTimer = this.rickAnimationTimerDefault;
            this.rickImageIndex ++;
            if(this.rickImageIndex == this.rickImages.length){
                this.rickImageIndex = 0;
            }
        }
    }
}

