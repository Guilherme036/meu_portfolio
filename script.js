/* ── Efeito de texto digitado ── */
const phrases = ['whoami', 'cat sobre.md', 'ls projetos/', 'open contato.html'];
let pi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 100);
}
type();

/* ── Mobile menu ── */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function toggleMenu() {
  const open = sidebar.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  overlay.classList.toggle('visible', open);
  hamburger.setAttribute('aria-expanded', open);
}

hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

/* ── Fechar menu ao clicar na navegação (mobile) ── */
sidebar.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) toggleMenu();
  });
});

/* ── Navegação ativa no scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l =>
        l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)
      );
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Animação das barras de idiomas ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.lang-fill').forEach(f => f.classList.add('animated'));
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.langs-section').forEach(el => barObs.observe(el));

/* ── Validação de formulário ── */
const form       = document.getElementById('contactForm');
const modal      = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');

function getVal(id) {
  return document.getElementById(id).value.trim();
}

function setError(fieldId, errId, show) {
  document.getElementById(fieldId).classList.toggle('error', show);
  document.getElementById(errId).classList.toggle('show', show);
}

function validateEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const nome     = getVal('nome');
  const email    = getVal('email');
  const mensagem = getVal('mensagem');
  let valid = true;

  if (!nome)             { setError('nome',     'err-nome',     true);  valid = false; }
  else                   { setError('nome',     'err-nome',     false); }

  if (!validateEmail(email)) { setError('email', 'err-email',   true);  valid = false; }
  else                   { setError('email',   'err-email',    false); }

  if (!mensagem)         { setError('mensagem', 'err-mensagem', true);  valid = false; }
  else                   { setError('mensagem', 'err-mensagem', false); }

  if (!valid) return;

  /* Limpar e exibir modal de sucesso */
  form.reset();
  modal.classList.add('open');
  modal.querySelector('.modal-box').focus();
});

/* ── Limpar erros ao digitar ── */
['nome', 'email', 'mensagem'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    document.getElementById('err-' + id).classList.remove('show');
  });
});

/* ── Fechar modal ── */
modalClose.addEventListener('click', () => modal.classList.remove('open'));
modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });
