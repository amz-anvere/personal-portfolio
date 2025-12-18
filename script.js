// ===========================
// Konfigurasi & Variabel Global
// ===========================

const config = {
    scrollThreshold: 100,
    navOffset: 70
};

// ===========================
// Mobile Navigation Toggle
// ===========================

function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu saat tombol hamburger diklik
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tutup menu saat link diklik
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > config.scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===========================
// Active Navigation Link
// ===========================

function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - config.navOffset)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===========================
// Smooth Scroll untuk Anchor Links
// ===========================

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Jangan preventDefault untuk link kosong
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - config.navOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// Portfolio Filter Functionality
// ===========================

function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    // Tambahkan animasi fade in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Set initial transition untuk smooth animation
    portfolioItems.forEach(item => {
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
}

// ===========================
// Back to Top Button
// ===========================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide button berdasarkan scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll ke atas saat button diklik
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// Contact Form Handler
// ===========================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Ambil data form
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulasi pengiriman form
        console.log('Form submitted:', formData);
        
        // Tampilkan pesan sukses
        alert('Terima kasih! Pesan Anda telah terkirim. Saya akan segera menghubungi Anda.');
        
        // Reset form
        contactForm.reset();
        
        // Dalam implementasi nyata, Anda bisa mengirim data ke server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Pesan berhasil terkirim!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('Terjadi kesalahan. Silakan coba lagi.');
        //     console.error('Error:', error);
        // });
    });
}

// ===========================
// Intersection Observer untuk Animasi
// ===========================

function initScrollAnimations() {
    // Observer untuk elemen yang akan dianimasi saat masuk viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Unobserve setelah animasi untuk performa
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elemen-elemen yang perlu animasi
    const animatedElements = document.querySelectorAll('.skill-card, .portfolio-item, .about-text');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // CSS untuk animasi masuk
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ===========================
// Form Input Validation & Feedback
// ===========================

function initFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // Validasi saat input kehilangan fokus
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        // Hapus error saat user mulai mengetik
        input.addEventListener('input', () => {
            removeError(input);
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    // Hapus error sebelumnya
    removeError(input);
    
    if (!value && input.hasAttribute('required')) {
        showError(input, 'Field ini wajib diisi');
        return false;
    }
    
    // Validasi email
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, 'Email tidak valid');
            return false;
        }
    }
    
    return true;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.5rem';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }
    
    input.style.borderColor = '#ff6b6b';
}

function removeError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    input.style.borderColor = '';
}

// ===========================
// Loading Animation untuk Hero
// ===========================

function initHeroAnimation() {
    // Pastikan hero elements sudah di-render
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroTitle) {
        // Animasi sudah didefinisikan di CSS
        // Ini hanya memastikan animasi berjalan dengan baik
        setTimeout(() => {
            heroTitle.style.opacity = '1';
        }, 100);
    }
}

// ===========================
// Keyboard Navigation Support
// ===========================

function initKeyboardNavigation() {
    // Tambahkan keyboard support untuk portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextButton = filterButtons[index + 1] || filterButtons[0];
                nextButton.focus();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevButton = filterButtons[index - 1] || filterButtons[filterButtons.length - 1];
                prevButton.focus();
            }
        });
    });
}

// ===========================
// Initialize All Functions
// ===========================

function init() {
    // Tunggu sampai DOM fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
}

function initializeApp() {
    // Inisialisasi semua fungsi
    initMobileNav();
    initNavbarScroll();
    initActiveNavLink();
    initSmoothScroll();
    initPortfolioFilter();
    initBackToTop();
    initContactForm();
    initScrollAnimations();
    initFormValidation();
    initHeroAnimation();
    initKeyboardNavigation();
    
    console.log('Portfolio website initialized successfully!');
}

// ===========================
// Start Application
// ===========================

init();