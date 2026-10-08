
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

const menuToggle = $('#menuToggle');
const nav = $('#navlinks');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('#navlinks a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded','false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});
$$('.reveal').forEach(el => revealObserver.observe(el));

const sections = $$('main section[id]');
const navLinks = $$('#navlinks a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
},{rootMargin:'-35% 0px -50% 0px',threshold:0});
sections.forEach(s => sectionObserver.observe(s));

const modal = $('#imageModal');
const modalImage = $('#modalImage');
const closeModal = () => {
  modal.classList.remove('open');
  modalImage.removeAttribute('src');
  document.body.classList.remove('menu-open');
};
$$('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = $('img', item);
    modalImage.src = item.dataset.full || img.src;
    modalImage.alt = img.alt;
    modal.classList.add('open');
  });
});
$('#modalClose')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

$('#booking-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const phone = $('#phone').value.trim();
  const service = $('#service').value;
  const mode = $('#mode').value;
  const message = $('#message').value.trim();
  const body = [
    "Hi Dr. Shaurya's Clinic, I'd like to request an appointment.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Concern: ${service}`,
    `Consultation: ${mode}`,
    message ? `Note: ${message}` : ''
  ].filter(Boolean).join('\n');
  const url = `https://wa.me/919769732023?text=${encodeURIComponent(body)}`;
  const toast = $('#toast');
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1200);
  window.open(url,'_blank','noopener');
});

$('#year').textContent = new Date().getFullYear();
