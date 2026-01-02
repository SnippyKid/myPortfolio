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
  
  // Smooth scroll with CSS
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Smooth page load animation
  gsap.from('body', {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });
  
  // Add smooth class to html for better scrolling
  document.documentElement.classList.add('smooth-scroll');
  
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
  
  // Smooth scrolling with GSAP
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: targetElement,
            offsetY: 80
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
  
  // VOLCANO, SPACE, JUNGLE EXPERIENCES
  let volcanoMode = false;
  let spaceMode = false;
  let jungleMode = false;
  
  // Debug logging
  console.log('🎮 Mode system initialized');
  
  // Function to disable all modes
  function disableAllModes() {
    // Reset subtitle text to original
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && heroSubtitle.dataset.originalText) {
      heroSubtitle.textContent = heroSubtitle.dataset.originalText;
    }
    
    // Disable volcano mode
    if (volcanoMode) {
      volcanoMode = false;
      deactivateVolcanoInteractions();
      document.body.classList.remove('volcano-theme');
      const videoOverlay = document.getElementById('volcano-video-overlay');
      if (videoOverlay) videoOverlay.remove();
      const indicator = document.getElementById('volcano-indicator');
      if (indicator) indicator.remove();
    }
    
    // Disable space mode
    if (spaceMode) {
      spaceMode = false;
      deactivateSpaceInteractions();
      document.body.classList.remove('space-theme');
      const videoOverlay = document.getElementById('space-video-overlay');
      if (videoOverlay) videoOverlay.remove();
      const indicator = document.getElementById('space-indicator');
      if (indicator) indicator.remove();
      const starsContainer = document.getElementById('space-stars-container');
      if (starsContainer) starsContainer.remove();
    }
    
    // Disable jungle mode
    if (jungleMode) {
      jungleMode = false;
      deactivateJungleInteractions();
      document.body.classList.remove('jungle-theme');
      const videoOverlay = document.getElementById('jungle-video-overlay');
      if (videoOverlay) videoOverlay.remove();
      const indicator = document.getElementById('jungle-indicator');
      if (indicator) indicator.remove();
    }
  }
  
  // VOLCANO MODE INTERACTIONS
  let volcanoScrollListener = null;
  let volcanoHoverListener = null;
  
  function activateVolcanoInteractions() {
    // Screen shake on scroll
    volcanoScrollListener = () => {
      document.body.classList.add('scrolling');
      setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 300);
    };
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(volcanoScrollListener, 50);
    }, { passive: true });
    
    // Heat-based cursor effect
    volcanoHoverListener = (e) => {
      const heatRipple = document.createElement('div');
      heatRipple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(255, 69, 0, 0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(heatRipple);
      
      gsap.to(heatRipple, {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => heatRipple.remove()
      });
    };
    
    document.addEventListener('click', volcanoHoverListener);
  }
  
  function deactivateVolcanoInteractions() {
    if (volcanoHoverListener) {
      document.removeEventListener('click', volcanoHoverListener);
      volcanoHoverListener = null;
    }
  }
  
  // VOLCANO EXPERIENCE - Press SPACE (Toggle)
  document.addEventListener('keydown', (e) => {
    // Check if not in input field
    const isInInput = e.target.tagName === 'INPUT' || 
                      e.target.tagName === 'TEXTAREA' || 
                      e.target.isContentEditable;
    
    if (e.code === 'Space' && !e.repeat && !e.ctrlKey && !e.metaKey && !isInInput) {
      // Prevent default scroll behavior
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🌋 SPACE pressed, current volcanoMode:', volcanoMode);
      
      // Disable other modes first
      if (spaceMode || jungleMode) {
        disableAllModes();
      }
      
      volcanoMode = !volcanoMode;
      console.log('🌋 Volcano mode toggled to:', volcanoMode);
      sendLog('H1', 'Volcano toggle', { volcanoMode }, 'script.js:VOLCANO');
      
      if (volcanoMode) {
        // Activate volcano mode with video
        sendLog('H1', 'Volcano activated', {}, 'script.js:VOLCANO');
        
        // Activate volcano interactions
        activateVolcanoInteractions();
        
        // Smooth transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(255, 69, 0, 0.3), rgba(139, 0, 0, 0.5));
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
        `;
        document.body.appendChild(transitionOverlay);
        
        gsap.to(transitionOverlay, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            // Add volcano theme class to body
            document.body.classList.add('volcano-theme');
            
            // Change subtitle text
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
              if (!heroSubtitle.dataset.originalText) {
                heroSubtitle.dataset.originalText = heroSubtitle.textContent;
              }
              heroSubtitle.textContent = 'Eruption Engineer of Pixels & Code | Freelancer';
            }
            
            gsap.to(transitionOverlay, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.2,
              onComplete: () => transitionOverlay.remove()
            });
          }
        });
        
        // Create video overlay
        const videoOverlay = document.createElement('div');
        videoOverlay.id = 'volcano-video-overlay';
        videoOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        const video = document.createElement('video');
        video.src = './assets/videos/STUNNING Drone Video of ICELAND VOLCANO Eruption 4K DJI FPV - Joey Helms (1080p, h264).mp4';
        video.currentTime = 5; // Start at 5 seconds
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.7) contrast(1.4) saturate(1.8) hue-rotate(-10deg);
        `;
        
        videoOverlay.appendChild(video);
        document.body.appendChild(videoOverlay);
        
        // Create heat distortion effect
        const heatOverlay = document.createElement('div');
        heatOverlay.className = 'heat-distortion';
        heatOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(circle at 50% 100%, rgba(255, 69, 0, 0.3), transparent 60%);
          animation: heat-wave 3s ease-in-out infinite;
        `;
        videoOverlay.appendChild(heatOverlay);
        
        // Fade in smoothly
        setTimeout(() => {
          videoOverlay.style.opacity = '1';
        }, 500);
        
        // Create compact indicator
        const indicator = document.createElement('div');
        indicator.id = 'volcano-indicator';
        indicator.innerHTML = `
          <div class="mode-badge volcano-badge">
            <div class="mode-icon">🔥</div>
            <div class="mode-text">VOLCANO</div>
          </div>
        `;
        indicator.style.cssText = `
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 10000;
          pointer-events: none;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s ease;
        `;
        document.body.appendChild(indicator);
        
        setTimeout(() => {
          indicator.style.opacity = '1';
          indicator.style.transform = 'translateY(0)';
        }, 100);
        
        // Show keyboard shortcut
        showKeyboardShortcut('SPACE', '🌋 VOLCANO MODE');
      } else {
        // Deactivate volcano mode
        sendLog('H1', 'Volcano deactivated', {}, 'script.js:VOLCANO');
        
        // Smooth transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(10, 10, 15, 0.8), rgba(0, 0, 0, 0.9));
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
        `;
        document.body.appendChild(transitionOverlay);
        
        gsap.to(transitionOverlay, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            // Deactivate volcano interactions
            deactivateVolcanoInteractions();
            
            // Remove volcano theme class
            document.body.classList.remove('volcano-theme');
            
            const videoOverlay = document.getElementById('volcano-video-overlay');
            if (videoOverlay) videoOverlay.remove();
            
            gsap.to(transitionOverlay, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay: 0.2,
              onComplete: () => transitionOverlay.remove()
            });
          }
        });
        
        const indicator = document.getElementById('volcano-indicator');
        if (indicator) {
          indicator.style.opacity = '0';
          indicator.style.transform = 'translateY(20px)';
          setTimeout(() => indicator.remove(), 400);
        }
      }
    }
  });
  
  // SPACE MODE INTERACTIONS
  let spaceHoverListener = null;
  let spaceScrollModifier = null;
  let spaceFloatInterval = null;
  
  function activateSpaceInteractions() {
    // Subtle zero-gravity float effect on cards only
    const floatElements = document.querySelectorAll('.bento-item, .project-card');
    floatElements.forEach((el, index) => {
      gsap.to(el, {
        y: '+=8',
        duration: 4 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.3
      });
    });
    
    // Subtle parallax on mouse move
    spaceHoverListener = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      
      document.querySelectorAll('.bento-item, .project-card').forEach((el, index) => {
        const depth = (index % 3 + 1) * 0.3;
        gsap.to(el, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 1.2,
          ease: 'power1.out'
        });
      });
    };
    
    document.addEventListener('mousemove', spaceHoverListener);
  }
  
  function deactivateSpaceInteractions() {
    if (spaceHoverListener) {
      document.removeEventListener('mousemove', spaceHoverListener);
      spaceHoverListener = null;
    }
    if (spaceFloatInterval) {
      clearInterval(spaceFloatInterval);
      spaceFloatInterval = null;
    }
    
    // Kill all floating animations
    gsap.killTweensOf('.bento-item, .project-card, .hero-title, .section-title, .tech-item');
    
    // Reset all element positions
    const elements = document.querySelectorAll('.bento-item, .project-card, .tech-item, .hero-title, .section-title');
    elements.forEach(el => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5 });
    });
  }
  
  // SPACE EXPERIENCE - Press 'E'
  document.addEventListener('keydown', (e) => {
    const isInInput = e.target.tagName === 'INPUT' || 
                      e.target.tagName === 'TEXTAREA' || 
                      e.target.isContentEditable;
    
    if (e.key.toLowerCase() === 'e' && !spaceMode && !e.repeat && !e.ctrlKey && !e.metaKey && !isInInput) {
      console.log('🚀 E pressed, current spaceMode:', spaceMode);
      
      // Disable other modes first
      if (volcanoMode || jungleMode) {
        disableAllModes();
      }
      
      spaceMode = true;
      console.log('🚀 Space mode activated:', spaceMode);
      sendLog('H2', 'Space activated', {}, 'script.js:SPACE');
      
      // Activate space interactions
      activateSpaceInteractions();
      
      // Smooth transition overlay
      const transitionOverlay = document.createElement('div');
      transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(0, 255, 255, 0.2), rgba(0, 0, 50, 0.5));
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
      `;
      document.body.appendChild(transitionOverlay);
      
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          // Add space theme class to body
          document.body.classList.add('space-theme');
          
          // Change subtitle text
          const heroSubtitle = document.querySelector('.hero-subtitle');
          if (heroSubtitle) {
            if (!heroSubtitle.dataset.originalText) {
              heroSubtitle.dataset.originalText = heroSubtitle.textContent;
            }
            heroSubtitle.textContent = 'Stellar Alchemist of Experiences | Freelancer';
          }
          
          gsap.to(transitionOverlay, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => transitionOverlay.remove()
          });
        }
      });
      
      // Create video overlay
      const videoOverlay = document.createElement('div');
      videoOverlay.id = 'space-video-overlay';
      videoOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
        transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      const video = document.createElement('video');
      video.src = './assets/videos/Serenity - A Space Cinematic Film - SpaceCinema (1080p, h264) (1).mp4';
      video.currentTime = 5; // Start at 5 seconds
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.6) contrast(1.3) saturate(1.2);
      `;
      
      videoOverlay.appendChild(video);
      document.body.appendChild(videoOverlay);
      
      // Create nebula overlay
      const nebula = document.createElement('div');
      nebula.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        background: radial-gradient(circle at 30% 40%, rgba(138, 43, 226, 0.2), transparent 50%),
                    radial-gradient(circle at 70% 60%, rgba(0, 191, 255, 0.15), transparent 50%);
        animation: nebula-drift 20s ease-in-out infinite;
      `;
      videoOverlay.appendChild(nebula);
      
      // Fade in smoothly
      setTimeout(() => {
        videoOverlay.style.opacity = '1';
      }, 500);
      
      // Create stars container for extra effect
      const starsContainer = document.createElement('div');
      starsContainer.id = 'space-stars-container';
      starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        pointer-events: none;
        z-index: 2;
        overflow: hidden;
      `;
      document.body.appendChild(starsContainer);
      
      // Create shooting stars and twinkling stars
      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        star.className = 'space-star';
        const size = Math.random() * 3;
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: white;
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          box-shadow: 0 0 ${8 + Math.random() * 15}px rgba(255, 255, 255, 0.9);
        `;
        starsContainer.appendChild(star);
        
        gsap.to(star, {
          opacity: 0.2 + Math.random() * 0.8,
          scale: 0.5 + Math.random() * 1.5,
          duration: 0.8 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      
      // Create compact indicator
      const indicator = document.createElement('div');
      indicator.id = 'space-indicator';
      indicator.innerHTML = `
        <div class="mode-badge space-badge">
          <div class="mode-icon">🌌</div>
          <div class="mode-text">SPACE</div>
        </div>
      `;
      indicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
      `;
      document.body.appendChild(indicator);
      
      setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
      }, 100);
    } else if (e.key.toLowerCase() === 'e' && spaceMode && !e.repeat && !isInInput) {
      spaceMode = false;
      sendLog('H2', 'Space deactivated', {}, 'script.js:SPACE');
      
      // Smooth transition overlay
      const transitionOverlay = document.createElement('div');
      transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(10, 10, 15, 0.8), rgba(0, 0, 0, 0.9));
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
      `;
      document.body.appendChild(transitionOverlay);
      
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          // Deactivate space interactions
          deactivateSpaceInteractions();
          
          // Remove space theme class
          document.body.classList.remove('space-theme');
          
          const videoOverlay = document.getElementById('space-video-overlay');
          if (videoOverlay) videoOverlay.remove();
          
          const starsContainer = document.getElementById('space-stars-container');
          if (starsContainer) starsContainer.remove();
          
          gsap.to(transitionOverlay, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => transitionOverlay.remove()
          });
        }
      });
      
      const indicator = document.getElementById('space-indicator');
      if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(20px)';
        setTimeout(() => indicator.remove(), 400);
      }
    }
  });
  
  // JUNGLE MODE INTERACTIONS
  let jungleHoverListener = null;
  let jungleSwayInterval = null;
  let jungleLeafInterval = null;
  let jungleScrollListener = null;
  
  function activateJungleInteractions() {
    // Subtle breathing effect on cards only
    const elements = document.querySelectorAll('.bento-item, .project-card');
    elements.forEach((el, index) => {
      gsap.to(el, {
        scale: 1.01,
        duration: 3 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.2
      });
    });
    
    // Subtle wind-driven parallax
    jungleHoverListener = (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.008;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.008;
      
      document.querySelectorAll('.bento-item, .project-card').forEach((el, index) => {
        const depth = (index % 3 + 1) * 0.4;
        gsap.to(el, {
          x: moveX * depth,
          y: moveY * depth,
          duration: 1,
          ease: 'power1.out'
        });
      });
    };
    
    document.addEventListener('mousemove', jungleHoverListener);
  }
  
  function deactivateJungleInteractions() {
    if (jungleHoverListener) {
      document.removeEventListener('mousemove', jungleHoverListener);
      jungleHoverListener = null;
    }
    
    // Stop all breathing animations
    gsap.killTweensOf('.bento-item, .project-card');
    
    // Reset positions
    document.querySelectorAll('.bento-item, .project-card').forEach(el => {
      gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.5 });
    });
  }
  
  // JUNGLE EXPERIENCE - Press 'J'
  document.addEventListener('keydown', (e) => {
    const isInInput = e.target.tagName === 'INPUT' || 
                      e.target.tagName === 'TEXTAREA' || 
                      e.target.isContentEditable;
    
    if (e.key.toLowerCase() === 'j' && !jungleMode && !e.repeat && !e.ctrlKey && !e.metaKey && !isInInput) {
      console.log('🌿 J pressed, current jungleMode:', jungleMode);
      
      // Disable other modes first
      if (volcanoMode || spaceMode) {
        disableAllModes();
      }
      
      jungleMode = true;
      console.log('🌿 Jungle mode activated:', jungleMode);
      sendLog('H3', 'Jungle activated', {}, 'script.js:JUNGLE');
      
      // Activate jungle interactions
      activateJungleInteractions();
      
      // Smooth transition overlay
      const transitionOverlay = document.createElement('div');
      transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(0, 255, 0, 0.2), rgba(0, 50, 0, 0.5));
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
      `;
      document.body.appendChild(transitionOverlay);
      
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          // Add jungle theme class to body
          document.body.classList.add('jungle-theme');
          
          // Change subtitle text
          const heroSubtitle = document.querySelector('.hero-subtitle');
          if (heroSubtitle) {
            if (!heroSubtitle.dataset.originalText) {
              heroSubtitle.dataset.originalText = heroSubtitle.textContent;
            }
            heroSubtitle.textContent = 'Wild-Crafted Creator of Digital Ecosystems | Freelancer';
          }
          
          gsap.to(transitionOverlay, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => transitionOverlay.remove()
          });
        }
      });
      
      // Create video overlay
      const videoOverlay = document.createElement('div');
      videoOverlay.id = 'jungle-video-overlay';
      videoOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        pointer-events: none;
        opacity: 0;
        transition: opacity 3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      const video = document.createElement('video');
      video.src = './assets/videos/The Forest Cinematic Drone Footage - Julien Hulin (1080p, h264).mp4';
      video.currentTime = 5; // Start at 5 seconds
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.6) contrast(1.3) saturate(1.6) hue-rotate(5deg);
      `;
      
      videoOverlay.appendChild(video);
      document.body.appendChild(videoOverlay);
      
      // Create jungle mist effect
      const mist = document.createElement('div');
      mist.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        background: linear-gradient(to bottom, transparent, rgba(0, 50, 0, 0.2) 50%, transparent);
        animation: jungle-mist 8s ease-in-out infinite;
      `;
      videoOverlay.appendChild(mist);
      
      // Fade in smoothly
      setTimeout(() => {
        videoOverlay.style.opacity = '1';
      }, 500);
      
      // Create compact indicator
      const indicator = document.createElement('div');
      indicator.id = 'jungle-indicator';
      indicator.innerHTML = `
        <div class="mode-badge jungle-badge">
          <div class="mode-icon">🦁</div>
          <div class="mode-text">JUNGLE</div>
        </div>
      `;
      indicator.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
      `;
      document.body.appendChild(indicator);
      
      setTimeout(() => {
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateY(0)';
      }, 100);
      
      // Show keyboard shortcut
      showKeyboardShortcut('J', '🌿 JUNGLE MODE');
    } else if (e.key.toLowerCase() === 'j' && jungleMode && !e.repeat && !isInInput) {
      jungleMode = false;
      sendLog('H3', 'Jungle deactivated', {}, 'script.js:JUNGLE');
      
      // Smooth transition overlay
      const transitionOverlay = document.createElement('div');
      transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at center, rgba(10, 10, 15, 0.8), rgba(0, 0, 0, 0.9));
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
      `;
      document.body.appendChild(transitionOverlay);
      
      gsap.to(transitionOverlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          // Deactivate jungle interactions
          deactivateJungleInteractions();
          
          // Remove jungle theme class
          document.body.classList.remove('jungle-theme');
          
          const videoOverlay = document.getElementById('jungle-video-overlay');
          if (videoOverlay) videoOverlay.remove();
          
          gsap.to(transitionOverlay, {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
            onComplete: () => transitionOverlay.remove()
          });
        }
      });
      
      const indicator = document.getElementById('jungle-indicator');
      if (indicator) {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translateY(20px)';
        setTimeout(() => indicator.remove(), 400);
      }
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
  
  // FUNCTIONALITY IMPROVEMENTS
  
  // 1. Prevent default space scroll behavior globally
  window.addEventListener('keydown', (e) => {
    // Prevent space scroll only if not in an input field
    if (e.code === 'Space' && 
        e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA' && 
        !e.target.isContentEditable) {
      e.preventDefault();
    }
  }, { passive: false });
  
  // 2. Smooth scroll performance optimization
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    document.body.classList.add('is-scrolling');
    
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove('is-scrolling');
    }, 150);
  }, { passive: true });
  
  // 3. Pause videos when not in viewport (performance)
  const videoObserverOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, videoObserverOptions);
  
  document.querySelectorAll('.project-video').forEach(video => {
    videoObserver.observe(video);
  });
  
  // 4. Preload mode videos for instant playback
  const preloadVideos = [
    './assets/videos/STUNNING Drone Video of ICELAND VOLCANO Eruption 4K DJI FPV - Joey Helms (1080p, h264).mp4',
    './assets/videos/Serenity - A Space Cinematic Film - SpaceCinema (1080p, h264) (1).mp4',
    './assets/videos/The Forest Cinematic Drone Footage - Julien Hulin (1080p, h264).mp4'
  ];
  
  preloadVideos.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = src;
    document.head.appendChild(link);
  });
  
  // 5. Keyboard shortcuts indicator
  let shortcutTimeout;
  function showKeyboardShortcut(key, modeName) {
    const existing = document.getElementById('keyboard-indicator');
    if (existing) existing.remove();
    
    const indicator = document.createElement('div');
    indicator.id = 'keyboard-indicator';
    indicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      backdrop-filter: blur(20px);
      padding: 2rem 3rem;
      border-radius: 20px;
      border: 2px solid var(--accent-color);
      z-index: 10001;
      pointer-events: none;
      opacity: 0;
      font-size: 3rem;
      font-weight: 700;
      color: white;
      text-align: center;
    `;
    indicator.innerHTML = `
      <div style="font-size: 1.5rem; opacity: 0.7; margin-bottom: 0.5rem;">${key}</div>
      <div>${modeName}</div>
    `;
    document.body.appendChild(indicator);
    
    gsap.to(indicator, {
      opacity: 1,
      scale: 1.1,
      duration: 0.3,
      ease: 'back.out(2)',
      onComplete: () => {
        gsap.to(indicator, {
          opacity: 0,
          scale: 0.9,
          duration: 0.3,
          delay: 0.5,
          ease: 'power2.in',
          onComplete: () => indicator.remove()
        });
      }
    });
  }
  
  // 6. Escape key to exit any mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (volcanoMode || spaceMode || jungleMode) {
        disableAllModes();
        showKeyboardShortcut('ESC', 'Default Mode');
      }
    }
  });
  
  // 7. Better mobile menu close on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 100) {
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const mainNav = document.querySelector('.main-nav');
      if (mainNav && mainNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, { passive: true });
  
  // 8. Smooth reveal animations for sections
  const revealElements = document.querySelectorAll('.bento-item, .project-card, .tech-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power3.out'
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => {
    gsap.set(el, { opacity: 0, y: 40 });
    revealObserver.observe(el);
  });
  
  // 9. Performance: Reduce animations on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-motion');
  }
  
  // 10. Better error handling for videos
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', (e) => {
      console.warn('Video failed to load:', video.src);
      video.style.display = 'none';
    });
  });
});
