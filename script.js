document.addEventListener('DOMContentLoaded', function () {
    // === Slider 1: Principal com destaque central ===
    const slider1 = document.querySelector('.slider');
    const slides1 = document.querySelectorAll('.slide');
    const prevBtn1 = document.querySelector('.btn-prev');
    const nextBtn1 = document.querySelector('.btn-next');
    const dotsContainer1 = document.querySelector('.dots-container');

    let currentIndex1 = 2;
    const totalSlides1 = slides1.length;

    for (let i = 0; i < totalSlides1; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex1) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex1 = i;
            updateSlider1();
        });
        dotsContainer1.appendChild(dot);
    }

    function updateSlider1() {
        slides1.forEach((slide, i) => {
            slide.classList.remove('far-prev', 'prev', 'active', 'next', 'far-next');
            const indexOffset = (i - currentIndex1 + totalSlides1) % totalSlides1;

            if (indexOffset === 0) {
                slide.classList.add('active');
            } else if (indexOffset === 1 || indexOffset === -4) {
                slide.classList.add('next');
            } else if (indexOffset === 2 || indexOffset === -3) {
                slide.classList.add('far-next');
            } else if (indexOffset === -1 || indexOffset === 4) {
                slide.classList.add('prev');
            } else if (indexOffset === -2 || indexOffset === 3) {
                slide.classList.add('far-prev');
            }
        });

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex1);
        });
    }

    prevBtn1.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 - 1 + totalSlides1) % totalSlides1;
        updateSlider1();
    });

    nextBtn1.addEventListener('click', () => {
        currentIndex1 = (currentIndex1 + 1) % totalSlides1;
        updateSlider1();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevBtn1.click();
        if (e.key === 'ArrowRight') nextBtn1.click();
    });

    updateSlider1();
});

// === Slider 2: Galeria horizontal com clique e arraste ===
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.custom-carousel-track');
  const slides = Array.from(document.querySelectorAll('.custom-carousel-slide'));
  const prevBtn = document.querySelector('.custom-prev-btn');
  const nextBtn = document.querySelector('.custom-next-btn');
  const indicatorsContainer = document.querySelector('.custom-carousel-indicators');

  const visibleSlides = 3;
  const totalSlides = slides.length;
  const maxIndex = totalSlides - visibleSlides;

  let currentIndex = 0;

  // Calcular número real de "páginas válidas"
  const totalSteps = Math.max(1, totalSlides - visibleSlides + 1);
  const indicators = [];

  // Criar os indicadores
  for (let i = 0; i < totalSteps; i++) {
    const indicator = document.createElement('div');
    indicator.classList.add('custom-carousel-indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    indicatorsContainer.appendChild(indicator);
    indicators.push(indicator);
  }

  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth + 40; // slide + gap
    const offset = slideWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) currentIndex = maxIndex;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = currentIndex + 1;
    if (currentIndex > maxIndex) currentIndex = 0;
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modulo-expand-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.parentElement.parentElement.classList.toggle('expanded');
    });
  });
});



