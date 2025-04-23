document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Wait for Font Awesome to load (if needed)
    function initAnimations() {
        // Register ScrollTrigger if GSAP is loaded
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section animations
            const heroTimeline = gsap.timeline();
            
            heroTimeline
                .from('.logo', {
                    y: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                })
                .from('.hero-image', {
                    y: -50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                })
                .from('.nav-links li', {
                    y: -50,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, "-=0.5")
                .from('.greeting', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.5")
                .from('.name', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.4")
                .from('.title', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.4")
                .from('.description', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.4")
                .from('.cta-buttons', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, "-=0.4")
                .from('.scroll-indicator', {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out'
                }, "-=0.5");

            // Only animate tech icons if they exist and are visible
            const techIcons = document.querySelectorAll('.tech-icons i');
            if (techIcons.length > 0) {
                // First check if icons are actually rendered
                if (getComputedStyle(techIcons[0]).display !== 'none') {
                    heroTimeline.from(techIcons, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.7)'
                    }, "-=0.4");

                    // Continuous animation only if icons are visible
                    gsap.to(techIcons, {
                        y: 10,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        stagger: 0.2
                    });
                }
            }
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (header) {
                if (window.scrollY > 50) {
                    header.style.padding = '0.5rem 2rem';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.padding = '1rem 2rem';
                    header.style.boxShadow = 'none';
                }
            }
        });
    }

    // Check if Font Awesome is loaded every 100ms for up to 3 seconds
    let faCheckInterval;
    let faCheckCount = 0;
    
    function checkFontAwesomeLoaded() {
        faCheckCount++;
        const testIcon = document.createElement('i');
        testIcon.className = 'fa fa-test';
        document.body.appendChild(testIcon);
        const faLoaded = getComputedStyle(testIcon).fontFamily.includes('Awesome');
        document.body.removeChild(testIcon);
        
        if (faLoaded || faCheckCount >= 30) {
            clearInterval(faCheckInterval);
            initAnimations();
        }
    }
    
    // Start checking for Font Awesome
    faCheckInterval = setInterval(checkFontAwesomeLoaded, 100);
});

// 1. FIRST MAKE SURE GSAP IS LOADED
if (!window.gsap) {
    console.log('Loading GSAP...');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
    script.onload = initAboutAnimations;
    document.head.appendChild(script);
  } else {
    initAboutAnimations();
  }
  
  // 2. ANIMATION FUNCTION
  function initAboutAnimations() {
    // Wait a tiny bit to ensure everything is ready
    setTimeout(() => {
      console.log('Initializing animations...');
      
      // First register ScrollTrigger plugin
      if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
      }
  
      // ANIMATE THE SECTION TITLE
      gsap.from("#about h2", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
  
      // ANIMATE EACH CARD SEPARATELY (more reliable than stagger)
      document.querySelectorAll('.approach-card').forEach((card, index) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          delay: index * 0.15, // manual stagger
          scrollTrigger: {
            trigger: "#about",
            start: "top 70%",
            toggleActions: "play none none none"
          }
        });
      });
  
      console.log('Animations initialized!');
    }, 100);
  }


// Bulletproof Skills Section Animation
document.addEventListener('DOMContentLoaded', function() {
    // Wait until everything is fully loaded
    window.addEventListener('load', function() {
        // Check if skills section exists
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        // Load GSAP if not already loaded
        if (typeof gsap === 'undefined') {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js', initSkillsAnimations);
        } else if (typeof ScrollTrigger === 'undefined') {
            loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js', initSkillsAnimations);
        } else {
            initSkillsAnimations();
        }
    });

    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function initSkillsAnimations() {
        // Register ScrollTrigger plugin
        if (gsap.registerPlugin) {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Simple fade-in animation as fallback
        const skillItems = document.querySelectorAll('#skills .skill-item');
        if (skillItems.length === 0) return;

        // Make all skills visible initially (fallback)
        gsap.set(skillItems, { opacity: 1 });

        // Animate skills one by one with delay
        skillItems.forEach((item, index) => {
            gsap.from(item, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                    markers: false // Set to true to debug trigger positions
                }
            });
        });

        // Animate category titles
        gsap.from('#skills .category-title', {
            opacity: 0,
            x: -30,
            duration: 0.7,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#skills',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }
});

// Projects Section Animation - Bulletproof Version
function initProjectsAnimations() {
    // Check if projects section exists
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    // Make projects visible by default (fallback)
    const projectCards = document.querySelectorAll('.project-card');
    gsap.set(projectCards, { opacity: 1, y: 0 });

    // Simple stagger animation
    gsap.from(projectCards, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 70%',
            toggleActions: 'play none none none',
            markers: false // Set to true to debug trigger positions
        },
        ease: 'power2.out'
    });

    // Section header animation
    gsap.from('#projects .section-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#projects',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// Initialize when everything is ready
if (document.readyState === 'complete') {
    initProjectsAnimations();
} else {
    window.addEventListener('load', initProjectsAnimations);
}

// Experience Section Animation
function initExperienceAnimations() {
    const experienceSection = document.getElementById('experience');
    if (!experienceSection) return;

    // Set initial state (fallback)
    const timelineItems = document.querySelectorAll('.timeline-item');
    gsap.set(timelineItems, { opacity: 1, y: 0 });

    // Animate timeline items
    gsap.from(timelineItems, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%',
            toggleActions: 'play none none none',
            markers: false // Set to true to debug
        },
        ease: 'power2.out'
    });

    // Animate section header
    gsap.from('#experience .section-title', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
}

// Initialize when ready
if (document.readyState === 'complete') {
    initExperienceAnimations();
} else {
    window.addEventListener('load', initExperienceAnimations);
}

// Contact Section Animation
function initContactAnimations() {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    // Animate contact elements
    gsap.from('.contact-subtitle', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.7
    });

    gsap.from('.contact-text', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 65%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.7
    });

    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6
    });

    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 55%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5
    });

    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6
    });
}

// Form Submission Handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize when ready
if (document.readyState === 'complete') {
    initContactAnimations();
    setupContactForm();
} else {
    window.addEventListener('load', function() {
        initContactAnimations();
        setupContactForm();
    });
}


// Certificate Modal Functionality

// Download Resume Functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Method 1: Direct download link (recommended)
            const link = document.createElement('a');
            link.href = 'https://drive.google.com/uc?export=download&id=1I5H6giTYIgnhOe8KomdHOWQNmepX2CSw'; // Update with your actual file path
            link.download = 'Bhanu_Priya_Resume.pdf'; // Customize filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Method 2: Fallback using window.open()
            setTimeout(() => {
                if (!document.querySelector('a[href*=".pdf"]')) {
                    window.open('https://drive.google.com/uc?export=download&id=1I5H6giTYIgnhOe8KomdHOWQNmepX2CSw', '_blank');
                }
            }, 500);
        });
    }
});

// Dynamic Profile Animation
document.addEventListener('DOMContentLoaded', () => {
    // Particles animation
    gsap.to(".particle", {
      y: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.5,
        from: "random"
      },
      ease: "sine.inOut"
    });
  
    // 3D tilt effect
    const profile = document.querySelector('.dynamic-profile');
    if (profile) {
      profile.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        gsap.to(".main-photo", {
          duration: 0.5,
          rotationY: xAxis,
          rotationX: yAxis,
          ease: "power1.out"
        });
      });
  
      profile.addEventListener('mouseleave', () => {
        gsap.to(".main-photo", {
          duration: 1,
          rotationY: 0,
          rotationX: 0,
          ease: "elastic.out(1, 0.5)"
        });
      });
    }
  });


// Certificate/Achievement Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    const closeModal = document.querySelector('.close-modal');
    
    // Function to open modal
    function openModal(imageSrc) {
        if (!modal || !modalImg) return;
        
        // Preload image to get dimensions
        const img = new Image();
        img.src = imageSrc;
        img.onload = function() {
            modalImg.src = imageSrc;
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            
            // Center modal content
            centerModal();
        };
    }
    
    // Function to close modal
    function closeModalFunc() {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    
    // Center modal content
    function centerModal() {
        const modalContent = document.querySelector('.modal-content');
        if (!modalContent) return;
        
        const windowHeight = window.innerHeight;
        const imgHeight = modalImg.offsetHeight;
        
        if (imgHeight > windowHeight * 0.9) {
            modalContent.style.top = '50%';
            modalContent.style.transform = 'translateY(-50%)';
        } else {
            modalContent.style.top = '50%';
            modalContent.style.transform = 'translateY(-50%)';
        }
    }
    
    // Set up event listeners for all view buttons
    document.querySelectorAll('.view-certificate, .view-achievement').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-image');
            if (imageSrc) {
                openModal(imageSrc);
            }
        });
    });
    
    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && modal && modal.style.display === "block") {
            closeModalFunc();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (modal && modal.style.display === "block") {
            centerModal();
        }
    });
});
