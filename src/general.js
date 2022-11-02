const tileSize = 40;
const velocity = 1;



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');


//movement of the character
const MovingDirection ={
    up:0,
    down:1,
    left:2,
    right:3,
};

const rickFront1 = new Image();
    rickFront1.src = "../images/front1.png";
        
    const rickFront2 = new Image();
    rickFront2.src = "../images/front2.png";
        
    const rickFront3 = new Image();
    rickFront3.src = "../images/front1.png";
        
    const rickFront4 = new Image();
    rickFront4.src = "../images/front3.png";