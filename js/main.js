/* 
   File: main.js
   Description: Core interactive logic for DiscoverDardania.
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // 1. Scroll Effect for Header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    if (menuToggle) {
        // Create overlay if not exists
        let overlay = document.querySelector('.menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'menu-overlay';
            document.body.appendChild(overlay);
        }

        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            overlay.classList.toggle('active');

            // Toggle menu icon animations (X transition)
            const lines = menuToggle.querySelectorAll('line');
            if (navLinks.classList.contains('active')) {
                lines[0].setAttribute('x1', '6'); lines[0].setAttribute('x2', '18'); lines[0].setAttribute('y1', '6'); lines[0].setAttribute('y2', '18');
                lines[1].style.opacity = '0';
                lines[2].setAttribute('x1', '6'); lines[2].setAttribute('x2', '18'); lines[2].setAttribute('y1', '18'); lines[2].setAttribute('y2', '6');
            } else {
                lines[0].setAttribute('x1', '4'); lines[0].setAttribute('x2', '20'); lines[0].setAttribute('y1', '6'); lines[0].setAttribute('y2', '6');
                lines[1].style.opacity = '1';
                lines[2].setAttribute('x1', '4'); lines[2].setAttribute('x2', '20'); lines[2].setAttribute('y1', '18'); lines[2].setAttribute('y2', '18');
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close on link click
        navLinks.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) toggleMenu();
            });
        });
    }

    // 2. Active State for Navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links .nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    if (currentPath === 'booking.html') {
        document.querySelectorAll('a[href="booking.html"]').forEach(l => l.classList.add('active'));
    }

    // 3. Simple Page Loading Sequence
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-up').forEach(el => {
        observer.observe(el);
    });
});