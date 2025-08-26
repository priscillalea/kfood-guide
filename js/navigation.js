// Navigation Management
class NavigationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupMobileMenu()
    this.setupSmoothScrolling()
    this.setupActiveNavigation()
    this.setupScrollEffects()
  }

  setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })

      // Close menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        })
      })
    }
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  setupActiveNavigation() {
    // Highlight active navigation based on current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html"
    const navLinks = document.querySelectorAll(".nav-link")

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  setupScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector(".navbar")
    let lastScrollTop = 0

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = "translateY(-100%)"
      } else {
        // Scrolling up
        navbar.style.transform = "translateY(0)"
      }

      lastScrollTop = scrollTop
    })

    // Loading animations
    this.setupLoadingAnimations()
  }

  setupLoadingAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
        }
      })
    }, observerOptions)

    // Observe elements for loading animation
    document.querySelectorAll(".category-card, .recipe-card, .medicine-content").forEach((el) => {
      el.classList.add("loading")
      observer.observe(el)
    })
  }
}

// Initialize navigation manager
document.addEventListener("DOMContentLoaded", () => {
  if (!window.navigationManager) {
    window.navigationManager = new NavigationManager();
  }
});

// Also export the class for manual initialization if needed
window.NavigationManager = NavigationManager;
