// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Scroll animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Testimonial Carousel - Fixing the carousel functionality
const track = document.getElementById('testimonial-track');
const slides = document.querySelectorAll('.testimonial-slide');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const dots = document.querySelectorAll('.carousel-dot');
let currentIndex = 0;
const slideCount = slides.length;

// Properly set up the initial state
function initCarousel() {
    // Set correct width for track and slides based on the number of slides
    track.style.width = `${slideCount * 100}%`;
    slides.forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });
    
    // Initialize position
    goToSlide(0);
}

function goToSlide(index) {
    // Make sure index is within bounds
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    // Set the transform property to move the track
    track.style.transform = `translateX(-${index * (100 / slideCount)}%)`;
    
    // Update the current index
    currentIndex = index;
    
    // Update dot indicators
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Event listeners for navigation
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
}

// Auto slide with proper interval management
let slideInterval;

function startAutoSlide() {
    slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Stop auto-slide on mouse enter, resume on mouse leave
const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize carousel on page load
    window.addEventListener('load', () => {
        if (track && slides.length > 0) {
            initCarousel();
            startAutoSlide();
        }
    });
}

// Calendly Integration
const scheduleButtons = document.querySelectorAll('.schedule-btn');
const calendlyOverlay = document.getElementById('calendly-overlay');
const calendlyPopup = document.getElementById('calendly-popup');
const calendlyClose = document.getElementById('calendly-close');
const calendlyEmbed = document.getElementById('calendly-embed');

function initCalendly() {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);
    
    script.onload = function() {
        if (typeof Calendly !== 'undefined') {
            Calendly.initInlineWidget({
                url: 'https://calendly.com/stefandibella/30min',
                parentElement: calendlyEmbed,
                prefill: {},
                utm: {}
            });
        }
    };
}

function openCalendly() {
    calendlyOverlay.style.display = 'block';
    calendlyPopup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Initialize Calendly if not already loaded
    if (!window.Calendly) {
        initCalendly();
    }
}

function closeCalendly() {
    calendlyOverlay.style.display = 'none';
    calendlyPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (scheduleButtons.length > 0 && calendlyOverlay && calendlyPopup && calendlyClose) {
    scheduleButtons.forEach(button => {
        button.addEventListener('click', openCalendly);
    });

    calendlyClose.addEventListener('click', closeCalendly);
    calendlyOverlay.addEventListener('click', function(e) {
        if (e.target === calendlyOverlay) {
            closeCalendly();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCalendly();
    });
}