// JavaScript for home page interactions

document.addEventListener('DOMContentLoaded', function() {
  // Only apply these effects on the home page
  if (document.body.classList.contains('home')) {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');
    
    // Function to toggle header background on scroll
    function toggleHeaderBackground() {
      // Add solid background after scrolling past hero
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Initial check
    toggleHeaderBackground();
    
    // Add scroll event listener
    window.addEventListener('scroll', toggleHeaderBackground);
  }
}); 