// Bug Bounty Village Brazil - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Ultra Dark Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(0, 255, 136, 0.05)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.85)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.02)';
        }
    });

    // Intersection Observer for Enhanced Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grids
                if (entry.target.classList.contains('about-grid') || 
                    entry.target.classList.contains('events-grid') || 
                    entry.target.classList.contains('speakers-grid') ||
                    entry.target.classList.contains('community-stats')) {
                    
                    const cards = entry.target.children;
                    Array.from(cards).forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .event-card, .speaker-card, .stat-card, ' +
        '.about-grid, .events-grid, .speakers-grid, .community-stats'
    );
    
    animateElements.forEach(el => {
        // Set initial state for staggered animations
        if (el.classList.contains('about-card') || 
            el.classList.contains('event-card') || 
            el.classList.contains('speaker-card') ||
            el.classList.contains('stat-card')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Enhanced Code Rain Effect
    function createCodeRain() {
        const codeRain = document.querySelector('.code-rain');
        if (!codeRain) return;

        const codes = [
            '01001000', '11010110', '10101010', '01100111', '11001100',
            '10011001', '01010101', '11110000', '00111100', '10110011',
            '11100001', '00010111', '10001001', '01110100', '11010101'
        ];

        // Clear existing code lines
        codeRain.innerHTML = '';

        // Create new code lines with better distribution
        for (let i = 0; i < 8; i++) {
            const codeLine = document.createElement('div');
            codeLine.className = 'code-line';
            codeLine.textContent = codes[Math.floor(Math.random() * codes.length)];
            codeLine.style.left = `${10 + (i * 12)}%`;
            codeLine.style.setProperty('--delay', `${Math.random() * 3}s`);
            codeLine.style.setProperty('--duration', `${4 + Math.random() * 3}s`);
            codeRain.appendChild(codeLine);
        }
    }

    // Initialize code rain and refresh every 20 seconds
    createCodeRain();
    setInterval(createCodeRain, 20000);

    // Enhanced Parallax Effect for Background Orbs
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const orbs = document.querySelectorAll('.gradient-orb');
        
        orbs.forEach((orb, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Counter Animation for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function count() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(count);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        count();
    }

    // Initialize counters when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/[^\d]/g, ''));
                    if (number && number > 10) {
                        animateCounter(statNumber, number);
                    }
                }
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // Enhanced Button Interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
    });

    // Enhanced Card Hover Effects
    const cards = document.querySelectorAll('.about-card, .event-card, .speaker-card, .stat-card, .community-link');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced Dark Logo Glow Effect
    const logo = document.querySelector('.logo-img');
    if (logo) {
        setInterval(() => {
            logo.style.filter = `
                drop-shadow(0 0 20px rgba(0, 255, 136, 0.7))
                drop-shadow(0 0 40px rgba(0, 255, 136, 0.4))
                brightness(1.2)
            `;
            setTimeout(() => {
                logo.style.filter = `
                    drop-shadow(0 0 15px rgba(0, 255, 136, 0.5))
                    drop-shadow(0 0 30px rgba(0, 255, 136, 0.3))
                    brightness(1.1)
                `;
            }, 1500);
        }, 4000);
    }

    // Ultra Dark Floating Particles
    function createFloatingParticles() {
        const hero = document.querySelector('.hero');
        if (!hero || hero.querySelector('.floating-particles')) return;

        const particles = document.createElement('div');
        particles.className = 'floating-particles';
        particles.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Create darker, more subtle floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const colors = [
                'rgba(0, 255, 136, 0.15)',
                'rgba(0, 188, 212, 0.1)',
                'rgba(255, 235, 59, 0.08)'
            ];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${1 + Math.random() * 3}px;
                height: ${1 + Math.random() * 3}px;
                background: ${randomColor};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${15 + Math.random() * 15}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
                box-shadow: 0 0 ${5 + Math.random() * 10}px ${randomColor};
            `;
            particles.appendChild(particle);
        }

        hero.appendChild(particles);
    }

    // Add CSS for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) translateX(0) scale(0.5);
                opacity: 0;
            }
            5% {
                opacity: 0.3;
            }
            10% {
                opacity: 0.6;
            }
            85% {
                opacity: 0.6;
            }
            95% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(${Math.random() * 300 - 150}px) scale(0.2);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize floating particles
    createFloatingParticles();

    // Performance optimization: throttle scroll events
    let ticking = false;
    
    function optimizedScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Scroll-dependent functions already called above
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', optimizedScroll);

    // Enhanced Console Easter Egg
    console.log(`
    ██████╗ ██╗   ██╗ ██████╗     ██████╗  ██████╗ ██╗   ██╗███╗   ██╗████████╗██╗   ██╗
    ██╔══██╗██║   ██║██╔════╝     ██╔══██╗██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝╚██╗ ██╔╝
    ██████╔╝██║   ██║██║  ███╗    ██████╔╝██║   ██║██║   ██║██╔██╗ ██║   ██║    ╚████╔╝ 
    ██╔══██╗██║   ██║██║   ██║    ██╔══██╗██║   ██║██║   ██║██║╚██╗██║   ██║     ╚██╔╝  
    ██████╔╝╚██████╔╝╚██████╔╝    ██████╔╝╚██████╔╝╚██████╔╝██║ ╚████║   ██║      ██║   
    ╚═════╝  ╚═════╝  ╚═════╝     ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝      ╚═╝   
                                                                                        
    ██╗   ██╗██╗██╗     ██╗      █████╗  ██████╗ ███████╗    ██████╗ ██████╗  █████╗ ███████╗██╗██╗     
    ██║   ██║██║██║     ██║     ██╔══██╗██╔════╝ ██╔════╝    ██╔══██╗██╔══██╗██╔══██╗╚══███╔╝██║██║     
    ██║   ██║██║██║     ██║     ███████║██║  ███╗█████╗      ██████╔╝██████╔╝███████║  ███╔╝ ██║██║     
    ╚██╗ ██╔╝██║██║     ██║     ██╔══██║██║   ██║██╔══╝      ██╔══██╗██╔══██╗██╔══██║ ███╔╝  ██║██║     
     ╚████╔╝ ██║███████╗███████╗██║  ██║╚██████╔╝███████╗    ██████╔╝██║  ██║██║  ██║███████╗██║███████╗
      ╚═══╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝
    
    🇧🇷 Bem-vindo à Bug Bounty Village Brasil! 
    🔒 A maior comunidade de ethical hacking do Brasil!
    🎯 Bom hunting, fellow hacker!
    
    💚 Desenvolvido com amor para a comunidade brasileira
    🚀 Vamos juntos construir um Brasil digital mais seguro!
    `);

    // Ultra Dark Mode Always
    // Force ultra dark theme regardless of time
    document.documentElement.style.setProperty('--primary-bg', '#000000');
    
    // Add dark ambient lighting effect
    const darkAmbient = document.createElement('div');
    darkAmbient.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: 
            radial-gradient(ellipse at 25% 25%, rgba(0, 255, 136, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 75%, rgba(0, 188, 212, 0.015) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
        pointer-events: none;
        z-index: -2;
    `;
    document.body.appendChild(darkAmbient);

});