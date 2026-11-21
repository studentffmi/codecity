'use strict';
const topicCards=[
['01','Змінні, типи даних і найпростіші команди','print(), input(), присвоювання, int, float, str, bool та перші програми.','⊞','topics/zminni-prysvoiuvannia-typy-danykh.html'],
['02','Консольні проєкти з арифметичними обчисленнями','Введення даних, обчислення, задачі з реального життя.','∑','topics/konsolni-aryfmetychni-obchyslennia.html'],
['03','Консольні проєкти з розгалуженнями','if, elif, else та умови, які допомагають програмі приймати рішення.','⑂','topics/konsolni-proiekty-rozghaluzhennia-eksperyment.html'],
['04','Підпрограми, аргументи та результати','Власні функції, параметри, аргументи, return.','ƒ','topics/pidprohramy-arhumenty-rezultaty.html'],
['05','Віконні проєкти: властивості й події','Tkinter, обробники подій, властивості вікна та реакція на дії.','▣','topics/vikonni-proiekty-vikno-vlastyvosti.html'],
['06','Віконні проєкти для графічних зображень','Canvas, координати, кольори, графічні фігури та творчі завдання.','◈','topics/canvas-hrafichni-zobrazhennia.html']
];
const seoPages=[
['Програма. Мови програмування','topics/prohrama-movy-prohramuvannia.html'],['Середовища створення проєктів','topics/seredovyshcha-stvorennia-proiektiv.html'],['Змінні, присвоювання й типи даних','topics/zminni-prysvoiuvannia-typy-danykh.html'],['Консольні проєкти та арифметика','topics/konsolni-aryfmetychni-obchyslennia.html'],['Розгалуження if, else','topics/rozghaluzhennia-if-else.html'],['Консольні проєкти з розгалуженнями','topics/konsolni-proiekty-rozghaluzhennia-eksperyment.html'],['Підпрограми з аргументами й результатами','topics/pidprohramy-arhumenty-rezultaty.html'],['Практика з підпрограмами','topics/praktychna-robota-3-pidprohramy-rozghaluzhennia.html'],['Віконні проєкти','topics/vikonni-proiekty-vikno-vlastyvosti.html'],['Події з вікном та обробники подій','topics/podii-z-viknom-obrobnyk-podii.html'],['Вікна повідомлень tkinter','topics/vikna-povidomlen-tkinter.html'],['Змінення властивостей вікна','topics/praktychna-robota-4-vlastyvosti-povidomlennia.html'],['Графічні зображення Canvas','topics/canvas-hrafichni-zobrazhennia.html'],['Навчальні проєкти Python','topics/navchalni-proiekty-python.html']
];
const slides=[['Головний екран','6 тем і навчальна карта'],['Шість незалежних тем','Кожна тема — окрема гра'],['Підсумкові випробування','Контрольна та проєкти'],['Рівні CODE CITY','Прогрес учня та навігація'],['Теоретичні матеріали','Пояснення команд і приклади'],['Інтерактивна демонстрація','Результат змінюється разом із введенням'],['Складання Python-коду','Команди, консоль та перевірка'],['Інструкція для вчителя','Методика й компетентності'],['Навчальний маршрут','Теми згідно календарного планування'],['Підсумкова контрольна','12 різнорівневих завдань'],['Проєктна лабораторія','5 варіантів на вибір'],['Етапи проєкту','Від планування до захисту']];
document.querySelector('#topicCards').innerHTML=topicCards.map(x=>`<article class="topic"><small>ТЕМА ${x[0]}</small><span class="sym" aria-hidden="true">${x[3]}</span><h3>${x[1]}</h3><p>${x[2]}</p><a href="${x[4]}">Переглянути тему ↗</a></article>`).join('');
document.querySelector('#seoTopics').innerHTML=seoPages.map(x=>`<a href="${x[1]}">${x[0]} <span aria-hidden="true">↗</span></a>`).join('');
const slidesEl=document.querySelector('#gallerySlides'),dotsEl=document.querySelector('#dots');
slidesEl.innerHTML='<img class="slide active" id="singleGalleryImage" src="assets/screen-01.webp" alt="CODE CITY — Головний екран" loading="eager">';
dotsEl.innerHTML=slides.map((x,i)=>'<button class="dot '+(i===0?'active':'')+'" type="button" data-i="'+i+'" aria-label="Скриншот '+(i+1)+'" aria-pressed="'+(i===0)+'"></button>').join('');
let active=0,carouselBusy=false,carouselTimer=null,carouselToken=0,lastFocus=null,tx=null;
const img=document.getElementById('singleGalleryImage'), dots=[...document.querySelectorAll('.dot')],vp=document.querySelector('#viewport'),overlay=document.querySelector('#overlay');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function updateGalleryUi(){
 const slide=slides[active];
 img.alt='CODE CITY — '+slide[0];
 dots.forEach((d,i)=>{d.classList.toggle('active',i===active);d.setAttribute('aria-pressed',String(i===active))});
 document.querySelector('#galleryTitle').textContent=slide[0];
 document.querySelector('#galleryDetail').textContent=slide[1];
 document.querySelector('#counter').textContent=String(active+1).padStart(2,'0')+' / '+slides.length
}
function show(n,animate=true){
 const target=(n+slides.length)%slides.length;
 if(target===active||carouselBusy)return;
 const src='assets/screen-'+String(target+1).padStart(2,'0')+'.webp';
 if(reduced||!animate){carouselToken++;active=target;img.src=src;img.classList.remove('is-fading');updateGalleryUi();return}
 carouselBusy=true;
 const request=++carouselToken;
 const pre=new Image();
 pre.onload=()=>{
  if(request!==carouselToken)return;
  img.classList.add('is-fading');
  setTimeout(()=>{
   if(request!==carouselToken)return;
   active=target;img.src=src;updateGalleryUi();
   void img.offsetWidth;
   img.classList.remove('is-fading');
   setTimeout(()=>{if(request===carouselToken)carouselBusy=false},200)
  },175)
 };
 pre.onerror=()=>{if(request===carouselToken)carouselBusy=false};
 pre.src=src
}
function stopCarousel(){if(carouselTimer!==null){clearInterval(carouselTimer);carouselTimer=null}}
function startCarousel(){
 stopCarousel();
 if(!document.hidden&&!reduced&&!overlay.classList.contains('show'))carouselTimer=setInterval(()=>show(active+1),2000)
}
function manualGallery(d){if(carouselBusy)return;show(active+d);startCarousel()}
document.querySelector('#prev').addEventListener('click',()=>manualGallery(-1));
document.querySelector('#next').addEventListener('click',()=>manualGallery(1));
dots.forEach(d=>d.addEventListener('click',()=>{if(carouselBusy)return;show(Number(d.dataset.i));startCarousel()}));
vp.addEventListener('touchstart',event=>{tx=event.changedTouches[0].clientX},{passive:true});
vp.addEventListener('touchend',event=>{if(tx===null)return;const diff=event.changedTouches[0].clientX-tx;tx=null;if(Math.abs(diff)>55)manualGallery(diff<0?1:-1)},{passive:true});
vp.addEventListener('keydown',event=>{if(event.key==='ArrowLeft')manualGallery(-1);if(event.key==='ArrowRight')manualGallery(1);if(event.key==='Enter')openZoom()});
function openZoom(){
 stopCarousel();carouselToken++;carouselBusy=false;img.classList.remove('is-fading');
 lastFocus=document.activeElement;
 document.querySelector('#zoomImg').src='assets/screen-'+String(active+1).padStart(2,'0')+'.webp';
 overlay.classList.add('show');document.body.classList.add('no-scroll');document.querySelector('#closeOverlay').focus()
}
function closeZoom(){
 overlay.classList.remove('show');document.body.classList.remove('no-scroll');
 if(lastFocus&&typeof lastFocus.focus==='function')lastFocus.focus();else vp.focus();
 startCarousel()
}
vp.addEventListener('click',openZoom);
overlay.addEventListener('click',event=>{if(event.target===overlay)closeZoom()});
document.querySelector('#closeOverlay').addEventListener('click',closeZoom);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&overlay.classList.contains('show'))closeZoom()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopCarousel();else startCarousel()});
updateGalleryUi();startCarousel();

(function setupVideoPlay(){
 const player=document.querySelector('.video-media video'),button=document.getElementById('videoPlayOverlay');
 if(!player||!button)return;
 button.addEventListener('click',()=>{player.play().catch(()=>{button.hidden=false})});
 player.addEventListener('playing',()=>{button.hidden=true});
 player.addEventListener('pause',()=>{button.hidden=false});
 player.addEventListener('ended',()=>{button.hidden=false});
 if(!player.paused)button.hidden=true
})();

const menu=document.querySelector('#menuBtn'),nav=document.querySelector('#mainNav');menu.addEventListener('click',()=>{let v=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(v));menu.textContent=v?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
// Персональний 24-годинний відлік від першого відкриття сторінки.
// Зберігається між перезавантаженнями й не починається наново після завершення.
// Фактична ціна та строк дії пропозиції мають відповідати умовам у WayForPay.
const OFFER_DURATION_MS=24*60*60*1000;
const OFFER_STORAGE_KEY='codecity-offer-first-visit-24h-v1';
const offerStartedAt=(()=>{
  const now=Date.now();
  try{
    const saved=Number(localStorage.getItem(OFFER_STORAGE_KEY));
    if(Number.isFinite(saved)&&saved>0&&saved<=now) return saved;
    localStorage.setItem(OFFER_STORAGE_KEY,String(now));
  }catch(_){ /* Локальне сховище може бути заблоковане браузером. */ }
  return now;
})();
const offerDeadline=offerStartedAt+OFFER_DURATION_MS;
function tick(){
  const rem=Math.max(0,Math.ceil((offerDeadline-Date.now())/1000));
  const parts=[Math.floor(rem/3600),Math.floor(rem%3600/60),rem%60];
  ['h','m','s'].forEach((id,i)=>{
    const element=document.getElementById(id);
    if(element)element.textContent=String(parts[i]).padStart(2,'0');
  });
  if(rem===0){
    const timer=document.getElementById('timerBlock');
    const oldPrice=document.getElementById('oldPrice');
    const message=document.getElementById('priceMessage');
    const label=document.querySelector('.price-box > .kicker');
    if(timer)timer.hidden=true;
    if(oldPrice)oldPrice.hidden=true;
    if(message)message.textContent='24-годинний відлік завершився. Перевірте актуальну суму на платіжній сторінці.';
    if(label)label.textContent='Вартість комплексу';
  }
}
tick();
setInterval(tick,1000);
document.addEventListener('visibilitychange',tick);
