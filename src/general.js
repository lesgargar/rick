const tileSize = 50;
const velocity = 5;
let time = 12000


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');

const livesCounter = document.getElementById("lives-counter")

const timeCounter = document.getElementById("time-counter")


//movement of the character
const MovingDirection ={
    up:0,
    down:1,
    left:2,
    right:3,
};

let failCounter = 0;
let requestId;
const rickFront1 = new Image();
rickFront1.src = "../images/front1.png";
    
const rickFront2 = new Image();
rickFront2.src = "../images/front2.png";
    
const rickFront3 = new Image();
rickFront3.src = "../images/front1.png";

const rickFront4 = new Image();
rickFront4.src = "../images/front3.png";

const audio = new Audio();
audio.src = "../audio/music.mp3"
audio.loop = true;
audio.volume = 0.1;