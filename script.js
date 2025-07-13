// =====================================
// Personal Resume Website JavaScript
// =====================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const typedText = document.getElementById('typed-text');
const downloadResumeBtn = document.getElementById('download-resume');

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.bindEvents();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon() {
        const icon = themeToggle.querySelector('i');
        if (this.currentTheme === 'light') {
            icon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
        }
    }

    bindEvents() {
        themeToggle.addEventListener('click', () => this.toggleTheme());
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Update active navigation link
            this.updateActiveNavLink();
            
            // Show/hide back to top button
            this.toggleBackToTop(scrollTop);
            
            // Add/remove navbar background on scroll
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    toggleBackToTop(scrollTop) {
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    bindEvents() {
        // Mobile menu toggle
        navToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Back to top button
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, strings, options = {}) {
        this.element = element;
        this.strings = strings;
        this.options = {
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            ...options
        };
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        setTimeout(() => this.type(), this.options.startDelay);
    }

    type() {
        const currentString = this.strings[this.currentStringIndex];
        
        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }
        
        this.element.textContent = currentString.substring(0, this.currentCharIndex);
        
        let typeSpeed = this.isDeleting ? this.options.backSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentString.length) {
            typeSpeed = this.options.backDelay;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
            typeSpeed = this.options.typeSpeed;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Animated Counter
class AnimatedCounter {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        
        this.hasAnimated = true;
        const start = 0;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (this.target - start) * easeOut);
            
            this.element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                this.element.textContent = this.target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.hasAnimated = false;
    }

    animate() {
        if (this.hasAnimated) return;
        
        this.hasAnimated = true;
        
        this.skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
    }
}

// Project Filter
class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    filter(category) {
        this.projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('filtered');
            } else {
                card.classList.add('filtered');
            }
        });
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelector(`[data-filter="${category}"]`).classList.add('active');
    }

    bindEvents() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filter(filter);
            });
        });
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-item');
        this.navigationBtns = document.querySelectorAll('.testimonial-btn');
        this.currentIndex = 0;
        this.autoPlayInterval = 5000;
        this.autoPlayTimer = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoPlay();
    }

    showTestimonial(index) {
        // Hide all testimonials
        this.testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all navigation buttons
        this.navigationBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show current testimonial
        this.testimonials[index].classList.add('active');
        this.navigationBtns[index].classList.add('active');
        
        this.currentIndex = index;
    }

    nextTestimonial() {
        const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.showTestimonial(nextIndex);
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            this.nextTestimonial();
        }, this.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    bindEvents() {
        this.navigationBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.showTestimonial(index);
                this.startAutoPlay();
            });
        });
        
        // Pause autoplay on hover
        const testimonialSlider = document.querySelector('.testimonials-slider');
        testimonialSlider.addEventListener('mouseenter', () => this.stopAutoPlay());
        testimonialSlider.addEventListener('mouseleave', () => this.startAutoPlay());
    }
}

// Form Validation
class FormValidator {
    constructor(form) {
        this.form = form;
        this.fields = {
            name: form.querySelector('#name'),
            email: form.querySelector('#email'),
            subject: form.querySelector('#subject'),
            message: form.querySelector('#message')
        };
        this.init();
    }

    init() {
        this.bindEvents();
    }

    validateField(field, value) {
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (value.trim().length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            
            case 'subject':
                if (value.trim().length < 3) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 3 characters long';
                }
                break;
            
            case 'message':
                if (value.trim().length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
                break;
        }

        this.showFieldError(field, errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        
        if (message) {
            errorElement.textContent = message;
            field.classList.add('error');
        } else {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
    }

    validateForm() {
        let isFormValid = true;
        
        Object.values(this.fields).forEach(field => {
            const isFieldValid = this.validateField(field, field.value);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }

    showFormStatus(type, message) {
        const statusElement = document.getElementById('form-status');
        statusElement.className = `form-status ${type}`;
        statusElement.textContent = message;
        statusElement.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            statusElement.style.display = 'none';
        }, 5000);
    }

    async submitForm(formData) {
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In a real application, you would send the data to your server
            console.log('Form submitted:', Object.fromEntries(formData));
            
            this.showFormStatus('success', 'Thank you! Your message has been sent successfully.');
            this.form.reset();
            
        } catch (error) {
            this.showFormStatus('error', 'Sorry, there was an error sending your message. Please try again.');
        }
    }

    bindEvents() {
        // Real-time validation
        Object.values(this.fields).forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field, field.value);
            });
            
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field, field.value);
                }
            });
        });
        
        // Form submission
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                const submitBtn = this.form.querySelector('button[type="submit"]');
                const originalText = submitBtn.querySelector('.btn-text').textContent;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                
                const formData = new FormData(this.form);
                await this.submitForm(formData);
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').textContent = originalText;
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initializeCounters();
        this.initializeSkills();
        this.initializeGeneralAnimations();
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target.getAttribute('data-target');
                    const counter = new AnimatedCounter(entry.target, target);
                    counter.animate();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    initializeSkills() {
        const skillsSection = document.querySelector('.skills');
        const skillsAnimation = new SkillsAnimation();
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillsAnimation.animate();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    initializeGeneralAnimations() {
        const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .education-item, .cert-item');
        
        const generalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            generalObserver.observe(element);
        });
    }
}

// Download Resume Function
function handleDownloadResume() {
    // In a real application, this would download an actual PDF file
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual PDF URL
    link.download = 'John_Doe_Resume.pdf';
    
    // For demo purposes, show an alert
    alert('Resume download would start here. Please replace with actual PDF URL.');
    
    // Uncomment the following lines when you have an actual PDF file
    // link.click();
}

// Utility Functions
const utils = {
    // Debounce function for performance optimization
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
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Main Application Class
class PersonalWebsite {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.scrollAnimations = new ScrollAnimations();
        
        // Initialize typing animation
        if (typedText) {
            this.typingAnimation = new TypingAnimation(typedText, [
                'Full Stack Developer',
                'React Specialist',
                'Node.js Expert',
                'Problem Solver',
                'Code Enthusiast'
            ]);
        }
        
        // Initialize project filter
        this.projectFilter = new ProjectFilter();
        
        // Initialize testimonial slider
        this.testimonialSlider = new TestimonialSlider();
        
        // Initialize form validation
        if (contactForm) {
            this.formValidator = new FormValidator(contactForm);
        }
        
        // Bind download resume button
        if (downloadResumeBtn) {
            downloadResumeBtn.addEventListener('click', handleDownloadResume);
        }
        
        // Initialize performance optimizations
        this.initializePerformanceOptimizations();
        
        // Initialize accessibility features
        this.initializeAccessibility();
        
        console.log('Personal Website initialized successfully!');
    }

    initializePerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Optimize scroll events
        const optimizedScrollHandler = utils.throttle(() => {
            // Handle scroll events efficiently
        }, 16);
        
        window.addEventListener('scroll', optimizedScrollHandler);
    }

    initializeAccessibility() {
        // Keyboard navigation for custom elements
        document.addEventListener('keydown', (e) => {
            // Handle Enter key as click for buttons
            if (e.key === 'Enter' && e.target.matches('.filter-btn, .testimonial-btn')) {
                e.target.click();
            }
            
            // Handle Escape key to close mobile menu
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                this.navigationManager.closeMobileMenu();
            }
        });
        
        // Add focus indicators
        document.addEventListener('focusin', (e) => {
            if (e.target.matches('button, input, textarea, a')) {
                e.target.classList.add('focus-visible');
            }
        });
        
        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });
        
        // Announce dynamic content changes to screen readers
        this.announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.classList.add('sr-only');
            announcement.textContent = message;
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        };
    }
}

// Initialize the application
const app = new PersonalWebsite();

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PersonalWebsite,
        ThemeManager,
        NavigationManager,
        TypingAnimation,
        AnimatedCounter,
        SkillsAnimation,
        ProjectFilter,
        TestimonialSlider,
        FormValidator,
        ScrollAnimations,
        utils
    };
}