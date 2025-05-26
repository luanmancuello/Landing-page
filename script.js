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
document.addEventListener('DOMContentLoaded', function () {
    const projetosGallery = document.querySelector('.projetos-gallery');
    const projetoItems = document.querySelectorAll('.projeto-item');
    const prevBtn2 = document.querySelector('.projeto-prev-btn');
    const nextBtn2 = document.querySelector('.projeto-next-btn');
    const itemWidth2 = projetoItems[0].offsetWidth + 25;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    prevBtn2.addEventListener('click', () => {
        projetosGallery.scrollBy({ left: -itemWidth2, behavior: 'smooth' });
    });

    nextBtn2.addEventListener('click', () => {
        projetosGallery.scrollBy({ left: itemWidth2, behavior: 'smooth' });
    });

    projetoItems.forEach(item => {
        item.addEventListener('click', function () {
            const projetoNome = this.querySelector('.projeto-nome')?.textContent;
            console.log('Projeto selecionado:', projetoNome);
        });

        item.addEventListener('mousedown', e => e.stopPropagation());
        item.addEventListener('click', e => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    projetosGallery.addEventListener('mousedown', (e) => {
        isDragging = true;
        startPos = e.clientX;
        projetosGallery.style.cursor = 'grabbing';
    });

    projetosGallery.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
        projetosGallery.scrollLeft = -currentTranslate;
    });

    projetosGallery.addEventListener('mouseup', () => {
        isDragging = false;
        prevTranslate = currentTranslate;
        projetosGallery.style.cursor = 'grab';
    });

    projetosGallery.addEventListener('mouseleave', () => {
        isDragging = false;
    });
});

// === Slider 3: Carrossel customizado com 3 imagens visíveis ===
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.custom-carousel-track');
    const slides = document.querySelectorAll('.custom-carousel-slide');
    const prevBtn = document.querySelector('.custom-prev-btn');
    const nextBtn = document.querySelector('.custom-next-btn');
    const indicatorsContainer = document.querySelector('.custom-carousel-indicators');  // Container para os indicadores

    let currentIndex = 0;
    const visibleSlides = 3;
    const slideGap = 40;  // Ajuste para refletir o gap entre os slides
    const slideWidth = slides[0].offsetWidth + slideGap;
    const maxIndex = slides.length - visibleSlides;

    // Criação dinâmica dos indicadores
    function createIndicators() {
        indicatorsContainer.innerHTML = '';  // Limpa qualquer indicador existente
        for (let i = 0; i <= maxIndex; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('custom-carousel-indicator');
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Atualiza o carrossel e os indicadores
    function updateCarousel() {
        const offset = currentIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;

        // Atualiza os indicadores
        const indicators = document.querySelectorAll('.custom-carousel-indicator');
        indicators.forEach((indicator, i) => {
            if (i === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Função para ir a um slide específico ao clicar no indicador
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Navegação anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
        updateCarousel();
    });

    // Navegação seguinte
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Inicializa o carrossel
    createIndicators();  // Gera os indicadores
    updateCarousel();  // Atualiza a posição inicial do carrossel
});

// === Slider 4: Carrossel customizado com swipe ===
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.custom-carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.custom-prev-btn');
    const nextBtn = document.querySelector('.custom-next-btn');
    const indicators = document.querySelectorAll('.custom-carousel-indicator');

    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width + 40; // incluindo gap
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        indicators.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    // Swipe para mobile
    let startX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        } else if (deltaX < -50) {
            currentIndex = (currentIndex + 1) % slides.length;
        }
        updateCarousel();
    });

    updateCarousel(); // inicial
});

// === Módulos Expansíveis ===
document.querySelectorAll('.modulo-header').forEach(header => {
    header.addEventListener('click', function() {
        const modulo = this.parentElement;
        const isExpanded = modulo.classList.contains('expanded');
        
        // Fecha todos os módulos primeiro
        document.querySelectorAll('.modulo').forEach(m => {
            m.classList.remove('expanded');
        });
        
        // Abre o módulo clicado se não estava expandido
        if (!isExpanded) {
            modulo.classList.add('expanded');
        }
    });
});
const darkColor = () => {
    const r = Math.floor(Math.random() * 50);
    const g = Math.floor(Math.random() * 50);
    const b = Math.floor(Math.random() * 50);
    return `rgb(${r}, ${g}, ${b})`;
};

document.documentElement.style.height = '100%'; // Garante altura total
document.body.style.minHeight = '100vh';        // Garante altura total

document.body.style.background = `linear-gradient(135deg, ${darkColor()}, ${darkColor()})`;
document.body.style.color = 'white';