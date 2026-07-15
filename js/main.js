/**
 * Main JavaScript — Всеволод Барвинок · HRTech
 */

(function () {
  'use strict';

  /* =============================================
     FLOATING WORDS (фон блока 1)
     ============================================= */
  const floatingWordsContainer = document.getElementById('floatingWords');
  const words = [
    'Employee Experience (EX)',
    'Well-being',
    'Социальный менеджмент',
    'Уменьшение стресса',
    'Удержание сотрудников',
    'Nexign (Neon)',
    'Улучшение HR- и бизнес-показателей',
    'Опыт HRTech и с IT-командой в HRMS',
    'Энтузиазм',
    'HR СПбПУ + Инноватика ИТМО',
    'Project | Product',
    'HR-аналитика',
    'Боль → Решение → Измеримая эффективность',
    'Unfair advantage'
  ];

  if (floatingWordsContainer) {
    const positions = [
      { top: '4%', left: '1%' },
      { top: '10%', right: '2%' },
      { top: '18%', left: '6%' },
      { top: '66%', left: '44%' },
      { top: '34%', left: '4%' },
      { top: '42%', right: '3%' },
      { top: '50%', left: '8%' },
      { top: '58%', right: '1%' },
      { top: '64%', left: '3%' },
      { top: '72%', right: '5%' },
      { top: '78%', left: '10%' },
      { top: '84%', right: '2%' },
      { top: '90%', left: '4%' },
      { top: '94%', right: '8%' }
    ];

    words.forEach((word, i) => {
      const el = document.createElement('span');
      el.className = 'floating-word';
      el.textContent = word;
      Object.assign(el.style, positions[i] || {});
      el.style.animationDelay = `${i * 0.12}s`;
      floatingWordsContainer.appendChild(el);
    });

    const heroSection = document.getElementById('intro');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            floatingWordsContainer.querySelectorAll('.floating-word').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 110);
            });
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(heroSection);
    }
  }

  /* =============================================
     EXPERIENCE CAROUSEL
     ============================================= */
  const carousel = document.getElementById('experienceCarousel');
  if (carousel) {
    const cards = carousel.querySelectorAll('.exp-card');
    const dotsContainer = carousel.querySelector('.carousel__dots');
    const prevBtn = carousel.querySelector('.carousel__btn--prev');
    const nextBtn = carousel.querySelector('.carousel__btn--next');
    let currentIndex = 0;

    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel__dot' + (i === 0 ? ' carousel__dot--active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Опыт ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel__dot');

    function goToSlide(index) {
      cards[currentIndex].classList.remove('exp-card--active');
      dots[currentIndex].classList.remove('carousel__dot--active');

      currentIndex = (index + cards.length) % cards.length;

      cards[currentIndex].classList.add('exp-card--active');
      dots[currentIndex].classList.add('carousel__dot--active');
    }

    cards[0].classList.add('exp-card--active');

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    carousel.querySelectorAll('.exp-card__toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.exp-card');
        const details = card.querySelector('.exp-card__details');
        const expanded = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', !expanded);
        details.classList.toggle('is-open', !expanded);
      });
    });

    let touchStartX = 0;
    const track = carousel.querySelector('.carousel__track');

    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) {
        goToSlide(diff > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });
  }

  /* =============================================
     STAT CARDS — нажатие/тап → цвет Барвинок (touch)
     ============================================= */
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-lit');
    });
  });

  /* =============================================
     SCROLL REVEAL
     ============================================= */
  const revealElements = document.querySelectorAll(
    '.goal-card, .stat-card, .achievement-item, .edu-card, .advantage-list li, .exp-card, .focus__quote, .closing__text, .freelance'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  /* =============================================
     ACTIVE BOTTOM NAV
     ============================================= */
  const navLinks = document.querySelectorAll('.bottom-nav__list a');

  if ('IntersectionObserver' in window && navLinks.length) {
    const sections = document.querySelectorAll('main section[id]');

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.classList.remove('is-active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('is-active');
              }
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: `-${0}px 0px -55% 0px` }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

})();