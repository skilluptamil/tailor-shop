/**
 * SARTORIA ROYALE - RTL & LTR Direction Manager (rtl.js)
 * Manages Bidirectional Layout with Instant Storage Persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sartoria_direction_preference';
  const htmlElement = document.documentElement;

  // Immediate synchronous application to prevent flash of wrong direction
  try {
    const savedDir = localStorage.getItem(STORAGE_KEY);
    if (savedDir === 'rtl') {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
    }
  } catch (e) {
    // LocalStorage fallback
  }

  // Set direction attribute and notify subscribers
  function setDirection(dir) {
    const isRTL = dir === 'rtl';
    htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    try {
      localStorage.setItem(STORAGE_KEY, isRTL ? 'rtl' : 'ltr');
    } catch (e) {}
    
    updateRTLButtons(isRTL ? 'rtl' : 'ltr');

    // Dispatch global custom event for dynamic components (e.g. Chart.js)
    window.dispatchEvent(new CustomEvent('sartoria:directionChange', {
      detail: { direction: isRTL ? 'rtl' : 'ltr' }
    }));
  }

  // Update all RTL toggle button labels, icons, and tooltips
  function updateRTLButtons(currentDir) {
    const isRTL = currentDir === 'rtl';
    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      const textSpan = btn.querySelector('.rtl-text');
      if (textSpan) {
        textSpan.textContent = isRTL ? 'LTR' : 'RTL';
      }
      btn.setAttribute('title', isRTL ? 'Switch to Left-to-Right Layout' : 'Switch to Right-to-Left Layout');
      btn.setAttribute('aria-label', isRTL ? 'Switch to Left-to-Right Layout' : 'Switch to Right-to-Left Layout');
      
      if (isRTL) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Toggle between RTL and LTR
  function toggleDirection() {
    const current = htmlElement.getAttribute('dir');
    setDirection(current === 'rtl' ? 'ltr' : 'rtl');
  }

  // Expose global API
  window.sartoriaRTL = {
    setDirection,
    toggleDirection,
    getDirection: () => htmlElement.getAttribute('dir') || 'ltr',
    isRTL: () => htmlElement.getAttribute('dir') === 'rtl'
  };

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const currentDir = htmlElement.getAttribute('dir') || 'ltr';
    updateRTLButtons(currentDir);

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleDirection();
      });
    });
  });
})();
