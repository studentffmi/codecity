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
slidesEl.innerHTML=slides.map((x,i)=>`<img class="slide ${i===0?'active':''}" src="assets/screen-${String(i+1).padStart(2,'0')}.webp" alt="CODE CITY — ${x[0]}" loading="${i===0?'eager':'lazy'}" ${i===0?'':'aria-hidden="true"'}>`).join('');
dotsEl.innerHTML=slides.map((x,i)=>`<button class="dot ${i===0?'active':''}" type="button" data-i="${i}" aria-label="Скриншот ${i+1}" aria-pressed="${i===0}"></button>`).join('');
let active=0; const nodes=[...document.querySelectorAll('.slide')]; const dots=[...document.querySelectorAll('.dot')];
function show(n){active=(n+slides.length)%slides.length; nodes.forEach((e,i)=>{e.classList.toggle('active',i===active);e.setAttribute('aria-hidden',i===active?'false':'true')});dots.forEach((e,i)=>{e.classList.toggle('active',i===active);e.setAttribute('aria-pressed',String(i===active))});document.querySelector('#galleryTitle').textContent=slides[active][0];document.querySelector('#galleryDetail').textContent=slides[active][1];document.querySelector('#counter').textContent=String(active+1).padStart(2,'0')+' / '+slides.length}
document.querySelector('#prev').addEventListener('click',()=>show(active-1));document.querySelector('#next').addEventListener('click',()=>show(active+1));dots.forEach(e=>e.addEventListener('click',()=>show(Number(e.dataset.i))));
const vp=document.querySelector('#viewport'),overlay=document.querySelector('#overlay');let tx=0;
vp.addEventListener('touchstart',e=>tx=e.changedTouches[0].clientX,{passive:true});vp.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx;if(Math.abs(dx)>55)show(active+(dx<0?1:-1))},{passive:true});vp.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(active-1);if(e.key==='ArrowRight')show(active+1);if(e.key==='Enter')openZoom()});
function openZoom(){document.querySelector('#zoomImg').src=`assets/screen-${String(active+1).padStart(2,'0')}.webp`;overlay.classList.add('show');document.body.classList.add('no-scroll');document.querySelector('#closeOverlay').focus()}
function closeZoom(){overlay.classList.remove('show');document.body.classList.remove('no-scroll');vp.focus()}
vp.addEventListener('click',openZoom);overlay.addEventListener('click',e=>{if(e.target===overlay)closeZoom()});document.querySelector('#closeOverlay').addEventListener('click',closeZoom);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('show'))closeZoom()});
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
