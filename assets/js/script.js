// Initialize animations when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 50
          },
          ease: "power3.inOut"
        });
      }
    });
  });
  
  // Create a main timeline for the intro animations
  const mainTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  // Animate the header elements
  mainTl.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 1.2
  })
  .from('.nav-link', {
    y: -30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8
  }, '-=0.8');
  
  // Animate the main title with staggered appearance
  mainTl.from('.line1', {
    x: -100,
    opacity: 0,
    duration: 1
  }, '-=0.4')
  .from('.line2', {
    x: 100,
    opacity: 0,
    duration: 1
  }, '-=0.7')
  .from('.hero-subtitle', {
    y: 20,
    opacity: 0,
    duration: 0.8
  }, '-=0.7')
  .from('.author', {
    opacity: 0,
    y: 20,
    duration: 0.8
  }, '-=0.6')
  .from('.cta-button', {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  }, '-=0.6')
  .from('.social-link', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5
  }, '-=0.8')
  .from('.scroll-indicator', {
    opacity: 0,
    y: 20,
    duration: 0.5
  }, '-=0.5');
  
  // Create a separate timeline for the animated shapes
  gsap.from('.shape', {
    scale: 0,
    opacity: 0,
    stagger: 0.2,
    duration: 1.5,
    ease: 'power2.out'
  });
  
  // Text hover effect
  const heroTitle = document.querySelectorAll('.hero-title span');
  heroTitle.forEach(element => {
    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // Parallax effect on mouse move
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    gsap.to('.line1', {
      x: mouseX * 20,
      y: mouseY * 10,
      duration: 1
    });
    
    gsap.to('.line2', {
      x: mouseX * -20,
      y: mouseY * -10,
      duration: 1
    });
    
    gsap.to('.shape', {
      x: mouseX * 30,
      y: mouseY * 30,
      duration: 2,
      ease: 'power1.out',
      stagger: 0.1
    });
  });
  
  // Scroll animations with ScrollTrigger
  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.portfolio-hero',
      start: 'top top',
      end: '+=500',
      scrub: 1
    },
    y: -70,
    opacity: 0.5
  });
  
  // Scroll animations for About section
  gsap.from(".about-card", {
    scrollTrigger: {
      trigger: ".about-card",
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out"
  });
  
  // Animate skills lists on hover
  const skillItems = document.querySelectorAll('.skill-list li');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 5,
        color: '#ffffff',
        duration: 0.3
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        color: 'rgba(255, 255, 255, 0.6)',
        duration: 0.3
      });
    });
  });
  
  // Subtle animation for the CTA button
  const pulseAnimation = gsap.timeline({ repeat: -1, yoyo: true });
  pulseAnimation.to('.cta-button', {
    boxShadow: '0 15px 30px rgba(110, 65, 255, 0.6)',
    duration: 2,
    ease: 'sine.inOut'
  });
});
