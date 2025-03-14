document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile menu toggle
  const navTrigger = document.querySelector('.nav-trigger');
  if (navTrigger) {
    navTrigger.addEventListener('change', function() {
      document.body.classList.toggle('nav-open', this.checked);
    });
  }
  
  // Form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Basic validation for required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMsg = field.parentNode.querySelector('.form-error');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'form-error';
            errorMsg.textContent = 'This field is required';
            field.parentNode.appendChild(errorMsg);
          }
        } else {
          field.classList.remove('error');
          const errorMsg = field.parentNode.querySelector('.form-error');
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
      
      // Email validation
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(field => {
        if (field.value.trim() && !isValidEmail(field.value)) {
          isValid = false;
          field.classList.add('error');
          
          // Add error message if it doesn't exist
          let errorMsg = field.parentNode.querySelector('.form-error');
          if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'form-error';
            errorMsg.textContent = 'Please enter a valid email address';
            field.parentNode.appendChild(errorMsg);
          } else {
            errorMsg.textContent = 'Please enter a valid email address';
          }
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
    
    // Clear error on input
    form.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', function() {
        this.classList.remove('error');
        const errorMsg = this.parentNode.querySelector('.form-error');
        if (errorMsg) {
          errorMsg.remove();
        }
      });
    });
  });
  
  // Helper function to validate email
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-fade-in');
  if (animateElements.length > 0) {
    // Set initial state
    animateElements.forEach(el => {
      el.style.opacity = '0';
    });
    
    // Check if element is in viewport
    function isInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
      animateElements.forEach(el => {
        if (isInViewport(el) && el.style.opacity === '0') {
          el.style.opacity = '1';
        }
      });
    }
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
  }
}); 