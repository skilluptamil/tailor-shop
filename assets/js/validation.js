/**
 * SARTORIA ROYALE - Form Validation & Toast Notifications (validation.js)
 */

(function () {
  'use strict';

  // Global Toast Function
  function showToast(message, type = 'success', duration = 4000) {
    let container = document.querySelector('.toast-container-custom');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-custom';
    
    let iconClass = 'bi-check-circle-fill text-gold';
    if (type === 'error') iconClass = 'bi-exclamation-triangle-fill text-danger';
    if (type === 'info') iconClass = 'bi-info-circle-fill text-primary';

    toast.innerHTML = `
      <i class="bi ${iconClass} fs-4"></i>
      <div>
        <div class="fw-bold" style="font-size: 0.9375rem;">${type === 'error' ? 'Notice' : 'Success'}</div>
        <div class="text-muted small">${message}</div>
      </div>
      <button type="button" class="btn-close ms-auto" style="font-size: 0.75rem;" aria-label="Close"></button>
    `;

    const closeBtn = toast.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }

  // Handle Form Validations
  function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          showToast('Please fill in all required fields accurately.', 'error');
        } else {
          event.preventDefault();
          
          // Form-specific success messages
          if (form.id === 'appointmentForm' || form.classList.contains('appointment-form')) {
            showToast('Your measurement appointment has been scheduled! We will contact you shortly.', 'success');
            form.reset();
            // Close modal if open
            const modalEl = form.closest('.modal');
            if (modalEl && window.bootstrap) {
              const modal = bootstrap.Modal.getInstance(modalEl);
              if (modal) modal.hide();
            }
          } else if (form.id === 'contactForm') {
            showToast('Thank you! Your inquiry has been sent to our master tailors.', 'success');
            form.reset();
          } else if (form.id === 'newsletterForm' || form.classList.contains('newsletter-form')) {
            showToast('Thank you for subscribing to our couture newsletter!', 'success');
            form.reset();
          } else if (form.id === 'loginForm') {
            showToast('Logged in successfully! Redirecting...', 'success');
            setTimeout(() => {
              window.location.href = 'admin/index.html';
            }, 1000);
          } else if (form.id === 'registerForm') {
            showToast('Account created successfully! Welcome to Sartoria Royale.', 'success');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 1200);
          } else if (form.id === 'forgotPasswordForm') {
            showToast('Password reset link sent to your email address.', 'success');
            form.reset();
          } else {
            showToast('Form submitted successfully!', 'success');
            form.reset();
          }
        }
        form.classList.add('was-validated');
      }, false);
    });
  }

  window.sartoriaValidation = {
    showToast,
    initFormValidation
  };

  document.addEventListener('DOMContentLoaded', initFormValidation);
})();
