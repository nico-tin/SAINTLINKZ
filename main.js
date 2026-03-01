// ===== FAQ Toggle Functionality =====
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const answer = faqItem.querySelector('.faq-answer');

      // Toggle active class on question
      this.classList.toggle('active');
      answer.classList.toggle('active');

      // Close other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== this) {
          otherQuestion.classList.remove('active');
          otherQuestion.parentElement.querySelector('.faq-answer').classList.remove('active');
        }
      });
    });
  });

  // ===== Mobile Menu Toggle =====
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      const navMenu = document.querySelector('.nav-menu');
      navMenu.classList.toggle('active');
    });
  }

  // ===== Smooth Scroll Navigation =====
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // if link is just '#', treat as home scroll to top
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href.startsWith('#')) {
        // normal anchor to section
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
      
      // Close mobile menu if open
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu) navMenu.classList.remove('active');
    });
  });

  // ===== Image modal (size chart and catalogues) =====
  const sizeChartImg = document.getElementById('sizeChartImg');
  const chartModal = document.getElementById('chartModal');
  const closeModal = document.getElementById('closeModal');
  const modalChartImg = document.getElementById('modalChartImg');

  function openImageModal(src, alt) {
    if (!chartModal || !modalChartImg) return;
    modalChartImg.src = src;
    modalChartImg.alt = alt || '';
    chartModal.classList.add('active');
  }

  if (sizeChartImg && chartModal) {
    sizeChartImg.addEventListener('click', function() {
      openImageModal(this.src, this.alt);
    });
  }

  // catalogue thumbnails
  document.querySelectorAll('.catalogue-img').forEach(img => {
    img.addEventListener('click', function() {
      openImageModal(this.src, this.alt);
    });
  });

  if (closeModal && chartModal) {
    closeModal.addEventListener('click', function() {
      chartModal.classList.remove('active');
    });

    chartModal.addEventListener('click', function(e) {
      if (e.target === chartModal) {
        chartModal.classList.remove('active');
      }
    });
  }

  // disable browser restoration of scroll position
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  // ===== Scroll Animation for Elements =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // ===== Center catalogue on refresh =====
  function centerCatalogue() {
    // reset vertical position before adjusting horizontal scroll to avoid jump
    window.scrollTo(0, 0);
    const container = document.querySelector('.catalogues');
    if (!container) return;
    const items = container.querySelectorAll('.catalogue-item');
    if (items.length === 0) return;
    const middle = items[Math.floor(items.length/2)];
    // use scrollIntoView to reliably center horizontally without affecting vertical scroll
    middle.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'auto' });
  }
  // run immediately after load & when window resizes
  window.addEventListener('load', () => {
    // make sure any stored scroll pos is cleared on page load
    window.scrollTo(0,0);
    centerCatalogue();
  });
  window.addEventListener('resize', centerCatalogue);

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe featured items and cards
  document.querySelectorAll('.care-card, .step, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== Hero Carousel (removed) =====
  // Carousel code left in place for backwards compatibility but will no longer run
  (function initHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return; // element removed on new design
  })();

  // ===== Update Active Nav Link on Scroll =====
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
});

// ===== Generate Size Chart Placeholder Function =====
function generateSizeChartPlaceholder() {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#fff9e6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#76023c';
  ctx.font = 'bold 28px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('Bracelet Size Chart', canvas.width / 2, 40);

  // Draw size rulers
  const sizes = [
    { label: 'Small\n14-15 cm', x: 80, color: '#c41e3a' },
    { label: 'Medium\n15-17 cm', x: 200, color: '#76023c' },
    { label: 'Large\n17-19 cm', x: 320, color: '#5a1b15' },
    { label: 'XL\n19+ cm', x: 440, color: '#d4a574' }
  ];

  sizes.forEach(size => {
    // Draw measurement bar
    const barHeight = 100 + (Math.random() * 50);
    ctx.fillStyle = size.color;
    ctx.fillRect(size.x - 20, 250 - barHeight, 40, barHeight);

    // Draw label
    ctx.fillStyle = '#333';
    ctx.font = '14px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText(size.label, size.x, 300);
  });

  // Draw cm markers at bottom
  ctx.strokeStyle = '#999';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 350);
  ctx.lineTo(550, 350);
  ctx.stroke();

  ctx.fillStyle = '#666';
  ctx.font = '12px Montserrat';
  for (let i = 14; i <= 20; i++) {
    const x = 50 + ((i - 14) * 50);
    ctx.fillText(i + ' cm', x, 375);
    ctx.beginPath();
    ctx.moveTo(x, 340);
    ctx.lineTo(x, 360);
    ctx.stroke();
  }

  // Footer text
  ctx.fillStyle = '#999';
  ctx.font = 'italic 12px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('One charm = 1 cm — add 1 charm to wrist measurement for fit', canvas.width / 2, 390);

  return canvas.toDataURL('image/png');
}

// Export placeholder for use in HTML
window.generateSizeChartPlaceholder = generateSizeChartPlaceholder;
