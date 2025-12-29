// Initialize animations when document is ready
document.addEventListener('DOMContentLoaded', function() {
  // #region agent log helper
  const sendLog = (hypothesisId, message, data, location) => {
    fetch('http://127.0.0.1:7242/ingest/ed1d6d4d-57e9-4547-adbd-eed04bbe61ff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'run1',
        hypothesisId,
        location,
        message,
        data,
        timestamp: Date.now()
      })
    }).catch(() => {});
  };
  // #endregion
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Smooth page load animation
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });
  
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('active') && 
          !mainNav.contains(e.target) && 
          !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  }
  
  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
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
  });
  
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
  
  // Parallax effect on mouse move + Interactive background
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    // Update CSS variables for background
    document.body.style.setProperty('--mouse-x', `${e.clientX / window.innerWidth * 100}%`);
    document.body.style.setProperty('--mouse-y', `${e.clientY / window.innerHeight * 100}%`);
    
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
  
  // Removed problematic scroll animation that caused issues
  
  // Scroll animations for About section - removed opacity to fix visibility
  
  // Animate skills lists on hover
  const skillItems = document.querySelectorAll('.skill-list li');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        x: 8,
        color: '#00d4ff',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        x: 0,
        color: 'rgba(255, 255, 255, 0.65)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
  
  // About cards animation - removed to fix visibility issues
  
  // Removed glow animations
  
  // Tech Stack Animations - removed opacity animations to fix visibility
  
  // Removed complex tech item animations to prevent issues
  
  // Subtle parallax for shapes without breaking layout
  gsap.to('.shape1, .shape2, .shape3', {
    scrollTrigger: {
      trigger: '.portfolio-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2
    },
    y: 100,
    ease: 'none'
  });
  
  // Project card video play on hover
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const video = item.querySelector('video');
      if (video) {
        video.play();
      }
    });
  });
  
  // Smooth scroll reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.bento-item, .project-item, .freelance-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // 3D TILT EFFECT for bento items
  const bentoItemsForTilt = document.querySelectorAll('.bento-item');
  bentoItemsForTilt.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(item, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  });
  
  // MAGNETIC CURSOR EFFECT for CTA button
  const ctaBtn = document.querySelector('.cta-button');
  if (ctaBtn) {
    ctaBtn.addEventListener('mousemove', (e) => {
      const rect = ctaBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(ctaBtn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    ctaBtn.addEventListener('mouseleave', () => {
      gsap.to(ctaBtn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }
  
  // UNEXPECTED: Random glitch effect on scroll
  let glitchInterval;
  window.addEventListener('scroll', () => {
    if (Math.random() > 0.98) { // 2% chance on each scroll
      const title = document.querySelector('.section-title');
      if (title) {
        title.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
          title.style.transform = 'translateX(-50%)';
        }, 50);
      }
    }
  });
  
  // UNEXPECTED: Bento items rotate slightly on hover of ANY bento item
  const bentoItems = document.querySelectorAll('.bento-item');
  bentoItems.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      bentoItems.forEach((otherItem, otherIndex) => {
        if (otherIndex !== index) {
          gsap.to(otherItem, {
            rotation: (Math.random() - 0.5) * 2,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    });
    
    item.addEventListener('mouseleave', () => {
      bentoItems.forEach((otherItem) => {
        gsap.to(otherItem, {
          rotation: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  });
  
  // Subtle mouse parallax for hero title
  window.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
    
    gsap.to('.line1', {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: 'power2.out'
    });
    
    gsap.to('.line2', {
      x: -moveX * 0.5,
      y: -moveY * 0.5,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // Ensure nav links are visible
  gsap.set('.nav-link', {
    opacity: 1,
    clearProps: 'all'
  });
  
  // UNEXPECTED: Purple cursor trail effect - contained to viewport
  const cursorTrail = [];
  const trailLength = 8;
  
  // Create trail container
  const trailContainer = document.createElement('div');
  trailContainer.id = 'cursor-trail-container';
  trailContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  `;
  document.body.appendChild(trailContainer);
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position: absolute;
      width: ${12 - i}px;
      height: ${12 - i}px;
      background: radial-gradient(circle, var(--accent-color), transparent);
      border-radius: 50%;
      pointer-events: none;
      opacity: ${1 - i * 0.15};
      transition: transform 0.1s ease-out;
    `;
    trailContainer.appendChild(dot);
    cursorTrail.push(dot);
  }
  
  let mouseX = 0, mouseY = 0;
  let trailX = [], trailY = [];
  
  for (let i = 0; i < trailLength; i++) {
    trailX[i] = 0;
    trailY[i] = 0;
  }
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateTrail() {
    trailX[0] = mouseX;
    trailY[0] = mouseY;
    
    for (let i = 0; i < trailLength; i++) {
      if (i > 0) {
        trailX[i] += (trailX[i - 1] - trailX[i]) * 0.3;
        trailY[i] += (trailY[i - 1] - trailY[i]) * 0.3;
      }
      
      cursorTrail[i].style.transform = `translate(${trailX[i] - 6}px, ${trailY[i] - 6}px)`;
    }
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
  
  // UNEXPECTED: Tech items RUN AWAY from cursor!
  const techMarquee = document.querySelector('.tech-marquee-wrapper');
  const techItems = document.querySelectorAll('.tech-item');
  
  if (techMarquee) {
    techMarquee.addEventListener('mousemove', (e) => {
      const rect = techMarquee.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      techItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const itemCenterY = itemRect.top + itemRect.height / 2;
        
        const distanceX = mouseX - itemCenterX;
        const distanceY = mouseY - itemCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // If cursor is within 150px, item runs away!
        if (distance < 150) {
          item.classList.add('flee');
        } else {
          item.classList.remove('flee');
        }
      });
    });
    
    techMarquee.addEventListener('mouseleave', () => {
      techItems.forEach(item => {
        item.classList.remove('flee');
      });
    });
    
    // UNEXPECTED: Click to EXPLODE tech items!
    techItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create explosion particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 8px;
            height: 8px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
          `;
          document.body.appendChild(particle);
          
          const angle = (Math.PI * 2 * i) / 20;
          const velocity = 100 + Math.random() * 100;
          
          gsap.to(particle, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            scale: 0,
            duration: 1 + Math.random(),
            ease: 'power2.out',
            onComplete: () => particle.remove()
          });
        }
        
        // Shake the item
        gsap.to(item, {
          scale: 1.3,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        });
        
        // Flash the screen
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--accent-color);
          opacity: 0.3;
          pointer-events: none;
          z-index: 9998;
        `;
        document.body.appendChild(flash);
        gsap.to(flash, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => flash.remove()
        });
      });
    });
  }
  
  // ScrollTrigger for About Hero Text
  gsap.from('.about-big-text', {
    scrollTrigger: {
      trigger: '.about-big-text',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
    },
    opacity: 0,
    y: 100,
    scale: 0.9,
    ease: 'power2.out'
  });
  
  // UNEXPECTED: Parallax scroll on bento items
  gsap.utils.toArray('.bento-item').forEach((item, index) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: index % 2 === 0 ? -50 : 50,
      ease: 'none'
    });
  });
  
  // Random color shift on sections - DISABLED to prevent white screen issues
  // Sections now maintain their dark backgrounds consistently
  
  // UNEXPECTED: Text scramble effect on hover
  const scrambleText = (element) => {
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
      element.textContent = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 30);
  };
  
  document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
      scrambleText(title);
    });
  });
  
  // UNEXPECTED: Shake effect on CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every interval
        gsap.to(ctaButton, {
          x: Math.random() * 10 - 5,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: 'power1.inOut',
          onComplete: () => {
            gsap.to(ctaButton, { x: 0, duration: 0.3 });
          }
        });
      }
    }, 2000);
  }
  
  // Double-click feature removed
  
  // Konami code feature removed
  
  // ZOMBIE EXPERIENCE - Press SPACE (Toggle)
  let zombieMode = false;
  let spaceMode = false;
  let jungleMode = false;
  
  // Function to disable all modes
  function disableAllModes() {
    // Disable zombie mode
    if (zombieMode) {
      zombieMode = false;
      document.body.style.filter = 'none';
      const zombieIndicator = document.getElementById('zombie-indicator');
      if (zombieIndicator) zombieIndicator.remove();
      const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button');
      allElements.forEach(el => {
        gsap.to(el, { rotation: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' });
      });
    }
    
    // Disable space mode
    if (spaceMode) {
      spaceMode = false;
      document.body.style.background = '';
      const spaceIndicator = document.getElementById('space-indicator');
      if (spaceIndicator) spaceIndicator.remove();
      const starsContainer = document.getElementById('space-stars-container');
      if (starsContainer) starsContainer.remove();
      gsap.killTweensOf('.bento-item, .project-item, .tech-item, .cta-button, .hero-title, .section-title');
      const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button, .hero-title, .section-title');
      allElements.forEach(el => {
        gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: 'power2.out' });
      });
    }
    
    // Disable jungle mode
    if (jungleMode) {
      jungleMode = false;
      document.body.style.filter = 'none';
      const jungleIndicator = document.getElementById('jungle-indicator');
      if (jungleIndicator) jungleIndicator.remove();
      const snakeContainer = document.getElementById('jungle-snake-container');
      if (snakeContainer) snakeContainer.remove();
    }
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat && !e.ctrlKey && !e.metaKey) {
      // Prevent default scroll behavior
      e.preventDefault();
      
      // Disable other modes first
      if (spaceMode || jungleMode) {
        disableAllModes();
      }
      
      zombieMode = !zombieMode;
      sendLog('H1', 'Zombie toggle', { zombieMode }, 'script.js:ZOMBIE');
      
      if (zombieMode) {
        // Activate zombie mode
        document.body.style.filter = 'saturate(0.3) hue-rotate(90deg) contrast(1.2)';
        document.body.style.transition = 'filter 1s ease';
        sendLog('H1', 'Zombie activated', { filter: document.body.style.filter }, 'script.js:ZOMBIE');
        
        const zombieText = document.createElement('div');
        zombieText.textContent = '🧟 ZOMBIE APOCALYPSE 🧟';
        zombieText.style.cssText = `
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 100, 0, 0.9);
          color: #00ff00;
          padding: 1rem 2rem;
          border-radius: 10px;
          font-size: 1.5rem;
          font-weight: bold;
          z-index: 10000;
          pointer-events: none;
          text-shadow: 0 0 10px #00ff00;
          max-width: 90vw;
          text-align: center;
        `;
        document.body.appendChild(zombieText);
        zombieText.id = 'zombie-indicator';
        
        setTimeout(() => {
          zombieText.textContent += ' (Press SPACE to exit)';
        }, 1000);
        
        // Make elements look decayed
        const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button');
        allElements.forEach(el => {
          gsap.to(el, {
            rotation: Math.random() * 10 - 5,
            scale: 0.95,
            opacity: 0.7,
            duration: 1,
            ease: 'power2.out'
          });
        });
      } else {
        // Deactivate zombie mode
        document.body.style.filter = 'none';
        sendLog('H1', 'Zombie deactivated', { filter: document.body.style.filter }, 'script.js:ZOMBIE');
        
        const indicator = document.getElementById('zombie-indicator');
        if (indicator) indicator.remove();
        
        // Restore elements
        const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button');
        allElements.forEach(el => {
          gsap.to(el, {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      }
    }
  });
  
  // SPACE EXPERIENCE - Press 'E'
  let originalBodyBg = '';
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && !spaceMode && !e.repeat && !e.ctrlKey && !e.metaKey) {
      // Disable other modes first
      if (zombieMode || jungleMode) {
        disableAllModes();
      }
      
      spaceMode = true;
      
      // Save original background
      originalBodyBg = document.body.style.background || '';
      sendLog('H2', 'Space activate save background', { originalBodyBg }, 'script.js:SPACE');
      
      // Space environment
      document.body.style.background = 'radial-gradient(circle, #000033, #000000)';
      document.body.style.transition = 'background 2s ease';
      
      const spaceText = document.createElement('div');
      spaceText.textContent = '🚀 SPACE MODE 🌌';
      spaceText.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 50, 0.9);
        color: #00ffff;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        pointer-events: none;
        text-shadow: 0 0 20px #00ffff;
        border: 2px solid #00ffff;
        max-width: 90vw;
        text-align: center;
      `;
      document.body.appendChild(spaceText);
      spaceText.id = 'space-indicator';
      
      // Create stars container
      const starsContainer = document.createElement('div');
      starsContainer.id = 'space-stars-container';
      starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
      `;
      document.body.appendChild(starsContainer);
      
      // Create stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        star.style.cssText = `
          position: absolute;
          width: ${Math.random() * 3}px;
          height: ${Math.random() * 3}px;
          background: white;
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          box-shadow: 0 0 ${Math.random() * 10}px white;
        `;
        starsContainer.appendChild(star);
        
        gsap.to(star, {
          opacity: Math.random(),
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true
        });
      }
      
      // Make everything float like in space
      const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button, .hero-title, .section-title');
      allElements.forEach((el, index) => {
        gsap.to(el, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 50 - 25}`,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.1
        });
      });
      
      setTimeout(() => {
        spaceText.textContent += ' (Press E to exit)';
      }, 1000);
    } else if (e.key.toLowerCase() === 'e' && spaceMode && !e.repeat) {
      spaceMode = false;
      
      // Restore original background
      document.body.style.background = originalBodyBg;
      sendLog('H2', 'Space deactivate restore background', { originalBodyBg, currentBg: document.body.style.background }, 'script.js:SPACE');
      
      const indicator = document.getElementById('space-indicator');
      if (indicator) indicator.remove();
      
      // Remove stars container
      const starsContainer = document.getElementById('space-stars-container');
      if (starsContainer) starsContainer.remove();
      
      // Kill all floating animations
      gsap.killTweensOf('.bento-item, .project-item, .tech-item, .cta-button, .hero-title, .section-title');
      
      // Reset positions
      const allElements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .cta-button, .hero-title, .section-title');
      allElements.forEach(el => {
        gsap.to(el, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: 'power2.out'
        });
      });
    }
  });
  
  // JUNGLE EXPERIENCE - Press 'J'
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'j' && !jungleMode && !e.repeat && !e.ctrlKey && !e.metaKey) {
      // Disable other modes first
      if (zombieMode || spaceMode) {
        disableAllModes();
      }
      
      jungleMode = true;
      
      // Jungle environment
      document.body.style.filter = 'hue-rotate(90deg) saturate(1.5) brightness(0.8)';
      document.body.style.transition = 'filter 1s ease';
      sendLog('H3', 'Jungle activated', { filter: document.body.style.filter }, 'script.js:JUNGLE');
      
      const jungleText = document.createElement('div');
      jungleText.textContent = '🐍 JUNGLE MODE 🌿';
      jungleText.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 100, 0, 0.9);
        color: #ffff00;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10000;
        pointer-events: none;
        text-shadow: 0 0 10px #ffff00;
        border: 2px solid #00ff00;
        max-width: 90vw;
        text-align: center;
      `;
      document.body.appendChild(jungleText);
      jungleText.id = 'jungle-indicator';
      
      // Spawn MULTIPLE snakes frequently
      const spawnSnake = () => {
        if (!jungleMode) return;
        
        // Spawn 2-3 snakes at once
        const snakeCount = 2 + Math.floor(Math.random() * 2);
        sendLog('H3', 'Snakes spawn batch', { snakeCount }, 'script.js:JUNGLE');
        
        for (let i = 0; i < snakeCount; i++) {
          const elements = document.querySelectorAll('.bento-item, .project-item, .tech-item, .hero-title, .section-title, .cta-button');
          const randomEl = elements[Math.floor(Math.random() * elements.length)];
          
          if (randomEl) {
            const rect = randomEl.getBoundingClientRect();
            
            // Random snake type
            const snakeTypes = ['🐍', '🐉', '🦎', '🐊'];
            const snakeEmoji = snakeTypes[Math.floor(Math.random() * snakeTypes.length)];
            
            // Create snake container if it doesn't exist
            let snakeContainer = document.getElementById('jungle-snake-container');
            if (!snakeContainer) {
              snakeContainer = document.createElement('div');
              snakeContainer.id = 'jungle-snake-container';
              snakeContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: 10001;
                overflow: hidden;
              `;
              document.body.appendChild(snakeContainer);
            }
            
            const snake = document.createElement('div');
            snake.textContent = snakeEmoji;
            snake.className = 'jungle-snake';
            snake.style.cssText = `
              position: absolute;
              left: ${rect.left + rect.width / 2}px;
              top: ${rect.top + rect.height / 2}px;
              font-size: ${4 + Math.random() * 2}rem;
              pointer-events: none;
              filter: drop-shadow(0 0 20px #00ff00) drop-shadow(0 0 40px #00ff00);
            `;
            snakeContainer.appendChild(snake);
            
            // Snake appears with explosion effect
            gsap.fromTo(snake, 
              { scale: 0, rotation: -180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'back.out(3)'
              }
            );
            
            // Snake slithers across screen
            const angle = Math.random() * Math.PI * 2;
            const distance = 400 + Math.random() * 300;
            
            gsap.to(snake, {
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              rotation: angle * (180 / Math.PI) + Math.random() * 180,
              duration: 1.5 + Math.random(),
              ease: 'power1.inOut',
              onUpdate: function() {
                // Wiggle effect
                snake.style.transform += ` rotate(${Math.sin(this.progress() * 20) * 10}deg)`;
              },
              onComplete: () => {
                gsap.to(snake, {
                  scale: 0,
                  opacity: 0,
                  duration: 0.3,
                  onComplete: () => snake.remove()
                });
              }
            });
            
            // VIOLENT shake the element
            gsap.to(randomEl, {
              x: Math.random() * 30 - 15,
              y: Math.random() * 30 - 15,
              rotation: Math.random() * 20 - 10,
              duration: 0.05,
              repeat: 15,
              yoyo: true,
              ease: 'power1.inOut',
              onComplete: () => {
                gsap.to(randomEl, { 
                  x: 0, 
                  y: 0, 
                  rotation: 0,
                  duration: 0.5,
                  ease: 'elastic.out(1, 0.3)'
                });
              }
            });
          }
        }
        
        if (jungleMode) {
          // Spawn more frequently
          setTimeout(spawnSnake, 800 + Math.random() * 1200);
        }
      };
      
      // Start spawning immediately
      spawnSnake();
      setTimeout(spawnSnake, 400);
      setTimeout(spawnSnake, 800);
      
      setTimeout(() => {
        jungleText.textContent += ' (Press J to exit)';
      }, 1000);
    } else if (e.key.toLowerCase() === 'j' && jungleMode && !e.repeat) {
      jungleMode = false;
      
      document.body.style.filter = 'none';
      sendLog('H3', 'Jungle deactivated', { filter: document.body.style.filter }, 'script.js:JUNGLE');
      
      const indicator = document.getElementById('jungle-indicator');
      if (indicator) indicator.remove();
      
      // Remove snake container
      const snakeContainer = document.getElementById('jungle-snake-container');
      if (snakeContainer) snakeContainer.remove();
    }
  });
  
  // Right-click orbs feature removed
  
  // UNEXPECTED: Mouse wheel to change background intensity
  let bgIntensity = 0.3;
  document.addEventListener('wheel', (e) => {
    if (e.deltaY > 0) {
      bgIntensity = Math.min(1, bgIntensity + 0.05);
    } else {
      bgIntensity = Math.max(0.1, bgIntensity - 0.05);
    }
    
    document.body.style.setProperty('--bg-intensity', bgIntensity);
  }, { passive: true });
  
  // Hide hint after 10 seconds
  setTimeout(() => {
    const hint = document.querySelector('.floating-hint');
    if (hint) {
      gsap.to(hint, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power2.in',
        onComplete: () => hint.remove()
      });
    }
  }, 10000);
});
