(function(){
'use strict';
var toggle=document.getElementById('menu-toggle'), nav=document.getElementById('primary-nav');
function closeMenu(){if(toggle){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}}
if(toggle&&nav){toggle.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);});nav.addEventListener('click',function(e){if(e.target.closest('a'))closeMenu();});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});document.addEventListener('click',function(e){if(!e.target.closest('.top'))closeMenu();});window.matchMedia('(min-width:960px)').addEventListener('change',closeMenu);}
function buildMailto(form){var v=form.elements;return 'mailto:roboil@wp.pl?subject='+encodeURIComponent('Zgłoszenie wizyty: '+v.auto.value.trim())+'&body='+encodeURIComponent(['Marka i model: '+v.auto.value.trim(),'Usługa: '+v.usluga.value,'Preferowany termin: '+v.termin.value.trim(),'Telefon: '+v.telefon.value.trim(),'','Uwagi: '+(v.uwagi.value.trim()||'brak'),'','Proszę o kontakt w sprawie wizyty. Zapoznałem się z polityką prywatności.','Termin wymaga potwierdzenia przez warsztat.'].join('\r\n'));}
window.RobOil={buildMailto:buildMailto};
var form=document.getElementById('forma');
if(form){var selected=new URLSearchParams(window.location.search).get('usluga');if(selected&&Array.from(form.elements.usluga.options).some(function(o){return o.value===selected;}))form.elements.usluga.value=selected;
form.addEventListener('submit',function(e){e.preventDefault();var errors=[];var v=form.elements;Array.from(form.querySelectorAll('[aria-invalid]')).forEach(function(f){f.removeAttribute('aria-invalid');});function invalid(field,message){field.setAttribute('aria-invalid','true');errors.push(message);}
if(!v.auto.value.trim())invalid(v.auto,'Podaj markę i model auta.');
if(!v.usluga.value)invalid(v.usluga,'Wybierz usługę.');
if(!v.termin.value.trim())invalid(v.termin,'Podaj preferowany termin, np. jak najszybciej.');
if(v.telefon.value.replace(/\D/g,'').length<9||v.telefon.value.replace(/\D/g,'').length>15)invalid(v.telefon,'Podaj numer telefonu zawierający od 9 do 15 cyfr.');
if(!v.zgoda.checked)invalid(v.zgoda,'Potwierdź prośbę o kontakt i zapoznanie się z polityką prywatności.');
var box=document.getElementById('form-errors');if(errors.length){box.replaceChildren();var title=document.createElement('strong');title.textContent='Uzupełnij formularz przed przygotowaniem wiadomości.';box.append(title);var list=document.createElement('ul');errors.forEach(function(message){var li=document.createElement('li');li.textContent=message;list.append(li);});box.append(list);box.hidden=false;box.focus();return;}box.hidden=true;var url=buildMailto(form);var fallback=document.getElementById('mailto-fallback');fallback.href=url;fallback.hidden=false;document.getElementById('forma-info').textContent='Wiadomość jest gotowa. Sprawdź ją i wyślij w swoim programie pocztowym. Jeśli program się nie otworzył, użyj linku poniżej lub zadzwoń: 502 153 489.';window.location.href=url;});}
var dialog=document.getElementById('lightbox'),lastTrigger;
if(dialog){var photo=document.getElementById('lightbox-image'),caption=document.getElementById('lightbox-caption');document.querySelectorAll('.gallery__item').forEach(function(button){button.addEventListener('click',function(){lastTrigger=button;photo.src=button.dataset.full;photo.alt=button.querySelector('img').alt;caption.textContent=button.dataset.caption;dialog.showModal();document.body.classList.add('has-lightbox');document.getElementById('lightbox-close').focus();});});document.getElementById('lightbox-close').addEventListener('click',function(){dialog.close();});dialog.addEventListener('click',function(e){if(e.target===dialog){var rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});dialog.addEventListener('close',function(){document.body.classList.remove('has-lightbox');if(lastTrigger)lastTrigger.focus();});}
})();
(function(){
  var button=document.querySelector('[data-load-map]');
  if(!button)return;
  button.addEventListener('click',function(){
    var frame=document.getElementById('workshop-map');
    frame.src=frame.dataset.src;
    frame.hidden=false;
    button.setAttribute('aria-expanded','true');
    document.getElementById('map-preview').hidden=true;
    document.getElementById('map-status').hidden=false;
  });
})();

/* 17.10: the bottom call bar shows only after the hero buttons scroll away (no duplicate buttons on the first screen) */
(function(){
  var hero=document.querySelector('.hero__cta'), dock=document.querySelector('.dock');
  if(!hero||!dock||!('IntersectionObserver' in window)) return;
  new IntersectionObserver(function(es){ dock.classList.toggle('is-away', es[0].isIntersecting); }, {threshold:0}).observe(hero);
})();
