var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var introduction = document.querySelector('#intro');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let tab = [];
let coordonate = {
    x : 0,
    y : 0
}
class Vector{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function Frame(tab){
    for (var i = 0; i < tab.lenght; i++){
        DrawPoint(tab[i].coordonateF, tab[i].size, tab[i].color);
    }
}
async function DrawPoint(coordonate, size, color) {
    ctx.beginPath();
    ctx.arc(coordonate.x, coordonate.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
async function Fall(coordonate, size){
    let coordonateF = new Vector;
    coordonateF.x = coordonate.x;
    coordonateF.y = coordonate.y;
    let velocity = new Vector(0, -7);
    let gravity = new Vector(0, 1.1);
    let dt = 1;
    let color = RandomColor();
    for (var i = 0; i < 1000; i++){
        coordonateF.y = coordonateF.y + (velocity.y * dt);
        velocity.y = velocity.y + (gravity.y * dt);
        let point = {
            coordonateF, size, color
        }
        tab.push (point);
        await sleep(50);
    }
}
function RandomColor() {
    let RGBA = [];
    for (let i = 0; i < 3; i++) {
        RGBA[i] = Math.round(Math.random() * 255);
    }
    RGBA[3] = 1;
    return "rgba(" + RGBA[0] + "," + RGBA[1]+ "," + RGBA[2] + "," + RGBA[3] + ")";
}
async function Rain(){
    let coordonate = new Vector;
    coordonate.y = 0;
    while (true){
        coordonate.x = Math.random() * window.innerWidth;
        Fall(coordonate, 10);
        await sleep(70);
    }
}
async function ClearCanvas() {
    while(true){
        void ctx.clearRect(0, 0, canvas.width, canvas.height);
        await sleep(50);
    }
}
introduction.addEventListener('click', function (tab) {
    introduction.classList.toggle('hide');
    Rain();
    Frame(tab);
    ClearCanvas();
})


