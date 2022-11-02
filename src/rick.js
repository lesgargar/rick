class Rick {
    constructor(x,y, tileSize, velocity, tileMap){
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.loadRickImages();

        this.currentMovingDirection = null;
        this. requestedMovingDirection = null;

        //animation
        this.rickAnimationTimerDefault = 10;
        this.rickAnimationTimer = null;
        this.isWalk = false

        document.addEventListener("keydown", this.keydown)
        document.addEventListener("keyup", this.keyup)

        }
        //here indicated how to draw the character 
        draw(){
            if(this.isWalk){
                this.move();
            }
            this.animate();
            ctx.drawImage(
                this.rickImages[this.rickImageIndex], 
                this.x, 
                this.y, 
                this.tileSize, 
                this.tileSize
                )
        }
        
        //images front side of character 
        loadRickImages(){
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
        keydown =(event)=>{
            //up 
            if(event.keyCode == 38){
                rickFront1.src = "../images/back1.png";
                rickFront2.src = "../images/back2.png";
                rickFront3.src = "../images/back1.png";
                rickFront4.src = "../images/back3.png";

                this.rickImages = [
                    rickFront1,
                    rickFront2,
                    rickFront3,
                    rickFront4
                ];
                this.requestedMovingDirection = MovingDirection.up;
                this.isWalk = true;
            }
            //down
            if(event.keyCode == 40){
                rickFront1.src = "../images/front1.png";
                rickFront2.src = "../images/front2.png";
                rickFront3.src = "../images/front1.png";
                rickFront4.src = "../images/front3.png";

                this.rickImages = [
                    rickFront1,
                    rickFront2,
                    rickFront3,
                    rickFront4
                ];

                this.requestedMovingDirection = MovingDirection.down;
                this.isWalk = true;
            }
            //left
            if(event.keyCode == 37){
                rickFront1.src = "../images/left1.png";
                rickFront2.src = "../images/left2.png";
                rickFront3.src = "../images/left1.png";
                rickFront4.src = "../images/left3.png";

                this.rickImages = [
                    rickFront1,
                    rickFront2,
                    rickFront3,
                    rickFront4
                ];

                this.requestedMovingDirection = MovingDirection.left;
                this.isWalk = true;
            }
            //right
            if(event.keyCode == 39){
                rickFront1.src = "../images/right1.png";
                rickFront2.src = "../images/right2.png";
                rickFront3.src = "../images/right1.png";
                rickFront4.src = "../images/right3.png";

                this.rickImages = [
                    rickFront1,
                    rickFront2,
                    rickFront3,
                    rickFront4
                ];

                this.requestedMovingDirection = MovingDirection.right;
                this.isWalk = true;
            }
        }

        keyup = (event)=>{
            if(event.keyCode == 38 || 
                event.keyCode == 40 ||
                event.keyCode == 37 ||
                event.keyCode == 39){
                    this.isWalk = false 
                }
        }

        move(){
            if(this.currentMovingDirection !== this.requestedMovingDirection){
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
                console.log("k pasa")
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
              
            }
        }

        animate(){
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

