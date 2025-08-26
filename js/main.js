// Main Application Controller
class KFoodGuideApp {
    constructor() {
        this.init();
    }

    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    async setup() {
        // Initialize all managers
        await this.initializeManagers();
        
        // Setup page-specific functionality
        this.setupPageSpecific();
        
        // Setup global event listeners
        this.setupGlobalListeners();
        
        // Initialize animations
        this.initializeAnimations();
    }

    async initializeManagers() {
        // Language manager should be initialized first
        if (window.languageManager) {
            await window.languageManager.init();
        }

        // Initialize other managers if they exist
        if (window.navigationManager && typeof window.navigationManager.init === 'function') {
            window.navigationManager.init();
        }

        if (window.menuManager && typeof window.menuManager.init === 'function') {
            await window.menuManager.init();
        }

        if (window.modalManager && typeof window.modalManager.init === 'function') {
            window.modalManager.init();
        }
    }

    setupPageSpecific() {
        const currentPage = this.getCurrentPage();
        
        switch (currentPage) {
            case 'index.html':
            case '':
                this.setupHomePage();
                break;
            case 'menu.html':
                this.setupMenuPage();
                break;
            case 'culture.html':
                this.setupCulturePage();
                break;
            case 'about.html':
                this.setupAboutPage();
                break;
            default:
                break;
        }
    }

    setupHomePage() {
        // Setup hero section interactions
        this.setupHeroSection();
        
        // Load featured recipes
        this.loadFeaturedRecipes();
        
        // Setup CTA buttons
        this.setupCTAButtons();
    }

    setupHeroSection() {
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                window.location.href = 'menu.html';
            });
        }

        // Add parallax effect to hero images
        this.setupParallaxEffect();
    }

    setupParallaxEffect() {
        const heroImages = document.querySelectorAll('.hero-img');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroImages.forEach(img => {
                img.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    async loadFeaturedRecipes() {
        const featuredContainer = document.getElementById('featuredRecipes');
        if (!featuredContainer || !window.menuManager) return;

        // Wait for menu manager to load recipes
        await new Promise(resolve => {
            const checkLoaded = () => {
                if (window.menuManager.recipes.length > 0) {
                    resolve();
                } else {
                    setTimeout(checkLoaded, 100);
                }
            };
            checkLoaded();
        });

        // Render featured recipes
        window.menuManager.renderRecipes();
    }

    setupCTAButtons() {
        const learnMoreBtn = document.querySelector('.learn-more-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                window.location.href = 'culture.html';
            });
        }

        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                window.location.href = 'menu.html';
            });
        }
    }

    setupMenuPage() {
        // Menu page is handled by MenuManager
        console.log('Menu page setup complete');
    }

    setupCulturePage() {
        // Setup culture page specific interactions
        this.setupCultureInteractions();
    }

    setupCultureInteractions() {
        // Add hover effects to color philosophy items
        const colorItems = document.querySelectorAll('.color-item');
        colorItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
            });
        });

        // Add click interactions to region cards
        const regionCards = document.querySelectorAll('.region-card');
        regionCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('expanded');
            });
        });
    }

    setupAboutPage() {
        // Setup FAQ functionality
        this.setupFAQ();
        
        // Setup contact form
        this.setupContactForm();
    }

    setupFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const isActive = question.classList.contains('active');
                
                // Close all other FAQ items
                faqQuestions.forEach(q => q.classList.remove('active'));
                
                // Toggle current item
                if (!isActive) {
                    question.classList.add('active');
                }
            });
        });
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(contactForm);
                const name = formData.get('name');
                const email = formData.get('email');
                const subject = formData.get('subject');
                const message = formData.get('message');
                
                // Simple validation
                if (!name || !email || !subject || !message) {
                    this.showErrorMessage('Por favor, preencha todos os campos.');
                    return;
                }
                
                // Simulate form submission
                this.showSuccessMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                
                // Reset form
                contactForm.reset();
            });
        }
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    setupGlobalListeners() {
        // Global scroll listener for navbar
        this.setupNavbarScroll();
        
        // Global resize listener
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Global error handler
        window.addEventListener('error', this.handleError.bind(this));
    }

    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        this.adjustLayoutForScreenSize();
    }

    adjustLayoutForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        
        // Adjust hero section for mobile
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            if (isMobile) {
                heroContent.style.gridTemplateColumns = '1fr';
            } else {
                heroContent.style.gridTemplateColumns = '1fr 1fr';
            }
        }
    }

    handleError(event) {
        console.error('Application error:', event.error);
        
        // Show user-friendly error message
        this.showErrorMessage('Ocorreu um erro. Por favor, recarregue a página.');
    }

    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    initializeAnimations() {
        // Add fade-in class to elements that should animate
        const animatedElements = document.querySelectorAll('.category-card, .recipe-card, .culture-section');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
        });

        // Setup intersection observer for animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    // Utility methods
    showLoading(container) {
        if (container) {
            container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
        }
    }

    hideLoading(container) {
        const loading = container?.querySelector('.loading');
        if (loading) {
            loading.remove();
        }
    }

    // Performance optimization
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    if (!window.kFoodGuideApp) {
        window.kFoodGuideApp = new KFoodGuideApp();
    }
});

// Add some additional CSS for animations and error messages
const additionalStyles = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.navbar {
    transition: transform 0.3s ease;
}

.region-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.region-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.region-card.expanded {
    background: var(--primary-blue);
    color: white;
}

.color-item {
    transition: transform 0.2s ease;
    cursor: pointer;
}

.hero-img {
    transition: transform 0.1s ease-out;
}

.error-message {
    font-family: var(--font-primary);
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
`;

// Inject additional styles
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalStyles;
document.head.appendChild(additionalStyleSheet);
