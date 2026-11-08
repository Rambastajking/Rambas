const langButton=document.getElementById('lang');
let currentLang='en';
function setLanguage(lang){currentLang=lang;document.documentElement.lang=lang;document.body.classList.toggle('ar',lang==='ar');document.documentElement.dir=lang==='ar'?'rtl':'ltr';document.querySelectorAll('[data-en][data-ar]').forEach(el=>{el.innerHTML=el.dataset[lang]});langButton.textContent=lang==='en'?'عربي':'English';}
langButton.addEventListener('click',()=>setLanguage(currentLang==='en'?'ar':'en'));
document.querySelector('.menu-toggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();


// Premium reveal transitions as each section enters the viewport.
document.documentElement.classList.add('reveal-ready');
const revealTargets = document.querySelectorAll(
  '.section-head, .product-card, .manifesto-image, .manifesto-copy, .benefits > div, .locations-heading, .location-card, .retail > *'
);
revealTargets.forEach((el, index) => {
  el.classList.add('reveal');
  if (el.matches('.product-card,.location-card')) {
    el.classList.add('reveal-delay-' + ((index % 4) + 1));
  }
});
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}

// Highlight the navigation item for the section currently on screen.
const navLinks = [...document.querySelectorAll('#nav a')];
const observedSections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle(
          'active', link.getAttribute('href') === '#' + entry.target.id
        ));
      }
    });
  }, { threshold: 0.35 });
  observedSections.forEach(section => sectionObserver.observe(section));
}
