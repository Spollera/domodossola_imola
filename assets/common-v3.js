
function qs(s){return document.querySelector(s)}
function qsa(s){return [...document.querySelectorAll(s)]}
function confetti(symbols=["❤️","🍂","✨","🍷","🫶"], count=35){
  for(let i=0;i<count;i++){
    const el=document.createElement("div");
    el.className="confetti";
    el.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left=Math.random()*100+"vw";
    el.style.fontSize=(16+Math.random()*12)+"px";
    el.style.animationDuration=(2.2+Math.random()*2.2)+"s";
    el.style.animationDelay=(Math.random()*.7)+"s";
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),5200);
  }
}
