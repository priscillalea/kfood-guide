// Debug script to identify issues
console.log('Debug script loaded');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Check if elements exist
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    console.log('Navbar:', navbar);
    console.log('Nav menu:', navMenu);
    console.log('Hamburger:', hamburger);
    
    // Check if managers are loaded
    console.log('Language manager:', window.languageManager);
    console.log('Navigation manager:', window.navigationManager);
    console.log('Main app:', window.kFoodGuideApp);
    
    // Test hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked');
            if (navMenu) {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            }
        });
    }
    
    // Test nav links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('Nav links found:', navLinks.length);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Nav link clicked:', link.href);
        });
    });
});
