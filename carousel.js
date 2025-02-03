document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.am-carousel-track');
    const items = document.querySelectorAll('.am-carousel-item');
    const itemWidth = items[0].getBoundingClientRect().width;
    let currentIndex = 1; // Start with the second item as the center one
    let autoSlideInterval;

    function updateClasses() {
        items.forEach((item, index) => {
            item.classList.remove('center');
            item.classList.remove('left');
            item.classList.remove('right');
            if (index === currentIndex) {
                item.classList.add('center');
            } else if (index === currentIndex - 1) {
                item.classList.add('left');
            } else if (index === currentIndex + 1) {
                item.classList.add('right');
            }
        });
    }

    function moveCarousel() {
        const translateX = -((currentIndex - 1) * itemWidth);
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(${translateX}px)`;
        updateClasses();
    }

    function wrapAround() {
        if (currentIndex >= items.length - 1) {
            currentIndex = 1;
            track.style.transition = "none";
            track.style.transform = `translateX(-${itemWidth}px)`;
        }
        if (currentIndex < 1) {
            currentIndex = items.length - 2;
            const translateX = -((currentIndex - 1) * itemWidth);
            track.style.transition = "none";
            track.style.transform = `translateX(${translateX}px)`;
        }
        updateClasses();
    }

    function autoSlide() {
        currentIndex++;
        moveCarousel();
        setTimeout(wrapAround, 500);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(autoSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    startAutoSlide();

    const amControlButton = document.getElementById('am-carousel-control');
    amControlButton.addEventListener('click', () => {
        if (amControlButton.textContent === '❚❚') {
            stopAutoSlide();
            amControlButton.textContent = '▶';
        } else {
            startAutoSlide();
            amControlButton.textContent = '❚❚';
        }
    });

    // Initialize the carousel
    moveCarousel();
});
