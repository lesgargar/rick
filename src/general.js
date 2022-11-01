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