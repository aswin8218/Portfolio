// ====== GLOBAL VARIABLES ======
let scene, camera, renderer, particles;
let skillsScene, skillsCamera, skillsRenderer;
let clock = new THREE.Clock();
let isLoaded = false;

// ====== INITIALIZATION ======
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
    initParticles();
    initHeroAnimations();
    initWelcomeTextAnimation();
    createParticleTrail();
    initSkillsScene();
    initProjectFilters();
    initContactForm();
    initScrollEffects();
    initThemeToggle();
});

// ====== LOADING SCREEN ======
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progress = document.querySelector('.progress');
    
    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        width += 10;
        progress.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                isLoaded = true;
                initTypewriter();
            }, 500);
        }
    }, 250);
}

// ====== NAVIGATION ======
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ====== PARTICLES BACKGROUND ======
function initParticles() {
    const particlesCanvas = document.getElementById('particles-canvas');
    
    particlesJS('particles-canvas', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#9D00FF',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ====== HERO ANIMATIONS ======
function initHeroAnimations() {
    const staticWelcome = document.querySelector('.static-welcome');
    const unrealBadge = document.querySelector('.unreal-badge');
    const heroContent = document.querySelector('.hero-content');
    
    // Show static welcome message initially
    setTimeout(() => {
        staticWelcome.classList.add('visible');
    }, 500);
    
    // Show Unreal Engine badge
    setTimeout(() => {
        unrealBadge.classList.add('visible');
    }, 1500);
    
    // Hide static welcome message and badge, show hero content
    setTimeout(() => {
        staticWelcome.classList.add('hidden');
        unrealBadge.classList.add('hidden');
        heroContent.classList.add('visible');
        
        // Animate hero elements
        const heroText = document.querySelector('.hero-text');
        const heroVisual = document.querySelector('.hero-visual');
        
        setTimeout(() => {
            heroText.style.animation = 'fadeInUp 1s forwards';
        }, 500);
        
        setTimeout(() => {
            heroVisual.style.animation = 'fadeInUp 1s forwards';
        }, 800);
    }, 4000); // Show for 4 seconds then transition
}

// ====== WELCOME TEXT SCROLL ANIMATION ======
function initWelcomeTextAnimation() {
    const welcomeText = document.querySelector('.welcome-text');
    const welcomeLetters = document.querySelectorAll('.welcome-letter');
    
    // Function to handle scroll animation
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate the position of the welcome text based on scroll
        const textPosition = Math.min(scrollPosition / 3, windowHeight);
        welcomeText.style.transform = `translateY(${-windowHeight + textPosition}px)`;
        
        // Add a wave effect to the letters based on scroll position
        welcomeLetters.forEach((letter, index) => {
            const offset = (scrollPosition / 20 + index * 0.1) % (Math.PI * 2);
            const translateY = Math.sin(offset) * 10;
            const rotateX = Math.sin(offset * 0.5) * 10;
            const rotateY = Math.cos(offset * 0.5) * 10;
            
            letter.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Change opacity based on scroll position
            const opacity = Math.min(0.1 + (scrollPosition / windowHeight) * 0.3, 0.4);
            letter.style.color = `rgba(157, 0, 255, ${opacity})`;
            letter.style.textShadow = `0 0 ${10 + scrollPosition / 20}px rgba(157, 0, 255, ${opacity * 3})`;
        });
    }
    
    // Initial call to set starting position
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add mouse move effect for additional interactivity
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        welcomeLetters.forEach((letter, index) => {
            const offsetX = (mouseX - 0.5) * 20;
            const offsetY = (mouseY - 0.5) * 20;
            
            letter.style.transform += ` translate(${offsetX}px, ${offsetY}px)`;
        });
    });
}

// ====== PARTICLE TRAIL FOR WELCOME TEXT ======
function createParticleTrail() {
    const welcomeText = document.querySelector('.welcome-text');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-trail';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '0';
    
    document.querySelector('.hero').appendChild(particleContainer);
    
    // Create particles
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = '#9D00FF';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = '0 0 10px #9D00FF';
        
        particleContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speedX: (Math.random() - 0.5) * 2,
            speedY: Math.random() * 2 + 1,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.1
        });
    }
    
    // Animation function
    function animateParticles() {
        const scrollPosition = window.scrollY;
        const textPosition = Math.min(scrollPosition / 3, window.innerHeight);
        
        particles.forEach(particle => {
            // Update position
            particle.y -= particle.speedY;
            particle.x += particle.speedX;
            
            // Reset particle if it goes off screen
            if (particle.y < -10) {
                particle.y = window.innerHeight + 10;
                particle.x = Math.random() * window.innerWidth;
            }
            
            // Apply position and style
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
            particle.element.style.width = `${particle.size}px`;
            particle.element.style.height = `${particle.size}px`;
            
            // Adjust opacity based on position relative to welcome text
            const distanceToText = Math.abs(particle.y - (window.innerHeight - textPosition));
            const maxDistance = window.innerHeight;
            const normalizedDistance = Math.min(distanceToText / maxDistance, 1);
            particle.element.style.opacity = particle.opacity * (1 - normalizedDistance);
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ====== TYPEWRITER EFFECT ======
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const texts = [
        'FOUNDER • DEVELOPER • CYBER ENTHUSIAST', 
        'UNREAL ENGINE DEVELOPER • CREATOR OF IMMERSIVE EXPERIENCES',
        'EXPLORING NEW TECHNOLOGIES • PUSHING BOUNDARIES'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before typing next text
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typewriter after hero content is visible
    setTimeout(() => {
        type();
    }, 5000);
}

// ====== SKILLS 3D SCENE ======
function initSkillsScene() {
    const container = document.getElementById('skills-canvas');
    if (!container) return;
    
    // Scene setup
    skillsScene = new THREE.Scene();
    skillsCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    skillsRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    skillsRenderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(skillsRenderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    skillsScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    skillsScene.add(directionalLight);
    
    // Create floating skill icons
    const skillIcons = [];
    const skillNames = ['HTML', 'CSS', 'JS', 'React', 'Unreal', 'C++', 'Kali', 'Git'];
    const colors = [0x9D00FF, 0x00FFFF, 0xFF5500, 0x00FF00, 0xFFFF00, 0xFF00FF, 0x00FFFF, 0x9D00FF];
    
    for (let i = 0; i < skillNames.length; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 0.2);
        const material = new THREE.MeshStandardMaterial({
            color: colors[i],
            emissive: colors[i],
            emissiveIntensity: 0.5,
            metalness: 0.7,
            roughness: 0.2
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (i % 4 - 1.5) * 2.5;
        mesh.position.y = (Math.floor(i / 4) - 0.5) * 2.5;
        mesh.position.z = 0;
        
        skillsScene.add(mesh);
        skillIcons.push(mesh);
        
        // Add text to the box
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 128;
        canvas.height = 128;
        
        context.fillStyle = '#ffffff';
        context.font = 'bold 40px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(skillNames[i], 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const textMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true
        });
        
        const textGeometry = new THREE.PlaneGeometry(0.8, 0.8);
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(0, 0, 0.11);
        mesh.add(textMesh);
    }
    
    skillsCamera.position.z = 8;
    
    // Animation function
    function animateSkills() {
        requestAnimationFrame(animateSkills);
        
        const elapsedTime = clock.getElapsedTime();
        
        skillIcons.forEach((icon, i) => {
            icon.rotation.x = Math.sin(elapsedTime * 0.5 + i) * 0.2;
            icon.rotation.y = Math.cos(elapsedTime * 0.5 + i) * 0.2;
            icon.position.y += Math.sin(elapsedTime * 0.3 + i) * 0.01;
        });
        
        skillsRenderer.render(skillsScene, skillsCamera);
    }
    
    animateSkills();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (container && skillsCamera && skillsRenderer) {
            skillsCamera.aspect = container.clientWidth / container.clientHeight;
            skillsCamera.updateProjectionMatrix();
            skillsRenderer.setSize(container.clientWidth, container.clientHeight);
        }
    });
}

// ====== PROJECT FILTERS ======
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ====== CONTACT FORM ======
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showFormMessage('Sending message...', 'info');
        
        setTimeout(() => {
            // In a real implementation, you would send the data to a server here
            showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        if (type === 'info') {
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 1500);
        }
    }
}

// ====== SCROLL EFFECTS ======
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const revealElements = document.querySelectorAll('.about-card, .skill-category, .project-card');
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
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
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Animate skill bars when in view
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            
            if (barTop < window.innerHeight - 100 && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load
}

// ====== THEME TOGGLE ======
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        if (body.classList.contains('light-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            // In a real implementation, you would update CSS variables here
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ====== ADDITIONAL ANIMATIONS ======
// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hero-text, .hero-visual {
        opacity: 0;
    }
    
    .about-card, .skill-category, .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .about-card.revealed, .skill-category.revealed, .project-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-progress {
        width: 0;
        transition: width 1.5s ease;
    }
`;
document.head.appendChild(style);