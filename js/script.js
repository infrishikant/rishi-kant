// Reveal animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach((el) => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute('data-count'));
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 45));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target + (target === 85 || target === 40 ? '+' : '+');
        clearInterval(timer);
      } else {
        counter.textContent = current;
      }
    }, 28);
  });

  countersStarted = true;
}

const statsSection = document.querySelector('#about');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    animateCounters();
  }
}, { threshold: 0.35 });

statsObserver.observe(statsSection);

// Project filter
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectItems.forEach((item) => {
      const categories = item.getAttribute('data-category');

      if (filter === 'all' || categories.includes(filter)) {
        item.classList.remove('hide');
        setTimeout(() => item.classList.add('active'), 50);
      } else {
        item.classList.add('hide');
      }
    });
  });
});

// Back to top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Navbar active link
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Profile card tilt effect
const tiltCard = document.querySelector('.tilt-card');

if (tiltCard) {
  tiltCard.addEventListener('mousemove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    tiltCard.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

// Cursor glow
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.left = event.clientX + 'px';
    cursorGlow.style.top = event.clientY + 'px';
  }
});
