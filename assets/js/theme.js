/**
 * SARTORIA ROYALE - Theme Switcher (theme.js)
 * Manages Dark Mode and Light Mode with LocalStorage Persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sartoria_theme_preference';
  const htmlElement = document.documentElement;

  // Immediate synchronous execution to avoid theme flash
  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.setAttribute('data-bs-theme', 'dark');
    } else if (savedTheme === 'light') {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.setAttribute('data-bs-theme', 'light');
    }
  } catch (e) {}

  // Initialize theme from storage or system preference
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  // Set theme attribute and update icons
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      htmlElement.setAttribute('data-bs-theme', 'dark');
      try { localStorage.setItem(STORAGE_KEY, 'dark'); } catch (e) {}
      updateThemeIcons('dark');
    } else {
      htmlElement.setAttribute('data-theme', 'light');
      htmlElement.setAttribute('data-bs-theme', 'light');
      try { localStorage.setItem(STORAGE_KEY, 'light'); } catch (e) {}
      updateThemeIcons('light');
    }
  }

  // Update toggle button icons across the DOM
  function updateThemeIcons(currentTheme) {
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (currentTheme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
          btn.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('title', 'Switch to Dark Mode');
          btn.setAttribute('aria-label', 'Switch to Dark Mode');
        }
      }
    });
  }

  // Toggle theme action
  function toggleTheme() {
    const current = htmlElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Expose global API
  window.sartoriaTheme = {
    setTheme,
    toggleTheme,
    initTheme
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });
    });
  });
})();
