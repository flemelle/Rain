var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var introduction = document.querySelector('#intro');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let tab = [];

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
class Drop{
    constructor(X, Y, size, color, velocity){
        this.X = X;
        this.Y = Y;
        this.size = size;
        this.color = color;
        this.velocity = velocity;
    }
}
function drawPoint(tab) {
    ctx.beginPath();
    ctx.arc(tab.X, tab.Y, tab.size, 0, 2 * Math.PI);
    ctx.fillStyle = tab.color;
    ctx.fill();
}

function randomColor() {
    let RGBA = [];
    RGBA[0] = 0;
    RGBA[1] = Math.round(Math.random() * 100);
    RGBA[2] = Math.round(Math.random() * 215) + 40;
    RGBA[3] = (Math.random() * 5) + 0.5;
    return "rgba(" + RGBA[0] + "," + RGBA[1]+ "," + RGBA[2] + "," + RGBA[3] + ")";
}

introduction.addEventListener('click', function () {
    introduction.classList.toggle('hide');
    animation(tab);
})

function innitiateFall(tab){
    let drop = new Drop;
    drop.X = Math.random()*window.innerWidth;
    drop.Y = -10;
    drop.size = 9;
    drop.velocity = -10;
    drop.color = randomColor();
    tab.push(drop);
}

function fall(tab){
    for (var i = 0; i <tab.length; i++){
        if (tab[i].Y < (window.innerHeight + 20)){
            drawPoint(tab[i]);
            gravity(tab[i]);
        }
        else {
            tab.splice(i, 1);
        }
    }
}

function gravity(tab){
    let gravity = 1.1;
    let dt = 0.1;
    tab.Y = tab.Y + (tab.velocity * dt);
    tab.velocity = tab.velocity + (gravity * dt);
}

function ClearCanvas() {
    void ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function animation(tab){
    setInterval(ClearCanvas, 8);
    setInterval(innitiateFall, 8, tab);
    setInterval(fall, 8, tab);
}