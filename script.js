/* ================================================
   SHAHAF COOKING COURSE — script.js  v2
   Nav · Scroll Fade · Carousel · Video Play
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     1. STICKY NAV
  ────────────────────────────────────────────── */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  /* ──────────────────────────────────────────────
     2. SCROLL FADE-IN
  ────────────────────────────────────────────── */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


  /* ──────────────────────────────────────────────
     3. TESTIMONIAL CAROUSEL
  ────────────────────────────────────────────── */
  const carousel = document.getElementById('carousel');
  const dotsWrap = document.getElementById('cDots');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');

  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const total  = slides.length;
    let current  = 0;

    /* build dots */
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = i === 0 ? 'dot active' : 'dot';
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    });

    function goTo(n) {
      current = (n + total) % total;
      carousel.style.transform = `translateX(-${current * 100}%)`;
      dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('active', i === current)
      );
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    /* auto-advance every 5s — only if no video is playing */
    setInterval(() => {
      const anyPlaying = Array.from(document.querySelectorAll('.slide-video video'))
        .some(v => !v.paused);
      if (!anyPlaying) goTo(current + 1);
    }, 5000);
  }


  /* ──────────────────────────────────────────────
     4. TESTIMONIAL VIDEOS — unmute on first click
  ────────────────────────────────────────────── */
  const testVideos = document.querySelectorAll('.slide-video video');
  testVideos.forEach(vid => {
    vid.addEventListener('click', () => {
      testVideos.forEach(v => { v.muted = false; });
    });
  });


  /* ──────────────────────────────────────────────
     5. SMOOTH ANCHOR SCROLL
  ────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ──────────────────────────────────────────────
     6. PRICING CARD ENTRANCE ANIMATION
  ────────────────────────────────────────────── */
  const pricingCard = document.querySelector('.pricing-card');
  if (pricingCard) {
    const po = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.animate(
            [{ transform: 'scale(.96)', opacity: '.4' },
             { transform: 'scale(1.01)', opacity: '1', offset: .6 },
             { transform: 'scale(1)',    opacity: '1' }],
            { duration: 600, easing: 'ease', fill: 'forwards' }
          );
          po.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    po.observe(pricingCard);
  }

});

document.addEventListener('DOMContentLoaded', () => {
  /* ── LIGHTBOX ── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox) {
    document.querySelectorAll('.review-img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { lightbox.style.display = 'none'; document.body.style.overflow = ''; }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  /* ── COURSE VIDEO PLAY ── */
  const courseOverlay = document.getElementById('courseOverlay');
  const coursePlayBtn = document.getElementById('coursePlayBtn');
  if (courseOverlay && coursePlayBtn) {
    const video = courseOverlay.previousElementSibling;
    courseOverlay.addEventListener('click', () => {
      video.play();
      courseOverlay.classList.add('hidden');
    });
    video.addEventListener('pause', () => courseOverlay.classList.remove('hidden'));
    video.addEventListener('ended', () => courseOverlay.classList.remove('hidden'));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  /* ── LEGAL MODALS ── */
  const termsModal   = document.getElementById('termsModal');
  const privacyModal = document.getElementById('privacyModal');

  document.getElementById('openTerms')?.addEventListener('click', e => {
    e.preventDefault(); termsModal.style.display = 'flex';
  });
  document.getElementById('openPrivacy')?.addEventListener('click', e => {
    e.preventDefault(); privacyModal.style.display = 'flex';
  });
  document.getElementById('closeTerms')?.addEventListener('click', () => {
    termsModal.style.display = 'none';
  });
  document.getElementById('closePrivacy')?.addEventListener('click', () => {
    privacyModal.style.display = 'none';
  });
  [termsModal, privacyModal].forEach(m => {
    m?.addEventListener('click', e => {
      if (e.target === m) m.style.display = 'none';
    });
  });

  /* ── LIGHTBOX ── */
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  if (lightbox) {
    document.querySelectorAll('.review-img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    lightbox.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    });
  }

  /* ── COURSE VIDEO ── */
  const courseOverlay = document.getElementById('courseOverlay');
  if (courseOverlay) {
    const video = courseOverlay.previousElementSibling;
    courseOverlay.addEventListener('click', () => {
      video.play();
      courseOverlay.classList.add('hidden');
    });
    video.addEventListener('pause', () => courseOverlay.classList.remove('hidden'));
    video.addEventListener('ended', () => courseOverlay.classList.remove('hidden'));
  }
});
