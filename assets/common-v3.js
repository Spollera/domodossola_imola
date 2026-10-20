
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


/* =========================================================
   CASA SERENI — UPDATE DOTS
   Mostra un pallino rosso finché Pioggia non apre la pagina aggiornata.
   Lo stato "visto" resta salvato solo sul dispositivo/browser utilizzato.
========================================================= */
(function(){
  const UPDATES = [
    {
      id:"event-20261020-v1",
      target:"eventi/2026-10-20-festeggiamento.html",
      section:"index.html"
    },
    {
      id:"contract-proroga02-v1",
      target:"proroga-02.html",
      section:"contratto.html"
    }
  ];

  const seenKey = id => "cs_seen_update_" + id;

  function cleanPath(value){
    if(!value) return "";
    try{
      const u = new URL(value, window.location.href);
      let p = u.pathname.replace(/^\/+/, "");
      const marker = "domodossola_imola/";
      const i = p.indexOf(marker);
      if(i >= 0) p = p.slice(i + marker.length);
      return p || "index.html";
    }catch(e){
      return value.split("?")[0].split("#")[0].replace(/^\.\//,"").replace(/^\.\.\//,"");
    }
  }

  const current = cleanPath(window.location.href);

  UPDATES.forEach(update=>{
    if(current === update.target){
      localStorage.setItem(seenKey(update.id),"1");
    }
  });

  function addDot(anchor, updateId){
    if(!anchor || anchor.querySelector('.cs-update-dot[data-update-id="'+updateId+'"]')) return;
    anchor.classList.add("cs-has-update");
    const dot=document.createElement("span");
    dot.className="cs-update-dot";
    dot.dataset.updateId=updateId;
    dot.setAttribute("aria-label","Nuovo aggiornamento");
    anchor.appendChild(dot);
  }

  function renderDots(){
    document.querySelectorAll(".cs-update-dot").forEach(d=>d.remove());
    document.querySelectorAll(".cs-has-update").forEach(a=>a.classList.remove("cs-has-update"));

    const anchors=[...document.querySelectorAll("a[href]")];

    UPDATES.forEach(update=>{
      if(localStorage.getItem(seenKey(update.id))==="1") return;

      anchors.forEach(a=>{
        const href=cleanPath(a.getAttribute("href"));
        if(href===update.target || href===update.section){
          addDot(a,update.id);
        }
      });
    });
  }

  renderDots();

  const observer=new MutationObserver(()=>{
    clearTimeout(window.__csDotTimer);
    window.__csDotTimer=setTimeout(renderDots,30);
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
