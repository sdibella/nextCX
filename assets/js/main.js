// Main JavaScript file - Enhanced for mobile

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu functionality
  initMobileMenu();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize form validation
  initFormValidation();
  
  // Initialize animations
  initAnimations();
  
  // Add touch feedback to interactive elements
  initTouchFeedback();
  
  // Fix 100vh issue on mobile
  fixMobileViewportHeight();
  
  // Disable zoom on input focus on iOS
  preventIOSZoom();
});

// Improved mobile menu handling
function initMobileMenu() {
  const navTrigger = document.querySelector('.nav-trigger');
  const menuIcon = document.querySelector('.menu-icon');
  const siteNav = document.querySelector('.site-nav');
  
  if (!navTrigger) return;
  
  // Toggle menu on click
  navTrigger.addEventListener('change', function() {
    if (this.checked) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navTrigger.checked && !siteNav.contains(event.target) && event.target !== menuIcon) {
      navTrigger.checked = false;
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu when pressing escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && navTrigger.checked) {
      navTrigger.checked = false;
      document.body.classList.remove('menu-open');
    }
  });
  
  // Add active class to current page link
  const currentPath = window.location.pathname;
  const pageLinks = document.querySelectorAll('.page-link');
  
  pageLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      const navTrigger = document.querySelector('.nav-trigger');
      if (navTrigger && navTrigger.checked) {
        navTrigger.checked = false;
        document.body.classList.remove('menu-open');
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate header height for offset
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate position with offset
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20; // Extra 20px padding
        
        // Smooth scroll to target
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Form validation
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let hasError = false;
      
      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          e.preventDefault();
          hasError = true;
          showError(field, 'This field is required');
        } else {
          clearError(field);
          
          // Validate email format
          if (field.type === 'email' && !isValidEmail(field.value)) {
            e.preventDefault();
            hasError = true;
            showError(field, 'Please enter a valid email address');
          }
        }
      });
      
      // Show form-level message
      if (hasError) {
        const formMessage = form.querySelector('.form-message') || createFormMessage(form);
        formMessage.textContent = 'Please fix the errors above';
        formMessage.classList.add('error');
      }
    });
    
    // Live validation on blur
    const inputFields = form.querySelectorAll('input, textarea, select');
    inputFields.forEach(field => {
      field.addEventListener('blur', function() {
        if (field.hasAttribute('required') && !field.value.trim()) {
          showError(field, 'This field is required');
        } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
          showError(field, 'Please enter a valid email address');
        } else {
          clearError(field);
        }
      });
      
      // Clear error on input
      field.addEventListener('input', function() {
        if (field.value.trim()) {
          clearError(field);
        }
      });
    });
  });
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show error message for a field
function showError(field, message) {
  // Clear any existing error
  clearError(field);
  
  // Add error class to field
  field.classList.add('error');
  
  // Create error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  
  // Insert error after field
  field.parentNode.insertBefore(errorElement, field.nextSibling);
}

// Clear error for a field
function clearError(field) {
  field.classList.remove('error');
  const errorMessage = field.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Create form message element
function createFormMessage(form) {
  const formMessage = document.createElement('div');
  formMessage.className = 'form-message';
  form.appendChild(formMessage);
  return formMessage;
}

// Animations for elements as they enter the viewport
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  if (animatedElements.length === 0) return;
  
  // Set initial state (hidden)
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Check if element is in viewport and animate
  function checkIfInView() {
    animatedElements.forEach(el => {
      if (isElementInViewport(el) && el.style.opacity === '0') {
        // Add small delay for each subsequent element
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100);
      }
    });
  }
  
  // Run on load and scroll
  checkIfInView();
  window.addEventListener('scroll', checkIfInView);
  window.addEventListener('resize', checkIfInView);
}

// Check if element is in viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

// Add touch feedback for better mobile interaction
function initTouchFeedback() {
  const touchElements = document.querySelectorAll('a, button, .card, .btn');
  
  touchElements.forEach(el => {
    // Add active state on touch start
    el.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, { passive: true });
    
    // Remove active state on touch end
    ['touchend', 'touchcancel'].forEach(event => {
      el.addEventListener(event, function() {
        this.classList.remove('touch-active');
      }, { passive: true });
    });
  });
  
  // Add CSS rule for touch feedback
  const style = document.createElement('style');
  style.textContent = `
    .touch-active {
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
  `;
  document.head.appendChild(style);
}

// Fix 100vh issue on mobile browsers
function fixMobileViewportHeight() {
  if (window.innerWidth <= 768) {
    // Set correct height variables
    function setVhVariable() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Set initially and on resize
    setVhVariable();
    window.addEventListener('resize', setVhVariable);
  }
}

// Prevent iOS from zooming when focusing inputs
function preventIOSZoom() {
  // Only apply on iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isIOS) {
    // Add viewport meta tag that prevents zooming
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
    }
    
    // Restore normal viewport when focusing inputs is complete
    document.body.addEventListener('focusout', function() {
      // Add short delay to ensure viewport is reset after keyboard closes
      setTimeout(function() {
        if (viewportMeta) {
          viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1');
        }
      }, 100);
    });
  }
} 