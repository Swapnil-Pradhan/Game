const txt=".1vw 0vw .25vw #ffd8d8, .2vw 0vw .25vw #ffd8d8, .4vw 0vw .25vw #ffd8d8,  .1vw 0vw   0vw #f25757, .2vw 0vw   0vw #f25757, .4vw 0vw   0vw #f25757,  .1vw 0vw  .1vw #f25757, .2vw 0vw  .1vw #f25757, .4vw 0vw  .1vw #f25757,  .1vw 0vw   2vw #f25757, .2vw 0vw   2vw #f25757, .4vw 0vw   2vw #f25757,   .1vw 0vw   1vw #e50b0b, .2vw 0vw   1vw #e50b0b, .4vw 0vw   5vw #e50b0b,   .1vw 0vw   5vw #e50b0b, .2vw 0vw  20vw #e50b0b, .4vw 0vw  10vw #e50b0b,  .1vw 0vw  10vw #e50b0b, .2vw 0vw  30vw #e50b0b, .4vw 0vw  10vw #e50b0b",
play=document.getElementById("play"),
com=document.getElementById("cs"),
dy=document.getElementById("dy"),
hr=document.getElementById("hr"),
mn=document.getElementById("mn"),
sc=document.getElementById("sc");
let t1 = new Date("2022-09-27 00:00:00").getTime();

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
document.querySelectorAll("#j").forEach(m=>{
m.style.animation="over 2s linear";
setTimeout(()=>{
m.style.opacity="0";
setTimeout(()=>{
m.style.display="none";
play.style.display="flex";
clearInterval(interval);
}, 1000);
}, 2000);
});
}
}, 1000);
}else{
document.querySelectorAll("#j").forEach(k=>{
k.style.animation="over 2s linear";
setTimeout(()=>{
k.style.opacity="0";
setTimeout(()=>{
k.style.display="none";
play.style.display="flex";
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
