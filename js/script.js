// Проверка версии и очистка кэша при необходимости
const currentVersion = 'v4'; // Текущая версия сайта

const savedVersion = localStorage.getItem('siteVersion');
if (savedVersion !== currentVersion) {
    console.log('Обнаружена новая версия сайта. Очищаем кэш...');

    // Очищаем Service Worker (если используется)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
                registration.unregister(); // Отменяем регистрацию Service Worker
            });
        });

        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName); // Удаляем все кэши
            });
        });
    }

    // Обновляем версию в localStorage
    localStorage.setItem('siteVersion', currentVersion);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-item h3').forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);

            // Меняем текст значка
            const icon = header.querySelector('.icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const activePhoto = document.getElementById('active-photo');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            // Проверяем, не является ли это фото уже активным
            if (this.classList.contains('active')) return;

            // Убираем класс 'active' у всех миниатюр
            thumbnails.forEach(img => img.classList.remove('active'));

            // Добавляем 'active' к выбранной миниатюре
            this.classList.add('active');

            // Добавляем эффект плавного изменения
            activePhoto.style.opacity = '0';

            setTimeout(() => {
                activePhoto.src = this.src;
                activePhoto.style.opacity = '1';
            }, 300); // Задержка для эффекта исчезновения
        });
    });

    // Делаем первую миниатюру активной при загрузке страницы
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
        activePhoto.src = thumbnails[0].src;
    }
     // Обработчик для раздела "Образование"
     const educationTitle = document.querySelector('.education-title');
     const educationDetails = document.querySelector('.education-details');
 
     if (educationTitle && educationDetails) {
         educationTitle.addEventListener('click', () => {
             const isExpanded = educationTitle.getAttribute('aria-expanded') === 'true';
             educationTitle.setAttribute('aria-expanded', !isExpanded);
 
             // Поворот значка через CSS
             const icon = educationTitle.querySelector('.icon');
             if (icon) {
                 icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
             }
 
             // Показать или скрыть детали
             educationDetails.style.maxHeight = isExpanded ? '0' : `${educationDetails.scrollHeight}px`;
         });
     }
});

document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    const dotsContainer = document.querySelector(".carousel-dots");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    let currentIndex = 0;

    // Создаем точки-индикаторы
    slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dots button");

    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Навигация по кнопкам
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);


    // Инициализация карусели
    updateCarousel();

    document.addEventListener('DOMContentLoaded', function () {
    console.log('Скрипт загружен и DOM готов');
    const educationTitle = document.querySelector('.education-title');
    console.log('educationTitle:', educationTitle);
    const educationDetails = document.querySelector('.education-details');
    console.log('educationDetails:', educationDetails);
    if (educationTitle && educationDetails) {
        educationTitle.addEventListener('click', () => {
            const isExpanded = educationTitle.getAttribute('aria-expanded') === 'true';
            educationTitle.setAttribute('aria-expanded', !isExpanded);
            const icon = educationTitle.querySelector('.icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
            educationDetails.style.maxHeight = isExpanded ? '0' : `${educationDetails.scrollHeight}px`;
        });
    }
});
});