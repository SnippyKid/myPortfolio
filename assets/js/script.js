// Initialize animations when document is ready
document.addEventListener('DOMContentLoaded', function() {
  
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Smooth scroll with CSS
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Smooth page load animation (animate a wrapper, never the body directly to preserve scrolling)
  document.body.style.opacity = '0';
  gsap.to('body', {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      document.body.style.removeProperty('opacity');
    }
  });

  // ---- HERO NAME SCRAMBLE ----
  (function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    const line1El = document.querySelector('.hero-title .line1');
    const line2El = document.querySelector('.hero-title .line2');
    if (!line1El || !line2El) return;

    function scramble(el, finalText, duration, startDelay) {
      const len = finalText.length;
      let frame = 0;
      const totalFrames = Math.round(duration * 60);
      const resolveAt = (i) => Math.floor((i / len) * totalFrames * 0.7);

      setTimeout(() => {
        const tick = () => {
          let display = '';
          for (let i = 0; i < len; i++) {
            if (frame >= resolveAt(i)) {
              display += finalText[i];
            } else {
              display += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          el.textContent = display;
          frame++;
          if (frame <= totalFrames) requestAnimationFrame(tick);
          else el.textContent = finalText;
        };
        requestAnimationFrame(tick);
      }, startDelay);
    }

    scramble(line1El, 'SNIPPY', 1.8, 200);
    scramble(line2El, 'KID',    1.4, 500);
  })();
  
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
  
  // ---- PROJECT ROWS: floating video preview that follows cursor ----
  let activePreview = null;
  const PW = 460, PH = 280;

  // Inject LIVE badge into every preview element once
  document.querySelectorAll('.proj-row-preview').forEach(preview => {
    if (!preview.querySelector('.proj-preview-live')) {
      const badge = document.createElement('div');
      badge.className = 'proj-preview-live';
      badge.innerHTML = '<span class="proj-preview-live-dot"></span> LIVE';
      preview.appendChild(badge);
    }
  });

  // Smooth mouse position with lerp
  let mouseRawX = 0, mouseRawY = 0;
  let previewLerpX = 0, previewLerpY = 0;
  let previewRAF = null;

  function lerpPreview() {
    if (!activePreview) { previewRAF = null; return; }
    previewLerpX += (mouseRawX - previewLerpX) * 0.1;
    previewLerpY += (mouseRawY - previewLerpY) * 0.1;
    activePreview.style.left = previewLerpX + 'px';
    activePreview.style.top  = previewLerpY + 'px';
    previewRAF = requestAnimationFrame(lerpPreview);
  }

  document.addEventListener('mousemove', (e) => {
    let x = e.clientX + 32;
    let y = e.clientY - PH / 2;
    if (x + PW > window.innerWidth - 16)  x = e.clientX - PW - 32;
    if (y < 16)                            y = 16;
    if (y + PH > window.innerHeight - 16) y = window.innerHeight - PH - 16;
    mouseRawX = x;
    mouseRawY = y;

    // 3D tilt relative to cursor position within the preview card
    if (activePreview) {
      const rect = activePreview.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      // Keep translate from lerpPreview, just add tilt on top
      activePreview.style.transform = `scale(1) rotate(0deg) translateY(0) perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 5}deg)`;
    }
  }, { passive: true });

  document.querySelectorAll('.proj-row').forEach(row => {
    const preview = row.querySelector('.proj-row-preview');
    const video   = preview ? preview.querySelector('video') : null;

    row.addEventListener('mouseenter', (e) => {
      if (!preview) return;
      let x = e.clientX + 32;
      let y = e.clientY - PH / 2;
      if (x + PW > window.innerWidth - 16)  x = e.clientX - PW - 32;
      if (y < 16)                            y = 16;
      if (y + PH > window.innerHeight - 16) y = window.innerHeight - PH - 16;
      previewLerpX = x; previewLerpY = y;
      mouseRawX = x;    mouseRawY = y;
      preview.style.left = x + 'px';
      preview.style.top  = y + 'px';
      requestAnimationFrame(() => preview.classList.add('is-visible'));
      activePreview = preview;
      if (!previewRAF) previewRAF = requestAnimationFrame(lerpPreview);
      if (video) video.play().catch(() => {});
    });

    row.addEventListener('mouseleave', () => {
      if (!preview) return;
      preview.classList.remove('is-visible');
      preview.style.transform = '';
      activePreview = null;
      if (video) { video.pause(); video.currentTime = 0; }
    });
  });

  // ---- COUNTING NUMBERS in about bento ----
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.craft-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 40);
      });
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  const bentoCountEl = document.querySelector('.about-stats-row');
  if (bentoCountEl) countObserver.observe(bentoCountEl);

  // ---- FOOTER MODE LABEL ----
  function updateFooterMode() {
    const label = document.querySelector('.footer-mode-label');
    if (!label) return;
    if (document.body.classList.contains('volcano-theme')) label.textContent = '🌋 Volcano Mode';
    else if (document.body.classList.contains('space-theme')) label.textContent = '🚀 Space Mode';
    else if (document.body.classList.contains('jungle-theme')) label.textContent = '🌿 Jungle Mode';
    else label.textContent = 'Default Mode';
  }

  // ---- HOTKEY BUTTONS — click to trigger modes ----
  function syncHotkeyActive() {
    document.querySelectorAll('.hotkey-btn').forEach(btn => {
      const mode = btn.dataset.mode;
      const isOn = (mode === 'volcano' && document.body.classList.contains('volcano-theme')) ||
                   (mode === 'space'   && document.body.classList.contains('space-theme'))   ||
                   (mode === 'jungle'  && document.body.classList.contains('jungle-theme'));
      btn.classList.toggle('is-active', isOn);
    });
  }

  document.querySelectorAll('.hotkey-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode === 'volcano') document.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }));
      if (mode === 'space')   document.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', code: 'KeyE',  bubbles: true }));
      if (mode === 'jungle')  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'j', code: 'KeyJ',  bubbles: true }));
      setTimeout(syncHotkeyActive, 100);
    });
  });

  // sync active state and footer mode label whenever body class changes
  const bodyObserver = new MutationObserver(() => { syncHotkeyActive(); updateFooterMode(); });
  bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  
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
  
  // Observe elements for animation (only freelance-card, bento/project handled by GSAP reveal below)
  document.querySelectorAll('.freelance-card').forEach(el => {
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
  
  // Subtle mouse parallax for hero title - merged into the main mousemove handler above
  
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
  
  // UNEXPECTED: Text scramble effect on hover with occasional creative messages
  const creativeMessages = [
    "DON'T WASTE TIME ON ME",
    "LOOK BELOW INSTEAD",
    "SCROLL DOWN ALREADY",
    "NOTHING TO SEE HERE",
    "THE GOOD STUFF IS BELOW",
    "STOP HOVERING, START SCROLLING",
    "YOU'RE MISSING THE CONTENT",
    "PROJECTS WON'T VIEW THEMSELVES"
  ];
  
  const scrambleText = (element) => {
    // Store original text if not already stored
    if (!element.dataset.originalText) {
      element.dataset.originalText = element.textContent;
    }
    const originalText = element.dataset.originalText;
    
    // 15% chance to show creative message instead
    const showCreativeMessage = Math.random() < 0.15;
    const targetText = showCreativeMessage 
      ? creativeMessages[Math.floor(Math.random() * creativeMessages.length)]
      : originalText;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let iteration = 0;
    
    // Clear any existing interval on this element
    if (element.scrambleInterval) {
      clearInterval(element.scrambleInterval);
    }
    
    element.scrambleInterval = setInterval(() => {
      element.textContent = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '; // Keep spaces
          if (index < iteration) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= targetText.length) {
        clearInterval(element.scrambleInterval);
        element.scrambleInterval = null;
        
        // If it was a creative message, revert back to original after 2 seconds
        if (showCreativeMessage) {
          setTimeout(() => {
            if (element.dataset.originalText) {
              element.textContent = element.dataset.originalText;
            }
          }, 2000);
        }
      }
      
      iteration += 1 / 3;
    }, 30);
  };
  
  document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
      // Prevent multiple simultaneous scrambles
      if (!title.scrambleInterval) {
        scrambleText(title);
      }
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
  let volcanoEmberRAF = null;
  let spaceCanvasRAF  = null;
  let jungleCanvasRAF = null;
  
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
  
  // ---- DRAMATIC MODE TRANSITION FLASH ----
  function playModeDramaticTransition(color, label, emoji, onMid) {
    // Remove any lingering flash
    const old = document.getElementById('mode-transition-flash');
    if (old) old.remove();

    const flash = document.createElement('div');
    flash.id = 'mode-transition-flash';
    flash.innerHTML = `<div class="mtf-inner"><span class="mtf-emoji">${emoji}</span><span class="mtf-label">${label}</span></div>`;
    flash.style.cssText = `
      position:fixed;inset:0;z-index:99999;pointer-events:none;
      display:flex;align-items:center;justify-content:center;
      background:${color};
      opacity:0;
    `;
    flash.querySelector('.mtf-inner').style.cssText = `
      display:flex;flex-direction:column;align-items:center;gap:0.5rem;
      transform:scale(0.6);opacity:0;transition:all 0s;
    `;
    document.body.appendChild(flash);

    // Style the text
    const inner = flash.querySelector('.mtf-inner');
    const emojiEl = flash.querySelector('.mtf-emoji');
    const labelEl = flash.querySelector('.mtf-label');
    emojiEl.style.cssText = 'font-size:6rem;line-height:1;filter:drop-shadow(0 0 40px rgba(255,255,255,0.8));';
    labelEl.style.cssText = `
      font-family:'Syne',sans-serif;font-size:clamp(2rem,6vw,5rem);font-weight:800;
      letter-spacing:0.1em;text-transform:uppercase;color:#fff;
      text-shadow:0 0 60px rgba(255,255,255,0.6);
    `;

    const tl = gsap.timeline({ onComplete: () => flash.remove() });
    tl.to(flash, { opacity: 1, duration: 0.18, ease: 'power3.in' })
      .to(inner, { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' }, '<0.05')
      .call(onMid)
      .to(flash, { opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.35 })
      .to(inner, { scale: 1.15, opacity: 0, duration: 0.4, ease: 'power2.in' }, '<');
  }

  function activateVolcanoInteractions() {
    // Screen shake on scroll
    volcanoScrollListener = () => {
      document.body.classList.add('scrolling');
      setTimeout(() => { document.body.classList.remove('scrolling'); }, 300);
    };
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(volcanoScrollListener, 50);
    }, { passive: true });

    // --- EMBER PARTICLE CANVAS TRAIL ---
    const canvas = document.createElement('canvas');
    canvas.id = 'volcano-ember-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const embers = [];
    let mouseX = -999, mouseY = -999;

    volcanoHoverListener = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    document.addEventListener('mousemove', volcanoHoverListener);

    function spawnEmber() {
      const spread = 14;
      embers.push({
        x: mouseX + (Math.random() - 0.5) * spread,
        y: mouseY + (Math.random() - 0.5) * spread,
        vx: (Math.random() - 0.5) * 2.2,
        vy: -(Math.random() * 3 + 1),
        life: 1,
        decay: 0.018 + Math.random() * 0.022,
        r: 1.5 + Math.random() * 2.5,
        hue: 10 + Math.floor(Math.random() * 30),
      });
    }

    let frameCount = 0;
    function emberLoop() {
      if (!document.getElementById('volcano-ember-canvas')) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCount++;
      if (frameCount % 2 === 0 && mouseX > 0) { spawnEmber(); spawnEmber(); }

      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;          // gravity
        p.vx *= 0.98;
        p.life -= p.decay;
        if (p.life <= 0) { embers.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,${55 + p.life * 20}%,${p.life * 0.9})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${p.hue},100%,60%)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      volcanoEmberRAF = requestAnimationFrame(emberLoop);
    }
    volcanoEmberRAF = requestAnimationFrame(emberLoop);

    window.addEventListener('resize', () => {
      if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    });
  }

  function deactivateVolcanoInteractions() {
    if (volcanoHoverListener) {
      document.removeEventListener('mousemove', volcanoHoverListener);
      volcanoHoverListener = null;
    }
    if (volcanoEmberRAF) { cancelAnimationFrame(volcanoEmberRAF); volcanoEmberRAF = null; }
    const c = document.getElementById('volcano-ember-canvas');
    if (c) c.remove();
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
      
      if (volcanoMode) {
        // Activate volcano mode with video
        activateVolcanoInteractions();

        playModeDramaticTransition(
          'radial-gradient(circle at center, rgba(255,69,0,0.65), rgba(100,10,0,0.9))',
          'VOLCANO', '🌋',
          () => {
            document.body.classList.add('volcano-theme');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
              if (!heroSubtitle.dataset.originalText) heroSubtitle.dataset.originalText = heroSubtitle.textContent;
              heroSubtitle.textContent = 'Eruption Engineer of Pixels & Code | Freelancer';
            }
          }
        );
        
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
        playModeDramaticTransition('rgba(0,0,0,0.85)', 'OFF', '✖', () => {
          deactivateVolcanoInteractions();
          document.body.classList.remove('volcano-theme');
          const videoOverlay = document.getElementById('volcano-video-overlay');
          if (videoOverlay) videoOverlay.remove();
          const indicator = document.getElementById('volcano-indicator');
          if (indicator) indicator.remove();
          const heroSubtitle = document.querySelector('.hero-subtitle');
          if (heroSubtitle && heroSubtitle.dataset.originalText) heroSubtitle.textContent = heroSubtitle.dataset.originalText;
        });
      }
    }
  });
  
  // SPACE MODE INTERACTIONS
  let spaceHoverListener = null;
  let spaceScrollModifier = null;
  let spaceFloatInterval = null;
  
  function activateSpaceInteractions() {
    // --- ZERO-GRAVITY FLOATING ELEMENTS ---
    const floatTargets = document.querySelectorAll(
      '.section-title, .proj-row-title, .about-stat-num, .client-row-name, .tech-item, .hotkey-btn'
    );
    floatTargets.forEach((el, i) => {
      const amp = 6 + Math.random() * 14;
      const dur = 3.5 + Math.random() * 4;
      gsap.to(el, {
        y: `+=${amp}`,
        x: `+=${(Math.random()-0.5)*8}`,
        rotation: (Math.random()-0.5)*3,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.18,
      });
    });

    // --- LASER BEAM CURSOR TRAIL ---
    const laserCanvas = document.createElement('canvas');
    laserCanvas.id = 'space-laser-canvas';
    laserCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9997;';
    laserCanvas.width  = window.innerWidth;
    laserCanvas.height = window.innerHeight;
    document.body.appendChild(laserCanvas);
    const lctx = laserCanvas.getContext('2d');

    const laserPoints = [];
    const MAX_POINTS = 40;
    let lMouseX = -999, lMouseY = -999;

    spaceHoverListener = (e) => {
      lMouseX = e.clientX; lMouseY = e.clientY;
      laserPoints.push({ x: lMouseX, y: lMouseY, age: 0 });
      if (laserPoints.length > MAX_POINTS) laserPoints.shift();

      // --- STAR PARALLAX ---
      const starsEl = document.getElementById('space-stars-container');
      if (starsEl) {
        const px = (e.clientX / window.innerWidth  - 0.5) * 30;
        const py = (e.clientY / window.innerHeight - 0.5) * 30;
        starsEl.style.transform = `translate(${px}px, ${py}px)`;
      }
    };
    document.addEventListener('mousemove', spaceHoverListener);

    function laserLoop() {
      if (!document.getElementById('space-laser-canvas')) return;
      lctx.clearRect(0, 0, laserCanvas.width, laserCanvas.height);

      for (let i = 0; i < laserPoints.length; i++) {
        laserPoints[i].age++;
      }
      // Remove old points
      while (laserPoints.length && laserPoints[0].age > MAX_POINTS) laserPoints.shift();

      if (laserPoints.length > 1) {
        lctx.beginPath();
        lctx.moveTo(laserPoints[0].x, laserPoints[0].y);
        for (let i = 1; i < laserPoints.length; i++) {
          const t = i / laserPoints.length;
          lctx.lineTo(laserPoints[i].x, laserPoints[i].y);
        }
        // Outer glow
        lctx.strokeStyle = 'rgba(0,200,255,0.12)';
        lctx.lineWidth = 10;
        lctx.lineCap = 'round';
        lctx.lineJoin = 'round';
        lctx.stroke();
        // Inner beam
        const grad = lctx.createLinearGradient(
          laserPoints[0].x, laserPoints[0].y,
          laserPoints[laserPoints.length-1].x, laserPoints[laserPoints.length-1].y
        );
        grad.addColorStop(0, 'rgba(0,200,255,0)');
        grad.addColorStop(1, 'rgba(180,240,255,0.95)');
        lctx.strokeStyle = grad;
        lctx.lineWidth = 2;
        lctx.shadowBlur = 16;
        lctx.shadowColor = '#00d0ff';
        lctx.stroke();
        lctx.shadowBlur = 0;
      }

      // Cursor glow dot
      if (lMouseX > 0) {
        lctx.beginPath();
        lctx.arc(lMouseX, lMouseY, 4, 0, Math.PI * 2);
        lctx.fillStyle = 'rgba(180,240,255,0.9)';
        lctx.shadowBlur = 18;
        lctx.shadowColor = '#00d0ff';
        lctx.fill();
        lctx.shadowBlur = 0;
      }

      spaceCanvasRAF = requestAnimationFrame(laserLoop);
    }
    spaceCanvasRAF = requestAnimationFrame(laserLoop);

    window.addEventListener('resize', () => {
      if (laserCanvas) { laserCanvas.width = window.innerWidth; laserCanvas.height = window.innerHeight; }
    });
  }

  function deactivateSpaceInteractions() {
    if (spaceHoverListener) {
      document.removeEventListener('mousemove', spaceHoverListener);
      spaceHoverListener = null;
    }
    if (spaceCanvasRAF) { cancelAnimationFrame(spaceCanvasRAF); spaceCanvasRAF = null; }
    const lc = document.getElementById('space-laser-canvas');
    if (lc) lc.remove();
    const starsEl = document.getElementById('space-stars-container');
    if (starsEl) starsEl.style.transform = '';
    if (spaceFloatInterval) { clearInterval(spaceFloatInterval); spaceFloatInterval = null; }
    // Kill float tweens and reset
    gsap.killTweensOf('.section-title, .proj-row-title, .about-stat-num, .client-row-name, .tech-item, .hotkey-btn');
    document.querySelectorAll('.section-title, .proj-row-title, .about-stat-num, .client-row-name, .tech-item, .hotkey-btn')
      .forEach(el => gsap.to(el, { y: 0, x: 0, rotation: 0, duration: 0.8, ease: 'power2.out' }));
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
      
      activateSpaceInteractions();

      playModeDramaticTransition(
        'radial-gradient(circle at center, rgba(0,80,160,0.7), rgba(0,0,30,0.95))',
        'SPACE MODE', '🚀',
        () => {
          document.body.classList.add('space-theme');
          const heroSubtitle = document.querySelector('.hero-subtitle');
          if (heroSubtitle) {
            if (!heroSubtitle.dataset.originalText) heroSubtitle.dataset.originalText = heroSubtitle.textContent;
            heroSubtitle.textContent = 'Stellar Alchemist of Experiences | Freelancer';
          }
        }
      );
      
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
      playModeDramaticTransition('rgba(0,0,0,0.9)', 'OFF', '✖', () => {
        deactivateSpaceInteractions();
        document.body.classList.remove('space-theme');
        const vo = document.getElementById('space-video-overlay'); if (vo) vo.remove();
        const sc = document.getElementById('space-stars-container'); if (sc) sc.remove();
        const si = document.getElementById('space-indicator'); if (si) si.remove();
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && heroSubtitle.dataset.originalText) heroSubtitle.textContent = heroSubtitle.dataset.originalText;
      });
    }
  });
  
  // JUNGLE MODE INTERACTIONS
  let jungleHoverListener = null;
  let jungleSwayInterval = null;
  let jungleLeafInterval = null;
  let jungleScrollListener = null;
  
  function activateJungleInteractions() {
    // Kill any leftover space-mode float tweens and hard-reset transforms
    gsap.killTweensOf('.section-title, .proj-row-title, .about-stat-num, .client-row-name, .tech-item, .hotkey-btn');
    document.querySelectorAll('.section-title, .proj-row-title, .about-stat-num, .client-row-name, .tech-item, .hotkey-btn')
      .forEach(el => gsap.set(el, { clearProps: 'x,y,rotation,transform' }));

    // --- RAIN CANVAS ---
    const rainCanvas = document.createElement('canvas');
    rainCanvas.id = 'jungle-rain-canvas';
    rainCanvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9996;';
    rainCanvas.width  = window.innerWidth;
    rainCanvas.height = window.innerHeight;
    document.body.appendChild(rainCanvas);
    const rctx = rainCanvas.getContext('2d');

    const drops = [];
    const DROP_COUNT = 120;
    for (let i = 0; i < DROP_COUNT; i++) {
      drops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        len: 8 + Math.random() * 18,
        speed: 4 + Math.random() * 7,
        opacity: 0.12 + Math.random() * 0.25,
        width: 0.6 + Math.random() * 0.8,
      });
    }

    // --- LEAF CURSOR TRAIL ---
    const leaves = [];
    let jMouseX = -999, jMouseY = -999;
    jungleHoverListener = (e) => { jMouseX = e.clientX; jMouseY = e.clientY; };
    document.addEventListener('mousemove', jungleHoverListener);

    function spawnLeaf() {
      leaves.push({
        x: jMouseX, y: jMouseY,
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 2 + 0.5),
        rot: Math.random() * 360,
        vrot: (Math.random() - 0.5) * 8,
        life: 1,
        decay: 0.02 + Math.random() * 0.015,
        size: 5 + Math.random() * 6,
      });
    }

    let jFrame = 0;
    function jungleLoop() {
      if (!document.getElementById('jungle-rain-canvas')) return;
      rctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

      // Rain
      rctx.strokeStyle = 'rgba(100,220,80,0.18)';
      for (const d of drops) {
        d.y += d.speed;
        d.x += d.speed * 0.15;   // slight angle
        if (d.y > rainCanvas.height) { d.y = -d.len; d.x = Math.random() * rainCanvas.width; }
        rctx.globalAlpha = d.opacity;
        rctx.lineWidth = d.width;
        rctx.beginPath();
        rctx.moveTo(d.x, d.y);
        rctx.lineTo(d.x + d.len * 0.15, d.y + d.len);
        rctx.stroke();
      }
      rctx.globalAlpha = 1;

      // Leaf spawning
      jFrame++;
      if (jFrame % 3 === 0 && jMouseX > 0) spawnLeaf();

      // Draw leaves as simple ovals
      for (let i = leaves.length - 1; i >= 0; i--) {
        const lf = leaves[i];
        lf.x += lf.vx;
        lf.y += lf.vy;
        lf.vy += 0.04;
        lf.vx *= 0.99;
        lf.rot += lf.vrot;
        lf.life -= lf.decay;
        if (lf.life <= 0) { leaves.splice(i, 1); continue; }
        rctx.save();
        rctx.translate(lf.x, lf.y);
        rctx.rotate((lf.rot * Math.PI) / 180);
        rctx.globalAlpha = lf.life * 0.85;
        rctx.beginPath();
        rctx.ellipse(0, 0, lf.size, lf.size * 0.45, 0, 0, Math.PI * 2);
        rctx.fillStyle = `hsl(${110 + Math.random()*30},70%,45%)`;
        rctx.shadowBlur = 6;
        rctx.shadowColor = 'rgba(100,220,80,0.5)';
        rctx.fill();
        rctx.restore();
      }
      rctx.globalAlpha = 1;
      rctx.shadowBlur = 0;

      jungleCanvasRAF = requestAnimationFrame(jungleLoop);
    }
    jungleCanvasRAF = requestAnimationFrame(jungleLoop);

    window.addEventListener('resize', () => {
      if (rainCanvas) { rainCanvas.width = window.innerWidth; rainCanvas.height = window.innerHeight; }
    });
  }

  function deactivateJungleInteractions() {
    if (jungleHoverListener) {
      document.removeEventListener('mousemove', jungleHoverListener);
      jungleHoverListener = null;
    }
    if (jungleCanvasRAF) { cancelAnimationFrame(jungleCanvasRAF); jungleCanvasRAF = null; }
    const rc = document.getElementById('jungle-rain-canvas');
    if (rc) rc.remove();
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
      
      activateJungleInteractions();

      playModeDramaticTransition(
        'radial-gradient(circle at center, rgba(0,100,0,0.6), rgba(0,30,0,0.95))',
        'JUNGLE MODE', '🌿',
        () => {
          document.body.classList.add('jungle-theme');
          const heroSubtitle = document.querySelector('.hero-subtitle');
          if (heroSubtitle) {
            if (!heroSubtitle.dataset.originalText) heroSubtitle.dataset.originalText = heroSubtitle.textContent;
            heroSubtitle.textContent = 'Wild-Crafted Creator of Digital Ecosystems | Freelancer';
          }
        }
      );
      
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
      playModeDramaticTransition('rgba(0,0,0,0.9)', 'OFF', '✖', () => {
        deactivateJungleInteractions();
        document.body.classList.remove('jungle-theme');
        const vo = document.getElementById('jungle-video-overlay'); if (vo) vo.remove();
        const ji = document.getElementById('jungle-indicator'); if (ji) ji.remove();
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle && heroSubtitle.dataset.originalText) heroSubtitle.textContent = heroSubtitle.dataset.originalText;
      });
    }
  });
  
  // ---- SCROLL PROGRESS BAR ----
  const scrollBar = document.createElement('div');
  scrollBar.id = 'scroll-progress';
  document.body.appendChild(scrollBar);
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  }, { passive: true });

  // ---- data-text for glitch / chromatic aberration ----
  document.querySelectorAll('.section-title, .proj-row-title').forEach(el => {
    el.dataset.text = el.textContent.trim();
  });

  // Volcano: add glitch-active class on section-title mouseenter
  document.querySelectorAll('.section-title').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (document.body.classList.contains('volcano-theme')) el.classList.add('glitch-active');
    });
    el.addEventListener('mouseleave', () => el.classList.remove('glitch-active'));
  });

  // ---- MAGNETIC ROWS — subtle cursor pull toward proj-row center ----
  document.querySelectorAll('.proj-row').forEach(row => {
    row.addEventListener('mousemove', (e) => {
      const rect = row.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;   // -0.5 to 0.5
      const dy = (e.clientY - cy) / rect.height;
      row.style.transform = `translateX(${4 + dx * 6}px) translateY(${dy * 4}px)`;
    });
    row.addEventListener('mouseleave', () => {
      row.style.transform = '';
    });
  });

  // Right-click orbs feature removed
  
  // Background intensity feature removed to avoid scroll interference
  
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
  
  // 1. Prevent default space scroll behavior only when volcano mode is toggling
  // (The volcano keydown handler already calls preventDefault when Space is pressed)
  
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
    link.rel = 'prefetch';
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
  const revealElements = document.querySelectorAll('.bento-item, .proj-row');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
