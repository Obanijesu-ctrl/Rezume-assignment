// Initialize portfolio on DOM load
document.addEventListener('DOMContentLoaded', initPortfolio);

function initPortfolio() {
    initNav();
    typeWriter();
    scrollAnimations();
    skillBars();
    contactForm();
    projectSlider();
    counterAnimation();
    scrollEffects();
}

// Navigation with mobile menu
function initNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.onclick = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else bars.forEach(bar => bar.style = '');
    };

    navLinks.forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            const target = document.querySelector(link.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        };
    });

    window.onscroll = () => {
        navbar.style.background = window.scrollY > 100 ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)';
        navbar.style.boxShadow = window.scrollY > 100 ? '0 2px 20px rgba(0,0,0,0.1)' : 'none';
        
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    };
}

// Typing effect
function typeWriter() {
    const text = "Hey there, I am Obanijesu";
    const element = document.getElementById('typing-text');
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);
}

// Scroll animations
function scrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.skill-card, .timeline-item, .about-text, .contact-content').forEach(el => {
        el.style.cssText = 'opacity:0; transform:translateY(30px); transition:all 0.6s ease';
        observer.observe(el);
    });
}

// Skill progress bars
function skillBars() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.width = entry.target.getAttribute('data-progress') + '%';
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach(bar => observer.observe(bar));
}

// Counter animation
function counterAnimation() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const timer = setInterval(() => {
                    current += target / 50;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else entry.target.textContent = Math.floor(current);
                }, 50);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));
}

// Project slider
function projectSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.project-card');
    const dots = document.querySelectorAll('.dot');

    window.changeSlide = (direction) => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    window.currentSlide = (slideIndex) => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = slideIndex - 1;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    setInterval(() => changeSlide(1), 5000);
}

// Contact form
function contactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.onsubmit = (e) => {
        e.preventDefault();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        let isValid = true;
        if (!name) { showError('name-error', 'Name is required'); isValid = false; }
        if (!email) { showError('email-error', 'Email is required'); isValid = false; }
        else if (!emailRegex.test(email)) { showError('email-error', 'Invalid email'); isValid = false; }
        if (!message) { showError('message-error', 'Message is required'); isValid = false; }
        
        if (isValid) {
            const btn = form.querySelector('.btn-primary');
            btn.textContent = 'Sending...';
            btn.disabled = true;
            setTimeout(() => {
                alert('Message sent! I\'ll get back to you soon.');
                form.reset();
                closeModal('contact-modal');
                btn.textContent = 'Send Message';
                btn.disabled = false;
            }, 2000);
        }
    };
}

function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

// Modal functions
window.openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

window.scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
};

// Scroll effects
function scrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const profileImg = document.getElementById('profile-img');
    
    window.addEventListener('scroll', () => {
        if (scrollIndicator) scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        if (profileImg) profileImg.style.transform = `translateY(${window.scrollY * -0.5}px)`;
    });
}

// Event listeners
window.onclick = (e) => {
    if (e.target.classList.contains('modal')) closeModal(e.target.id);
};

document.onkeydown = (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal[style*="block"]');
        if (modal) closeModal(modal.id);
    }
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'ArrowRight') changeSlide(1);
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .nav-link.active { color: #667eea; }
    .nav-link.active::after { width: 100%; }
    .modal-content { transform: scale(0.8); opacity: 0; transition: all 0.3s ease; }
`;
document.head.appendChild(style);