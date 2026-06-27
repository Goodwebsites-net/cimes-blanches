/* ══════════════════════════════════════════════
   ÉLEVAGE DES CIMES BLANCHES — main.js
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Progress bar ──
  const progressBar = document.querySelector('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / max) * 100;
      progressBar.style.width = pct + '%';
    });
  }

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }

  // ── Nav burger mobile ──
  const burger = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');
  const mobileClose = document.querySelector('.nav__mobile__close');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ── FAQ accordéon ──
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ── Galerie lightbox ──
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox__img');
  if (lightbox) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
      });
    });
    document.querySelector('.lightbox__close')?.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  // ── Témoignages slider ──
  const cards = document.querySelectorAll('.temoignage-card');
  const dots  = document.querySelectorAll('.temoignage-dot');
  let current = 0;
  let autoplay;

  function showTemoignage(i) {
    cards.forEach((c, idx) => {
      c.style.display = idx === i ? 'block' : 'none';
    });
    dots.forEach((d, idx) => {
      d.classList.toggle('active', idx === i);
    });
    current = i;
  }

  if (cards.length) {
    showTemoignage(0);
    dots.forEach((d, i) => d.addEventListener('click', () => {
      clearInterval(autoplay);
      showTemoignage(i);
    }));
    autoplay = setInterval(() => {
      showTemoignage((current + 1) % cards.length);
    }, 5000);
  }

  // ── Annonces ticker : données depuis data-annonces ──
  const ticker = document.querySelector('.annonces-ticker__inner');
  if (ticker) {
    // Les annonces sont injectées dynamiquement depuis le CMS
    // Si aucune data, on garde le contenu HTML statique
  }

  // ── Pom runner bounce ──
  // déjà géré par CSS animation keyframes

  // ── Newsletter Brevo (stub prêt à connecter) ──
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      // TODO: remplacer par clé API Brevo client
      // await fetch('https://api.brevo.com/v3/contacts', {
      //   method: 'POST',
      //   headers: { 'api-key': 'VOTRE_CLE_BREVO', 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, listIds: [1], updateEnabled: false })
      // });
      newsletterForm.innerHTML = '<p style="color:var(--or-clair);font-size:0.9rem;letter-spacing:0.08em;">✓ Merci ! Vous recevrez nos actualités en primeur.</p>';
    });
  }

  // ── Contact form (Formspree stub) ──
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;
      // Formspree : remplacer l'action du form par https://formspree.io/f/XXXXX
      const data = new FormData(contactForm);
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          contactForm.innerHTML = '<div style="text-align:center;padding:3rem 0"><p style="font-family:var(--serif);font-size:1.5rem;color:var(--or);margin-bottom:0.8rem">Merci pour votre message !</p><p style="color:var(--gris)">Nous vous répondrons dans les 24 heures.</p></div>';
        } else {
          btn.textContent = 'Réessayer';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Réessayer';
        btn.disabled = false;
      }
    });
  }

  // ── Smooth scroll liens ancres ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// ── Nav scrolled class ──
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Fix touch events galerie mobile ──
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('touchend', () => {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox__img');
    if (lightbox && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    }
  }, { passive: true });
});

// ── Fix : fermer lightbox avec swipe bas mobile ──
const lb = document.querySelector('.lightbox');
if (lb) {
  let touchStartY = 0;
  lb.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientY - touchStartY;
    if (delta > 60) lb.classList.remove('open');
  }, { passive: true });
}
