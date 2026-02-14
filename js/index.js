//------------------------------------------------ Header ------------------------------------------------//

// Header dropdowns
const dropdownBtn = document.querySelectorAll('.dropdown-btn');

dropdownBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const dropdown = btn.nextElementSibling;

        document.querySelectorAll('.dropdown-content').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.add('hidden');
            }
        });

        dropdown.classList.toggle('hidden');
    });
});

// Header Offcanvas
const offcanvasBtn = document.querySelector('.offcanvas-btn')

offcanvasBtn.addEventListener('click', () => {
    const dropdownContent = offcanvasBtn.nextElementSibling;
    dropdownContent.classList.remove('hidden');
})

const closeBtn = document.querySelector('.close-btn')
closeBtn.addEventListener('click', () => {
    const offcanvasContent = document.querySelector('.offcanvas-content');
    offcanvasContent.classList.add('hidden');
})


// ------------------------------------------------ Hero Carousel ------------------------------------------------ //

const slider = document.getElementById('slider');
const slides = slider.children;

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const pauseBtn = document.getElementById('pause');

let index = 0;
let totalSlides = slides.length;
let autoSlide;
let isPaused = false;

function slide(i) {
    slider.style.transform = `translateX(-${i * 100}%)`;
}

nextBtn.addEventListener('click', () => {
    index++;
    if (index >= totalSlides) {
        index = 0;
    }
    slide(index);
})

prevBtn.addEventListener('click', () => {
    index--;
    if (index < 0) {
        index = totalSlides - 1;
    }
    slide(index);
})

function startAutoSlide() {
    autoSlide = setInterval(() => {
        index++;
        if (index >= totalSlides) {
            index = 0;
        }
        slide(index);
    }, 7000)
}
startAutoSlide();

pauseBtn.addEventListener("click", () => {
    if (!isPaused) {
        clearInterval(autoSlide);
        pauseBtn.innerHTML = '<i class="bi bi-play"></i>';
        isPaused = true;
    } else {
        startAutoSlide();
        pauseBtn.innerHTML = '<i class="bi bi-pause"></i>';
        isPaused = false;
    }
});
