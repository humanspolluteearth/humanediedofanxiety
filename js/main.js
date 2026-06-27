document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.topbar__menu-btn');
  const closeBtn = document.querySelector('.nav-drawer__close');
  const navOverlay = document.querySelector('.nav-overlay');
  const navDrawer = document.querySelector('.nav-drawer');

  function openMenu() {
    navOverlay.classList.add('is-open');
    navDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
  }

  function closeMenu() {
    navOverlay.classList.remove('is-open');
    navDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });

  // Dark Mode Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    } else {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
    }

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // ============================================
  // Cursor Glow Effect — Light Yellow Ambient
  // ============================================
  // Only enable on non-touch devices
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    const interactiveSelectors = 'a, button, input, textarea, [role="button"]';

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!glow.classList.contains('is-visible')) {
        glow.classList.add('is-visible');
      }

      // Check if hovering over an interactive element
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        glow.classList.add('is-hovering');
      } else {
        glow.classList.remove('is-hovering');
      }
    });

    document.addEventListener('mouseleave', () => {
      glow.classList.remove('is-visible');
      glow.classList.remove('is-hovering');
    });

    // Smooth follow via requestAnimationFrame
    function animateGlow() {
      // Lerp for smooth trailing
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }
});
