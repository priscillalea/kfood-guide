// Menu Management System
class MenuManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupMenuItems();
        this.setupRecipeLinks();
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterMenuItems(filter);
                this.updateActiveFilter(button);
            });
        });
    }

    setupMenuItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const recipeId = item.getAttribute('data-recipe');
                if (recipeId) {
                    this.showRecipeDetails(recipeId);
                }
            });
        });
    }

    setupRecipeLinks() {
        // Setup any additional recipe-related functionality
        console.log('Menu manager initialized');
    }

    filterMenuItems(filter) {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                item.style.display = 'block';
                item.classList.add('visible');
            } else {
                item.style.display = 'none';
                item.classList.remove('visible');
            }
        });
    }

    updateActiveFilter(activeButton) {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        activeButton.classList.add('active');
    }

    showRecipeDetails(recipeId) {
        // For now, just log the recipe ID
        // This can be expanded to show a modal or navigate to a detailed page
        console.log('Showing recipe details for:', recipeId);
        
        // You can implement a modal system here similar to the blog page
        // or navigate to a detailed recipe page
    }
}

// Initialize menu manager
document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
});

// Export for global access
window.menuManager = new MenuManager();
