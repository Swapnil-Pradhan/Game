const txt=".1vw 0vw .25vw #ffd8d8, .2vw 0vw .25vw #ffd8d8, .4vw 0vw .25vw #ffd8d8,  .1vw 0vw   0vw #f25757, .2vw 0vw   0vw #f25757, .4vw 0vw   0vw #f25757,  .1vw 0vw  .1vw #f25757, .2vw 0vw  .1vw #f25757, .4vw 0vw  .1vw #f25757,  .1vw 0vw   2vw #f25757, .2vw 0vw   2vw #f25757, .4vw 0vw   2vw #f25757,   .1vw 0vw   1vw #e50b0b, .2vw 0vw   1vw #e50b0b, .4vw 0vw   5vw #e50b0b,   .1vw 0vw   5vw #e50b0b, .2vw 0vw  20vw #e50b0b, .4vw 0vw  10vw #e50b0b,  .1vw 0vw  10vw #e50b0b, .2vw 0vw  30vw #e50b0b, .4vw 0vw  10vw #e50b0b",
play=document.getElementById("play"),
com=document.getElementById("cs"),
dy=document.getElementById("dy"),
hr=document.getElementById("hr"),
mn=document.getElementById("mn"),
sc=document.getElementById("sc");
let maxParticleCount=96, particleSpeed=2,
    toggleConfetti, removeConfetti, startConfetti, stopConfetti,
   timeleft, t1 = new Date("2024-09-27 00:00:00").getTime();

function pls(){
return (t1-Date.now())/1000;
}

if(pls()>0){
var interval = setInterval(function(){
dy.innerText=Math.round(pls()/86400);
hr.innerText=Math.round((pls()%86400)/3600);
sc.innerText=Math.round(((pls()%86400)%3600)%60);
if(parseInt(sc.innerText)<30){
mn.innerText=Math.round(((pls()%86400)%3600)/60)+1;
}else{
mn.innerText=Math.round(((pls()%86400)%3600)/60);
}
if(parseInt(sc.innerText)<10){
sc.innerText="0"+sc.innerText;
}
if(parseInt(mn.innerText)<10){
mn.innerText="0"+mn.innerText;
}
if(parseInt(hr.innerText)<10){
hr.innerText="0"+hr.innerText;
}
if(parseInt(dy.innerText)<10){
dy.innerText="0"+dy.innerText;
}
if(pls()<1){
startConfetti();
clearInterval(interval);
document.querySelectorAll("#j").forEach(m=>{
m.style.animation="over 2s linear";
setTimeout(()=>{
m.style.opacity="0";
play.style.display="flex";
play.style.opacity="0";
setTimeout(()=>{
m.style.display="none";
play.style.opacity="1";
stopConfetti();
}, 1000);
com.innerHTML="Out Now!";
}, 2000);
});
}
}, 1000);
}else{
document.querySelectorAll("#j").forEach(m=>{
m.style.animation="over 2s linear";
setTimeout(()=>{
m.style.opacity="0";
setTimeout(()=>{
m.style.display="none";
play.style.display="flex";
com.innerHTML="Out Now!";
}, 1000);
}, 2000);
});
}

setTimeout(()=>{
com.style.animation="flicker 3s linear";
com.style.animationTimingFunction="step-end";
setTimeout(()=>{
com.style.textShadow=txt;
com.style.color="snow";
play.style.opacity="1";
play.style.height="9vh";
play.style.width="34%";
}, 3000);
}, 800);

(function(){
startConfetti=startConfettiInner;
stopConfetti=stopConfettiInner;
toggleConfetti=toggleConfettiInner;
removeConfetti=removeConfettiInner;
let colors=["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson", "IndianRed"],
streamingConfetti=false,
animationTimer=null,
particles=[],
waveAngle=0;

function resetParticle(particle, width, height) {
particle.color=colors[(Math.random() * colors.length) | 0];
particle.x=Math.random()*width;
particle.y=Math.random()*height-height;
particle.diameter=Math.random()*10+5;
particle.tilt=Math.random()*10-10;
particle.tiltAngleIncrement=Math.random()*0.07+0.07;
particle.tiltAngle=0;
return particle;
}

function startConfettiInner(){
let width=window.innerWidth, height=window.innerHeight;
window.requestAnimFrame=(function(){
return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function (callback){
return window.setTimeout(callback, 16.6666667);
};
})();
let canvas=document.getElementById("confetti-canvas");
if (canvas===null){
canvas=document.createElement("canvas");
canvas.setAttribute("id", "confetti-canvas");
canvas.setAttribute("style", "display:block;z-index:9;pointer-events:none");
document.body.appendChild(canvas);
canvas.width=width;
canvas.height=height;
window.addEventListener("resize", function(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}, true);
}
let context=canvas.getContext("2d");
while (particles.length<maxParticleCount)
particles.push(resetParticle({}, width, height));
streamingConfetti=true;
if (animationTimer===null){
(function runAnimation(){
context.clearRect(0, 0, window.innerWidth, window.innerHeight);
if (particles.length===0)
animationTimer=null;
else{
updateParticles();
drawParticles(context);
animationTimer=requestAnimFrame(runAnimation);
}
})();
}
}

function stopConfettiInner(){
streamingConfetti=false;
}

function removeConfettiInner(){
stopConfetti();
particles=[];
}

function toggleConfettiInner(){
if(streamingConfetti)
stopConfettiInner();
else
startConfettiInner();
}

function drawParticles(context){
var particle;
var x;
for (var i=0; i<particles.length; i++){
particle=particles[i];
context.beginPath();
context.lineWidth=particle.diameter;
context.strokeStyle=particle.color;
x=particle.x+particle.tilt;
context.moveTo(x+particle.diameter/2, particle.y);
context.lineTo(x, particle.y+particle.tilt+particle.diameter/2);
context.stroke();
}
}

function updateParticles(){
let width=window.innerWidth, height=window.innerHeight, particle;
waveAngle+=0.01;
for(let i=0; i<particles.length; i++){
particle=particles[i];
if(!streamingConfetti && particle.y < -15)
particle.y=height+100;
else{
particle.tiltAngle+=particle.tiltAngleIncrement;
particle.x+=Math.sin(waveAngle);
particle.y+=(Math.cos(waveAngle)+particle.diameter+particleSpeed)*0.5;
particle.tilt=Math.sin(particle.tiltAngle)*15;
}
if(particle.x>width+20 || particle.x<-20 || particle.y>height){
if(streamingConfetti && particles.length<=maxParticleCount)
resetParticle(particle, width, height);
else {
particles.splice(i, 1);
i--;
}
}
}
}
})();

function idk(){
document.getElementById('boder').style.animation='stop 2s infinite alternate ease-in-out';
}

function idk2(){
document.getElementById('boder').style.animation='rotate 5s infinite ease-in-out'
}


