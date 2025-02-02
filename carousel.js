document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.am-carousel-track');
    const items = document.querySelectorAll('.am-carousel-item');
    const visibleItems = 1; // Adjust to match the new image size
    const itemWidth = items[0].getBoundingClientRect().width;
    let currentIndex = 0;
    let autoSlideInterval;

    function moveCarousel() {
        const translateX = -(currentIndex * itemWidth);
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(${translateX}px)`;
    }

    function wrapAround() {
        if (currentIndex >= items.length) {
            currentIndex = 0;
            track.style.transition = "none";
            track.style.transform = "translateX(0px)";
        }
        if (currentIndex < 0) {
            currentIndex = items.length - visibleItems;
            const translateX = -(currentIndex * itemWidth);
            track.style.transition = "none";
            track.style.transform = `translateX(${translateX}px)`;
        }
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

    const newTrack = document.querySelector('.new-carousel-track');
    const newItems = document.querySelectorAll('.new-carousel-item');
    const newVisibleItems = 1; // Adjust to match the new image size
    const newItemWidth = newItems[0].getBoundingClientRect().width;
    let newCurrentIndex = 0;
    let newAutoSlideInterval;

    function moveNewCarousel() {
        const translateX = -(newCurrentIndex * newItemWidth);
        newTrack.style.transition = "transform 0.5s ease";
        newTrack.style.transform = `translateX(${translateX}px)`;
    }

    function wrapNewAround() {
        if (newCurrentIndex >= newItems.length) {
            newCurrentIndex = 0;
            newTrack.style.transition = "none";
            newTrack.style.transform = "translateX(0px)";
        }
        if (newCurrentIndex < 0) {
            newCurrentIndex = newItems.length - newVisibleItems;
            const translateX = -(newCurrentIndex * newItemWidth);
            newTrack.style.transition = "none";
            newTrack.style.transform = `translateX(${translateX}px)`;
        }
    }

    function autoNewSlide() {
        newCurrentIndex++;
        moveNewCarousel();
        setTimeout(wrapNewAround, 500);
    }

    function startNewAutoSlide() {
        newAutoSlideInterval = setInterval(autoNewSlide, 3000); // Change slide every 3 seconds
    }

    function stopNewAutoSlide() {
        clearInterval(newAutoSlideInterval);
    }

    startNewAutoSlide();

    const newControlButton = document.getElementById('new-carousel-control');
    newControlButton.addEventListener('click', () => {
        if (newControlButton.textContent === '❚❚') {
            stopNewAutoSlide();
            newControlButton.textContent = '▶';
        } else {
            startNewAutoSlide();
            newControlButton.textContent = '❚❚';
        }
    });
});
